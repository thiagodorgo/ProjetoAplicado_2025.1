from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'curso_management')]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

# Create the main app
app = FastAPI(title="Sistema de Gerenciamento de Cursos Obrigatórios")
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# =============== ENUMS ===============
class Modalidade(str, Enum):
    PRESENCIAL = "presencial"
    ONLINE_SINCRONO = "online_sincrono"
    ONLINE_ASSINCRONO = "online_assincrono"

class StatusInscricao(str, Enum):
    PENDENTE = "pendente"
    EM_ANDAMENTO = "em_andamento"
    CONCLUIDO = "concluido"
    CANCELADO = "cancelado"

class TipoInscricao(str, Enum):
    MANUAL = "manual"
    AUTO_INSCRICAO = "auto_inscricao"
    AUTOMATICA = "automatica"

class TipoEvidencia(str, Enum):
    ASSINATURA_DIGITAL = "assinatura_digital"
    QR_CODE = "qr_code"
    LOG_ACESSO = "log_acesso"
    CERTIFICADO = "certificado"

class AcaoAuditoria(str, Enum):
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"
    LOGIN = "LOGIN"
    LOGOUT = "LOGOUT"

# =============== MODELS ===============

# Area Model
class AreaBase(BaseModel):
    nome: str
    departamento: Optional[str] = None

class AreaCreate(AreaBase):
    pass

class Area(AreaBase):
    id_area: int
    model_config = ConfigDict(extra="ignore")

# Cargo Model
class CargoBase(BaseModel):
    nome: str

class CargoCreate(CargoBase):
    pass

class Cargo(CargoBase):
    id_cargo: int
    model_config = ConfigDict(extra="ignore")

# Perfil Model
class PerfilBase(BaseModel):
    nome: str

class PerfilCreate(PerfilBase):
    pass

class Perfil(PerfilBase):
    id_perfil: int
    model_config = ConfigDict(extra="ignore")

# Colaborador Model
class ColaboradorBase(BaseModel):
    nome: str
    email: EmailStr
    id_cargo: int
    id_area: int
    id_perfil: int
    id_gestor: Optional[int] = None

class ColaboradorCreate(ColaboradorBase):
    senha: str

class ColaboradorUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    id_cargo: Optional[int] = None
    id_area: Optional[int] = None
    id_perfil: Optional[int] = None
    id_gestor: Optional[int] = None
    senha: Optional[str] = None

class Colaborador(ColaboradorBase):
    id_colaborador: int
    model_config = ConfigDict(extra="ignore")

class ColaboradorLogin(BaseModel):
    email: EmailStr
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str
    colaborador: Colaborador

# Tag Model
class TagBase(BaseModel):
    nome: str

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    id_tag: int
    model_config = ConfigDict(extra="ignore")

# Curso Model
class CursoBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    carga_horaria: int
    modalidade: Modalidade
    publico_alvo: Optional[str] = None
    instrutores: Optional[str] = None
    permite_auto_inscricao: bool = False
    tags: Optional[List[int]] = []

class CursoCreate(CursoBase):
    pass

class CursoUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    carga_horaria: Optional[int] = None
    modalidade: Optional[Modalidade] = None
    publico_alvo: Optional[str] = None
    instrutores: Optional[str] = None
    permite_auto_inscricao: Optional[bool] = None
    tags: Optional[List[int]] = None

class Curso(CursoBase):
    id_curso: int
    model_config = ConfigDict(extra="ignore")

# Trilha Model
class TrilhaBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    tags: Optional[List[int]] = []

class TrilhaCreate(TrilhaBase):
    pass

class TrilhaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    tags: Optional[List[int]] = None

class Trilha(TrilhaBase):
    id_trilha: int
    model_config = ConfigDict(extra="ignore")

# Curso_Trilha Model
class CursoTrilhaBase(BaseModel):
    id_curso: int
    id_trilha: int
    ordem: int
    id_prerequisito: Optional[int] = None

class CursoTrilhaCreate(CursoTrilhaBase):
    pass

class CursoTrilha(CursoTrilhaBase):
    id_curso_trilha: int
    model_config = ConfigDict(extra="ignore")

# Regra Treinamento Obrigatório Model
class RegraObrigatorioBase(BaseModel):
    id_curso: Optional[int] = None
    id_trilha: Optional[int] = None
    id_cargo: Optional[int] = None
    id_area: Optional[int] = None
    validade_certificado_meses: int

class RegraObrigatorioCreate(RegraObrigatorioBase):
    pass

class RegraObrigatorio(RegraObrigatorioBase):
    id_regra: int
    model_config = ConfigDict(extra="ignore")

# Inscricao Model
class InscricaoBase(BaseModel):
    id_colaborador: int
    id_curso: int
    data_inscricao: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    data_prevista: Optional[datetime] = None
    status: StatusInscricao = StatusInscricao.PENDENTE
    tipo_inscricao: TipoInscricao = TipoInscricao.MANUAL
    data_conclusao: Optional[datetime] = None

class InscricaoCreate(BaseModel):
    id_colaborador: int
    id_curso: int
    data_prevista: Optional[datetime] = None
    tipo_inscricao: TipoInscricao = TipoInscricao.MANUAL

class InscricaoUpdate(BaseModel):
    status: Optional[StatusInscricao] = None
    data_conclusao: Optional[datetime] = None
    data_prevista: Optional[datetime] = None

class Inscricao(InscricaoBase):
    id_inscricao: int
    model_config = ConfigDict(extra="ignore")

# Progresso Model
class ProgressoBase(BaseModel):
    id_inscricao: int
    percentual: float = 0.0
    status: StatusInscricao = StatusInscricao.PENDENTE
    data_conclusao: Optional[datetime] = None

class ProgressoCreate(BaseModel):
    id_inscricao: int

class ProgressoUpdate(BaseModel):
    percentual: Optional[float] = None
    status: Optional[StatusInscricao] = None
    data_conclusao: Optional[datetime] = None

class Progresso(ProgressoBase):
    id_progresso: int
    model_config = ConfigDict(extra="ignore")

# Evidencia Participacao Model
class EvidenciaBase(BaseModel):
    id_inscricao: int
    tipo_evidencia: TipoEvidencia
    url_arquivo: Optional[str] = None
    data_registro: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EvidenciaCreate(BaseModel):
    id_inscricao: int
    tipo_evidencia: TipoEvidencia
    url_arquivo: Optional[str] = None

class Evidencia(EvidenciaBase):
    id_evidencia: int
    model_config = ConfigDict(extra="ignore")

# Certificado Model
class CertificadoBase(BaseModel):
    id_inscricao: int
    data_emissao: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    data_validade: Optional[datetime] = None

class CertificadoCreate(BaseModel):
    id_inscricao: int
    data_validade: Optional[datetime] = None

class Certificado(CertificadoBase):
    id_certificado: int
    model_config = ConfigDict(extra="ignore")

# Auditoria Model
class AuditoriaBase(BaseModel):
    id_colaborador_acao: int
    acao: AcaoAuditoria
    nome_tabela: str
    id_registro_afetado: Optional[int] = None
    ip_origem: Optional[str] = None
    dados_antigos: Optional[str] = None
    dados_novos: Optional[str] = None
    data_hora: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AuditoriaCreate(BaseModel):
    id_colaborador_acao: int
    acao: AcaoAuditoria
    nome_tabela: str
    id_registro_afetado: Optional[int] = None
    ip_origem: Optional[str] = None
    dados_antigos: Optional[str] = None
    dados_novos: Optional[str] = None

class Auditoria(AuditoriaBase):
    id_auditoria: int
    model_config = ConfigDict(extra="ignore")

# =============== HELPER FUNCTIONS ===============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

async def get_next_id(collection_name: str) -> int:
    """Generate next sequential ID for a collection"""
    counter = await db.counters.find_one_and_update(
        {"_id": collection_name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True
    )
    return counter["seq"] if counter else 1

# =============== AUTH ROUTES ===============

@api_router.post("/auth/register", response_model=Colaborador)
async def register(colaborador: ColaboradorCreate):
    # Check if email exists
    existing = await db.colaboradores.find_one({"email": colaborador.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    # Hash password
    senha_hash = hash_password(colaborador.senha)
    
    # Create colaborador
    id_colaborador = await get_next_id("colaboradores")
    doc = {
        "id_colaborador": id_colaborador,
        "nome": colaborador.nome,
        "email": colaborador.email,
        "senha_hash": senha_hash,
        "id_cargo": colaborador.id_cargo,
        "id_area": colaborador.id_area,
        "id_perfil": colaborador.id_perfil,
        "id_gestor": colaborador.id_gestor
    }
    
    await db.colaboradores.insert_one(doc)
    return Colaborador(**doc)

@api_router.post("/auth/login", response_model=Token)
async def login(credentials: ColaboradorLogin):
    # Find colaborador
    colab = await db.colaboradores.find_one({"email": credentials.email})
    if not colab or not verify_password(credentials.senha, colab["senha_hash"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    # Create token
    token = create_access_token({"sub": str(colab["id_colaborador"]), "email": colab["email"]})
    
    # Log login
    await db.auditoria.insert_one({
        "id_auditoria": await get_next_id("auditoria"),
        "id_colaborador_acao": colab["id_colaborador"],
        "acao": AcaoAuditoria.LOGIN.value,
        "nome_tabela": "colaboradores",
        "data_hora": datetime.now(timezone.utc).isoformat()
    })
    
    return Token(
        access_token=token,
        token_type="bearer",
        colaborador=Colaborador(**colab)
    )

# =============== AREA ROUTES ===============

@api_router.post("/areas", response_model=Area)
async def create_area(area: AreaCreate, token: dict = Depends(verify_token)):
    id_area = await get_next_id("areas")
    doc = {"id_area": id_area, **area.model_dump()}
    await db.areas.insert_one(doc)
    return Area(**doc)

@api_router.get("/areas", response_model=List[Area])
async def get_areas(token: dict = Depends(verify_token)):
    areas = await db.areas.find({}, {"_id": 0}).to_list(1000)
    return areas

@api_router.get("/areas/{id_area}", response_model=Area)
async def get_area(id_area: int, token: dict = Depends(verify_token)):
    area = await db.areas.find_one({"id_area": id_area}, {"_id": 0})
    if not area:
        raise HTTPException(status_code=404, detail="Área não encontrada")
    return Area(**area)

@api_router.put("/areas/{id_area}", response_model=Area)
async def update_area(id_area: int, area: AreaCreate, token: dict = Depends(verify_token)):
    result = await db.areas.update_one(
        {"id_area": id_area},
        {"$set": area.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Área não encontrada")
    updated = await db.areas.find_one({"id_area": id_area}, {"_id": 0})
    return Area(**updated)

@api_router.delete("/areas/{id_area}")
async def delete_area(id_area: int, token: dict = Depends(verify_token)):
    result = await db.areas.delete_one({"id_area": id_area})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Área não encontrada")
    return {"message": "Área deletada com sucesso"}

# =============== CARGO ROUTES ===============

@api_router.post("/cargos", response_model=Cargo)
async def create_cargo(cargo: CargoCreate, token: dict = Depends(verify_token)):
    id_cargo = await get_next_id("cargos")
    doc = {"id_cargo": id_cargo, **cargo.model_dump()}
    await db.cargos.insert_one(doc)
    return Cargo(**doc)

@api_router.get("/cargos", response_model=List[Cargo])
async def get_cargos(token: dict = Depends(verify_token)):
    cargos = await db.cargos.find({}, {"_id": 0}).to_list(1000)
    return cargos

@api_router.get("/cargos/{id_cargo}", response_model=Cargo)
async def get_cargo(id_cargo: int, token: dict = Depends(verify_token)):
    cargo = await db.cargos.find_one({"id_cargo": id_cargo}, {"_id": 0})
    if not cargo:
        raise HTTPException(status_code=404, detail="Cargo não encontrado")
    return Cargo(**cargo)

@api_router.put("/cargos/{id_cargo}", response_model=Cargo)
async def update_cargo(id_cargo: int, cargo: CargoCreate, token: dict = Depends(verify_token)):
    result = await db.cargos.update_one(
        {"id_cargo": id_cargo},
        {"$set": cargo.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Cargo não encontrado")
    updated = await db.cargos.find_one({"id_cargo": id_cargo}, {"_id": 0})
    return Cargo(**updated)

@api_router.delete("/cargos/{id_cargo}")
async def delete_cargo(id_cargo: int, token: dict = Depends(verify_token)):
    result = await db.cargos.delete_one({"id_cargo": id_cargo})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cargo não encontrado")
    return {"message": "Cargo deletado com sucesso"}

# =============== PERFIL ROUTES ===============

@api_router.post("/perfis", response_model=Perfil)
async def create_perfil(perfil: PerfilCreate, token: dict = Depends(verify_token)):
    id_perfil = await get_next_id("perfis")
    doc = {"id_perfil": id_perfil, **perfil.model_dump()}
    await db.perfis.insert_one(doc)
    return Perfil(**doc)

@api_router.get("/perfis", response_model=List[Perfil])
async def get_perfis(token: dict = Depends(verify_token)):
    perfis = await db.perfis.find({}, {"_id": 0}).to_list(1000)
    return perfis

@api_router.get("/perfis/{id_perfil}", response_model=Perfil)
async def get_perfil(id_perfil: int, token: dict = Depends(verify_token)):
    perfil = await db.perfis.find_one({"id_perfil": id_perfil}, {"_id": 0})
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil não encontrado")
    return Perfil(**perfil)

@api_router.delete("/perfis/{id_perfil}")
async def delete_perfil(id_perfil: int, token: dict = Depends(verify_token)):
    result = await db.perfis.delete_one({"id_perfil": id_perfil})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Perfil não encontrado")
    return {"message": "Perfil deletado com sucesso"}

# =============== COLABORADOR ROUTES ===============

@api_router.get("/colaboradores", response_model=List[Colaborador])
async def get_colaboradores(token: dict = Depends(verify_token)):
    colaboradores = await db.colaboradores.find({}, {"_id": 0, "senha_hash": 0}).to_list(1000)
    return colaboradores

@api_router.get("/colaboradores/{id_colaborador}", response_model=Colaborador)
async def get_colaborador(id_colaborador: int, token: dict = Depends(verify_token)):
    colab = await db.colaboradores.find_one({"id_colaborador": id_colaborador}, {"_id": 0, "senha_hash": 0})
    if not colab:
        raise HTTPException(status_code=404, detail="Colaborador não encontrado")
    return Colaborador(**colab)

@api_router.put("/colaboradores/{id_colaborador}", response_model=Colaborador)
async def update_colaborador(id_colaborador: int, colaborador: ColaboradorUpdate, token: dict = Depends(verify_token)):
    update_data = {k: v for k, v in colaborador.model_dump().items() if v is not None}
    
    if "senha" in update_data:
        update_data["senha_hash"] = hash_password(update_data.pop("senha"))
    
    if not update_data:
        raise HTTPException(status_code=400, detail="Nenhum dado para atualizar")
    
    result = await db.colaboradores.update_one(
        {"id_colaborador": id_colaborador},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Colaborador não encontrado")
    
    updated = await db.colaboradores.find_one({"id_colaborador": id_colaborador}, {"_id": 0, "senha_hash": 0})
    return Colaborador(**updated)

@api_router.delete("/colaboradores/{id_colaborador}")
async def delete_colaborador(id_colaborador: int, token: dict = Depends(verify_token)):
    result = await db.colaboradores.delete_one({"id_colaborador": id_colaborador})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Colaborador não encontrado")
    return {"message": "Colaborador deletado com sucesso"}

# =============== TAG ROUTES ===============

@api_router.post("/tags", response_model=Tag)
async def create_tag(tag: TagCreate, token: dict = Depends(verify_token)):
    id_tag = await get_next_id("tags")
    doc = {"id_tag": id_tag, **tag.model_dump()}
    await db.tags.insert_one(doc)
    return Tag(**doc)

@api_router.get("/tags", response_model=List[Tag])
async def get_tags(token: dict = Depends(verify_token)):
    tags = await db.tags.find({}, {"_id": 0}).to_list(1000)
    return tags

@api_router.delete("/tags/{id_tag}")
async def delete_tag(id_tag: int, token: dict = Depends(verify_token)):
    result = await db.tags.delete_one({"id_tag": id_tag})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Tag não encontrada")
    return {"message": "Tag deletada com sucesso"}

# =============== CURSO ROUTES ===============

@api_router.post("/cursos", response_model=Curso)
async def create_curso(curso: CursoCreate, token: dict = Depends(verify_token)):
    id_curso = await get_next_id("cursos")
    doc = {"id_curso": id_curso, **curso.model_dump()}
    await db.cursos.insert_one(doc)
    return Curso(**doc)

@api_router.get("/cursos", response_model=List[Curso])
async def get_cursos(token: dict = Depends(verify_token)):
    cursos = await db.cursos.find({}, {"_id": 0}).to_list(1000)
    return cursos

@api_router.get("/cursos/{id_curso}", response_model=Curso)
async def get_curso(id_curso: int, token: dict = Depends(verify_token)):
    curso = await db.cursos.find_one({"id_curso": id_curso}, {"_id": 0})
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return Curso(**curso)

@api_router.put("/cursos/{id_curso}", response_model=Curso)
async def update_curso(id_curso: int, curso: CursoUpdate, token: dict = Depends(verify_token)):
    update_data = {k: v for k, v in curso.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nenhum dado para atualizar")
    
    result = await db.cursos.update_one(
        {"id_curso": id_curso},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    
    updated = await db.cursos.find_one({"id_curso": id_curso}, {"_id": 0})
    return Curso(**updated)

@api_router.delete("/cursos/{id_curso}")
async def delete_curso(id_curso: int, token: dict = Depends(verify_token)):
    result = await db.cursos.delete_one({"id_curso": id_curso})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return {"message": "Curso deletado com sucesso"}

# =============== TRILHA ROUTES ===============

@api_router.post("/trilhas", response_model=Trilha)
async def create_trilha(trilha: TrilhaCreate, token: dict = Depends(verify_token)):
    id_trilha = await get_next_id("trilhas")
    doc = {"id_trilha": id_trilha, **trilha.model_dump()}
    await db.trilhas.insert_one(doc)
    return Trilha(**doc)

@api_router.get("/trilhas", response_model=List[Trilha])
async def get_trilhas(token: dict = Depends(verify_token)):
    trilhas = await db.trilhas.find({}, {"_id": 0}).to_list(1000)
    return trilhas

@api_router.get("/trilhas/{id_trilha}", response_model=Trilha)
async def get_trilha(id_trilha: int, token: dict = Depends(verify_token)):
    trilha = await db.trilhas.find_one({"id_trilha": id_trilha}, {"_id": 0})
    if not trilha:
        raise HTTPException(status_code=404, detail="Trilha não encontrada")
    return Trilha(**trilha)

@api_router.put("/trilhas/{id_trilha}", response_model=Trilha)
async def update_trilha(id_trilha: int, trilha: TrilhaUpdate, token: dict = Depends(verify_token)):
    update_data = {k: v for k, v in trilha.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nenhum dado para atualizar")
    
    result = await db.trilhas.update_one(
        {"id_trilha": id_trilha},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Trilha não encontrada")
    
    updated = await db.trilhas.find_one({"id_trilha": id_trilha}, {"_id": 0})
    return Trilha(**updated)

@api_router.delete("/trilhas/{id_trilha}")
async def delete_trilha(id_trilha: int, token: dict = Depends(verify_token)):
    result = await db.trilhas.delete_one({"id_trilha": id_trilha})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Trilha não encontrada")
    return {"message": "Trilha deletada com sucesso"}

# =============== CURSO_TRILHA ROUTES ===============

@api_router.post("/curso-trilhas", response_model=CursoTrilha)
async def create_curso_trilha(ct: CursoTrilhaCreate, token: dict = Depends(verify_token)):
    id_curso_trilha = await get_next_id("curso_trilhas")
    doc = {"id_curso_trilha": id_curso_trilha, **ct.model_dump()}
    await db.curso_trilhas.insert_one(doc)
    return CursoTrilha(**doc)

@api_router.get("/curso-trilhas", response_model=List[CursoTrilha])
async def get_curso_trilhas(id_trilha: Optional[int] = None, token: dict = Depends(verify_token)):
    query = {"id_trilha": id_trilha} if id_trilha else {}
    curso_trilhas = await db.curso_trilhas.find(query, {"_id": 0}).to_list(1000)
    return curso_trilhas

@api_router.delete("/curso-trilhas/{id_curso_trilha}")
async def delete_curso_trilha(id_curso_trilha: int, token: dict = Depends(verify_token)):
    result = await db.curso_trilhas.delete_one({"id_curso_trilha": id_curso_trilha})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Curso-Trilha não encontrado")
    return {"message": "Curso-Trilha deletado com sucesso"}

# =============== REGRA OBRIGATORIO ROUTES ===============

@api_router.post("/regras-obrigatorias", response_model=RegraObrigatorio)
async def create_regra(regra: RegraObrigatorioCreate, token: dict = Depends(verify_token)):
    if not regra.id_curso and not regra.id_trilha:
        raise HTTPException(status_code=400, detail="Deve especificar id_curso ou id_trilha")
    
    id_regra = await get_next_id("regras_obrigatorias")
    doc = {"id_regra": id_regra, **regra.model_dump()}
    await db.regras_obrigatorias.insert_one(doc)
    return RegraObrigatorio(**doc)

@api_router.get("/regras-obrigatorias", response_model=List[RegraObrigatorio])
async def get_regras(token: dict = Depends(verify_token)):
    regras = await db.regras_obrigatorias.find({}, {"_id": 0}).to_list(1000)
    return regras

@api_router.delete("/regras-obrigatorias/{id_regra}")
async def delete_regra(id_regra: int, token: dict = Depends(verify_token)):
    result = await db.regras_obrigatorias.delete_one({"id_regra": id_regra})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Regra não encontrada")
    return {"message": "Regra deletada com sucesso"}

# =============== INSCRICAO ROUTES ===============

@api_router.post("/inscricoes", response_model=Inscricao)
async def create_inscricao(inscricao: InscricaoCreate, token: dict = Depends(verify_token)):
    id_inscricao = await get_next_id("inscricoes")
    doc = {
        "id_inscricao": id_inscricao,
        "id_colaborador": inscricao.id_colaborador,
        "id_curso": inscricao.id_curso,
        "data_inscricao": datetime.now(timezone.utc).isoformat(),
        "data_prevista": inscricao.data_prevista.isoformat() if inscricao.data_prevista else None,
        "status": StatusInscricao.PENDENTE.value,
        "tipo_inscricao": inscricao.tipo_inscricao.value,
        "data_conclusao": None
    }
    await db.inscricoes.insert_one(doc)
    
    # Create progresso automaticamente
    id_progresso = await get_next_id("progressos")
    await db.progressos.insert_one({
        "id_progresso": id_progresso,
        "id_inscricao": id_inscricao,
        "percentual": 0.0,
        "status": StatusInscricao.PENDENTE.value,
        "data_conclusao": None
    })
    
    doc["data_inscricao"] = datetime.fromisoformat(doc["data_inscricao"])
    if doc["data_prevista"]:
        doc["data_prevista"] = datetime.fromisoformat(doc["data_prevista"])
    return Inscricao(**doc)

@api_router.get("/inscricoes", response_model=List[Inscricao])
async def get_inscricoes(
    id_colaborador: Optional[int] = None,
    id_curso: Optional[int] = None,
    token: dict = Depends(verify_token)
):
    query = {}
    if id_colaborador:
        query["id_colaborador"] = id_colaborador
    if id_curso:
        query["id_curso"] = id_curso
    
    inscricoes = await db.inscricoes.find(query, {"_id": 0}).to_list(1000)
    for insc in inscricoes:
        if isinstance(insc["data_inscricao"], str):
            insc["data_inscricao"] = datetime.fromisoformat(insc["data_inscricao"])
        if insc.get("data_prevista") and isinstance(insc["data_prevista"], str):
            insc["data_prevista"] = datetime.fromisoformat(insc["data_prevista"])
        if insc.get("data_conclusao") and isinstance(insc["data_conclusao"], str):
            insc["data_conclusao"] = datetime.fromisoformat(insc["data_conclusao"])
    return inscricoes

@api_router.get("/inscricoes/{id_inscricao}", response_model=Inscricao)
async def get_inscricao(id_inscricao: int, token: dict = Depends(verify_token)):
    insc = await db.inscricoes.find_one({"id_inscricao": id_inscricao}, {"_id": 0})
    if not insc:
        raise HTTPException(status_code=404, detail="Inscrição não encontrada")
    
    if isinstance(insc["data_inscricao"], str):
        insc["data_inscricao"] = datetime.fromisoformat(insc["data_inscricao"])
    if insc.get("data_prevista") and isinstance(insc["data_prevista"], str):
        insc["data_prevista"] = datetime.fromisoformat(insc["data_prevista"])
    if insc.get("data_conclusao") and isinstance(insc["data_conclusao"], str):
        insc["data_conclusao"] = datetime.fromisoformat(insc["data_conclusao"])
    return Inscricao(**insc)

@api_router.put("/inscricoes/{id_inscricao}", response_model=Inscricao)
async def update_inscricao(id_inscricao: int, inscricao: InscricaoUpdate, token: dict = Depends(verify_token)):
    update_data = {k: v.isoformat() if isinstance(v, datetime) else v for k, v in inscricao.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nenhum dado para atualizar")
    
    result = await db.inscricoes.update_one(
        {"id_inscricao": id_inscricao},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inscrição não encontrada")
    
    # Update progresso if status changed
    if "status" in update_data:
        await db.progressos.update_one(
            {"id_inscricao": id_inscricao},
            {"$set": {"status": update_data["status"]}}
        )
    
    updated = await db.inscricoes.find_one({"id_inscricao": id_inscricao}, {"_id": 0})
    if isinstance(updated["data_inscricao"], str):
        updated["data_inscricao"] = datetime.fromisoformat(updated["data_inscricao"])
    if updated.get("data_prevista") and isinstance(updated["data_prevista"], str):
        updated["data_prevista"] = datetime.fromisoformat(updated["data_prevista"])
    if updated.get("data_conclusao") and isinstance(updated["data_conclusao"], str):
        updated["data_conclusao"] = datetime.fromisoformat(updated["data_conclusao"])
    return Inscricao(**updated)

# =============== PROGRESSO ROUTES ===============

@api_router.get("/progressos", response_model=List[Progresso])
async def get_progressos(id_inscricao: Optional[int] = None, token: dict = Depends(verify_token)):
    query = {"id_inscricao": id_inscricao} if id_inscricao else {}
    progressos = await db.progressos.find(query, {"_id": 0}).to_list(1000)
    for prog in progressos:
        if prog.get("data_conclusao") and isinstance(prog["data_conclusao"], str):
            prog["data_conclusao"] = datetime.fromisoformat(prog["data_conclusao"])
    return progressos

@api_router.put("/progressos/{id_progresso}", response_model=Progresso)
async def update_progresso(id_progresso: int, progresso: ProgressoUpdate, token: dict = Depends(verify_token)):
    update_data = {k: v.isoformat() if isinstance(v, datetime) else v for k, v in progresso.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nenhum dado para atualizar")
    
    result = await db.progressos.update_one(
        {"id_progresso": id_progresso},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Progresso não encontrado")
    
    updated = await db.progressos.find_one({"id_progresso": id_progresso}, {"_id": 0})
    if updated.get("data_conclusao") and isinstance(updated["data_conclusao"], str):
        updated["data_conclusao"] = datetime.fromisoformat(updated["data_conclusao"])
    return Progresso(**updated)

# =============== EVIDENCIA ROUTES ===============

@api_router.post("/evidencias", response_model=Evidencia)
async def create_evidencia(evidencia: EvidenciaCreate, token: dict = Depends(verify_token)):
    id_evidencia = await get_next_id("evidencias")
    doc = {
        "id_evidencia": id_evidencia,
        "id_inscricao": evidencia.id_inscricao,
        "tipo_evidencia": evidencia.tipo_evidencia.value,
        "url_arquivo": evidencia.url_arquivo,
        "data_registro": datetime.now(timezone.utc).isoformat()
    }
    await db.evidencias.insert_one(doc)
    doc["data_registro"] = datetime.fromisoformat(doc["data_registro"])
    return Evidencia(**doc)

@api_router.get("/evidencias", response_model=List[Evidencia])
async def get_evidencias(id_inscricao: Optional[int] = None, token: dict = Depends(verify_token)):
    query = {"id_inscricao": id_inscricao} if id_inscricao else {}
    evidencias = await db.evidencias.find(query, {"_id": 0}).to_list(1000)
    for ev in evidencias:
        if isinstance(ev["data_registro"], str):
            ev["data_registro"] = datetime.fromisoformat(ev["data_registro"])
    return evidencias

# =============== CERTIFICADO ROUTES ===============

@api_router.post("/certificados", response_model=Certificado)
async def create_certificado(certificado: CertificadoCreate, token: dict = Depends(verify_token)):
    # Verify inscricao is completed
    inscricao = await db.inscricoes.find_one({"id_inscricao": certificado.id_inscricao})
    if not inscricao:
        raise HTTPException(status_code=404, detail="Inscrição não encontrada")
    
    id_certificado = await get_next_id("certificados")
    doc = {
        "id_certificado": id_certificado,
        "id_inscricao": certificado.id_inscricao,
        "data_emissao": datetime.now(timezone.utc).isoformat(),
        "data_validade": certificado.data_validade.isoformat() if certificado.data_validade else None
    }
    await db.certificados.insert_one(doc)
    
    doc["data_emissao"] = datetime.fromisoformat(doc["data_emissao"])
    if doc["data_validade"]:
        doc["data_validade"] = datetime.fromisoformat(doc["data_validade"])
    return Certificado(**doc)

@api_router.get("/certificados", response_model=List[Certificado])
async def get_certificados(id_inscricao: Optional[int] = None, token: dict = Depends(verify_token)):
    query = {"id_inscricao": id_inscricao} if id_inscricao else {}
    certificados = await db.certificados.find(query, {"_id": 0}).to_list(1000)
    for cert in certificados:
        if isinstance(cert["data_emissao"], str):
            cert["data_emissao"] = datetime.fromisoformat(cert["data_emissao"])
        if cert.get("data_validade") and isinstance(cert["data_validade"], str):
            cert["data_validade"] = datetime.fromisoformat(cert["data_validade"])
    return certificados

# =============== DASHBOARD & REPORTS ===============

@api_router.get("/dashboard/stats")
async def get_dashboard_stats(token: dict = Depends(verify_token)):
    total_cursos = await db.cursos.count_documents({})
    total_colaboradores = await db.colaboradores.count_documents({})
    total_inscricoes = await db.inscricoes.count_documents({})
    inscricoes_concluidas = await db.inscricoes.count_documents({"status": StatusInscricao.CONCLUIDO.value})
    inscricoes_pendentes = await db.inscricoes.count_documents({"status": StatusInscricao.PENDENTE.value})
    
    return {
        "total_cursos": total_cursos,
        "total_colaboradores": total_colaboradores,
        "total_inscricoes": total_inscricoes,
        "inscricoes_concluidas": inscricoes_concluidas,
        "inscricoes_pendentes": inscricoes_pendentes
    }

@api_router.get("/reports/colaborador/{id_colaborador}")
async def get_colaborador_report(id_colaborador: int, token: dict = Depends(verify_token)):
    # Get colaborador info
    colab = await db.colaboradores.find_one({"id_colaborador": id_colaborador}, {"_id": 0, "senha_hash": 0})
    if not colab:
        raise HTTPException(status_code=404, detail="Colaborador não encontrado")
    
    # Get inscricoes
    inscricoes = await db.inscricoes.find({"id_colaborador": id_colaborador}, {"_id": 0}).to_list(1000)
    
    # Get progressos
    inscricao_ids = [i["id_inscricao"] for i in inscricoes]
    progressos = await db.progressos.find({"id_inscricao": {"$in": inscricao_ids}}, {"_id": 0}).to_list(1000)
    
    # Get certificados
    certificados = await db.certificados.find({"id_inscricao": {"$in": inscricao_ids}}, {"_id": 0}).to_list(1000)
    
    return {
        "colaborador": colab,
        "inscricoes": inscricoes,
        "progressos": progressos,
        "certificados": certificados
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@api_router.get("/")
async def root():
    return {"message": "Sistema de Gerenciamento de Cursos Obrigatórios - API v1.0"}