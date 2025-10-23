# 🪟 Guia Completo de Instalação - Windows

**TechSolutions - Sistema de Treinamentos Obrigatórios NR-31**  
**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph

---

## 📋 SUMÁRIO

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação do Python](#instalação-do-python)
3. [Instalação do Node.js](#instalação-do-nodejs)
4. [Instalação do MongoDB](#instalação-do-mongodb)
5. [Instalação do Git](#instalação-do-git)
6. [Clone do Projeto](#clone-do-projeto)
7. [Configuração do Backend](#configuração-do-backend)
8. [Configuração do Frontend](#configuração-do-frontend)
9. [Execução do Sistema](#execução-do-sistema)
10. [Resolução de Problemas](#resolução-de-problemas)

---

## 📦 PRÉ-REQUISITOS

### O que você precisa instalar:

- ✅ **Python 3.10+** (Backend)
- ✅ **Node.js 18+** (Frontend)
- ✅ **MongoDB 6.0+** (Banco de Dados)
- ✅ **Git** (Controle de versão)
- ✅ **VSCode** (Opcional - Editor de código)

---

## 🐍 1. INSTALAÇÃO DO PYTHON

### Passo 1.1: Baixar Python

1. Acesse: https://www.python.org/downloads/
2. Clique em **"Download Python 3.12.x"**
3. Execute o instalador baixado

### Passo 1.2: Instalar Python

**⚠️ IMPORTANTE:** Marque as opções:
- ☑️ **"Add Python to PATH"**
- ☑️ **"Install pip"**

Clique em **"Install Now"**

### Passo 1.3: Verificar Instalação

Abra o **PowerShell** ou **CMD** e execute:

```powershell
python --version
```

**Saída esperada:**
```
Python 3.12.x
```

```powershell
pip --version
```

**Saída esperada:**
```
pip 24.x.x from ...
```

---

## 📗 2. INSTALAÇÃO DO NODE.JS

### Passo 2.1: Baixar Node.js

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS (Long Term Support)**
3. Execute o instalador

### Passo 2.2: Instalar Node.js

- Clique em **"Next"** em todas as etapas
- Aceite os termos de licença
- Marque **"Automatically install necessary tools"**
- Clique em **"Install"**

### Passo 2.3: Verificar Instalação

```powershell
node --version
```

**Saída esperada:**
```
v20.x.x
```

```powershell
npm --version
```

**Saída esperada:**
```
10.x.x
```

---

## 🍃 3. INSTALAÇÃO DO MONGODB

### Passo 3.1: Baixar MongoDB Community Edition

1. Acesse: https://www.mongodb.com/try/download/community
2. Selecione:
   - **Version:** 7.0.x (Current)
   - **Platform:** Windows
   - **Package:** MSI
3. Clique em **"Download"**

### Passo 3.2: Instalar MongoDB

1. Execute o instalador `.msi`
2. Escolha **"Complete"** installation
3. Marque **"Install MongoDB as a Service"**
4. Deixe marcado **"Run service as Network Service user"**
5. Data Directory: `C:\Program Files\MongoDB\Server\7.0\data\`
6. Log Directory: `C:\Program Files\MongoDB\Server\7.0\log\`

### Passo 3.3: Adicionar MongoDB ao PATH

**Opção A - Via Interface Gráfica:**

1. Pressione `Win + R`
2. Digite: `sysdm.cpl` e Enter
3. Aba **"Advanced"** → **"Environment Variables"**
4. Em **"System variables"**, selecione **"Path"** → **"Edit"**
5. Clique em **"New"**
6. Adicione: `C:\Program Files\MongoDB\Server\7.0\bin`
7. Clique **"OK"** em todas as janelas

**Opção B - Via PowerShell (Admin):**

```powershell
[Environment]::SetEnvironmentVariable(
    "Path",
    $env:Path + ";C:\Program Files\MongoDB\Server\7.0\bin",
    [EnvironmentVariableTarget]::Machine
)
```

### Passo 3.4: Iniciar MongoDB

**Opção A - Como Serviço (Recomendado):**

```powershell
net start MongoDB
```

**Opção B - Manual:**

```powershell
mongod --dbpath="C:\data\db"
```

### Passo 3.5: Verificar MongoDB

Abra novo terminal:

```powershell
mongosh
```

**Saída esperada:**
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 7.0.x
```

Para sair:
```
exit
```

---

## 🔀 4. INSTALAÇÃO DO GIT

### Passo 4.1: Baixar Git

1. Acesse: https://git-scm.com/download/win
2. Download automático começará
3. Execute o instalador

### Passo 4.2: Instalar Git

- Aceite as configurações padrão
- Editor: Escolha seu preferido (VSCode recomendado)
- Clique em **"Next"** até finalizar

### Passo 4.3: Verificar Git

```powershell
git --version
```

**Saída esperada:**
```
git version 2.43.x
```

---

## 📥 5. CLONE DO PROJETO

### Passo 5.1: Escolher Pasta

Escolha onde quer clonar (exemplo: `C:\Projetos`)

```powershell
cd C:\Projetos
```

### Passo 5.2: Clonar Repositório

```powershell
git clone https://github.com/thiagodorgo/ProjetoAplicado_2025.1.git
```

### Passo 5.3: Entrar na Pasta

```powershell
cd ProjetoAplicado_2025.1
```

---

## ⚙️ 6. CONFIGURAÇÃO DO BACKEND

### Passo 6.1: Entrar na Pasta Backend

```powershell
cd backend
```

### Passo 6.2: Criar Ambiente Virtual Python

```powershell
python -m venv venv
```

### Passo 6.3: Ativar Ambiente Virtual

```powershell
.\venv\Scripts\activate
```

**Saída esperada:** `(venv)` aparece no início da linha

### Passo 6.4: Instalar Dependências

```powershell
pip install -r requirements.txt
```

**Pacotes instalados:**
- `fastapi` - Framework web
- `uvicorn` - Servidor ASGI
- `motor` - Driver MongoDB assíncrono
- `pydantic` - Validação de dados
- `python-jose` - JWT
- `bcrypt` - Hash de senhas
- `python-dotenv` - Variáveis de ambiente

### Passo 6.5: Verificar Arquivo .env

Confirme que `backend/.env` existe e contém:

```env
MONGO_URL="mongodb://localhost:27017/"
DB_NAME="techsolutions_treinamentos"
CORS_ORIGINS="http://localhost:3000"
JWT_SECRET="seu-secret-key-super-seguro-troque-em-producao-123456"
```

---

## 🎨 7. CONFIGURAÇÃO DO FRONTEND

### Passo 7.1: Voltar e Entrar no Frontend

```powershell
cd ..
cd frontend
```

### Passo 7.2: Instalar Dependências

```powershell
npm install
```

**Pacotes principais instalados:**
- `react` - Biblioteca UI
- `react-router-dom` - Roteamento
- `axios` - Cliente HTTP
- `tailwindcss` - Framework CSS
- `@radix-ui/*` - Componentes UI
- `sonner` - Notificações

**Tempo estimado:** 2-5 minutos

### Passo 7.3: Verificar Arquivo .env

Confirme que `frontend/.env` existe e contém:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=0
```

---

## 🚀 8. EXECUÇÃO DO SISTEMA

### Passo 8.1: Iniciar MongoDB

Em um terminal (PowerShell como Admin):

```powershell
net start MongoDB
```

### Passo 8.2: Iniciar Backend

Em um novo terminal:

```powershell
cd C:\Projetos\ProjetoAplicado_2025.1\backend
.\venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Saída esperada:**
```
INFO:     Started server process [xxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8001
```

**✅ Backend rodando em:** http://localhost:8001  
**📖 Documentação API:** http://localhost:8001/docs

### Passo 8.3: Iniciar Frontend

Em um **NOVO** terminal (deixe o backend rodando):

```powershell
cd C:\Projetos\ProjetoAplicado_2025.1\frontend
npm start
```

**Saída esperada:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
```

O navegador abrirá automaticamente em http://localhost:3000

**✅ Frontend rodando em:** http://localhost:3000

---

## 🔧 9. CRIAR PRIMEIRO USUÁRIO

### Opção A: Via Swagger UI (Recomendado)

1. Acesse: http://localhost:8001/docs
2. Execute **NA ORDEM:**

#### 1. Criar Área
```json
POST /api/areas
{
  "nome": "Setor Campo",
  "departamento": "Produção Agrícola",
  "localizacao": "Fazenda Principal"
}
```

#### 2. Criar Cargo
```json
POST /api/cargos
{
  "nome": "Operador de Máquinas Agrícolas",
  "descricao": "Opera tratores e colheitadeiras",
  "requer_nr31": true
}
```

#### 3. Criar Perfil
```json
POST /api/perfis
{
  "nome": "Administrador",
  "permissoes": ["admin", "create", "read", "update", "delete"]
}
```

#### 4. Registrar Colaborador
```json
POST /api/auth/register
{
  "nome": "João da Silva",
  "email": "joao.silva@techsolutions.com",
  "cpf": "123.456.789-00",
  "senha": "senha123",
  "id_cargo": 1,
  "id_area": 1,
  "id_perfil": 1,
  "ativo": true
}
```

### Opção B: Via MongoDB Compass

1. Baixe MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Conecte em: `mongodb://localhost:27017`
3. Selecione database: `techsolutions_treinamentos`
4. Insira documentos manualmente nas collections

---

## 🔐 10. FAZER LOGIN

1. Acesse: http://localhost:3000
2. Digite:
   - **Email:** `joao.silva@techsolutions.com`
   - **Senha:** `senha123`
3. Clique em **"Entrar"**

**✅ Você está dentro do sistema!**

---

## 🐛 11. RESOLUÇÃO DE PROBLEMAS

### Problema 1: "Python não é reconhecido"

**Solução:**
```powershell
# Adicionar ao PATH manualmente
$env:Path += ";C:\Users\SeuUsuario\AppData\Local\Programs\Python\Python312"
```

### Problema 2: "MongoDB não conecta"

**Solução 1 - Verificar se está rodando:**
```powershell
tasklist | findstr mongod
```

**Solução 2 - Reiniciar serviço:**
```powershell
net stop MongoDB
net start MongoDB
```

**Solução 3 - Verificar porta 27017:**
```powershell
netstat -ano | findstr :27017
```

### Problema 3: "Porta 8001 já em uso"

**Solução:**
```powershell
# Encontrar processo
netstat -ano | findstr :8001

# Matar processo (substitua PID)
taskkill /PID 12345 /F
```

### Problema 4: "npm ERR!"

**Solução:**
```powershell
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Problema 5: "CORS Error"

**Solução:** Verificar `backend/.env`:
```env
CORS_ORIGINS="http://localhost:3000"
```

Reiniciar backend.

### Problema 6: "ModuleNotFoundError"

**Solução:**
```powershell
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt --force-reinstall
```

---

## 📊 12. ESTRUTURA DE PASTAS

```
ProjetoAplicado_2025.1/
├── backend/
│   ├── venv/                # Ambiente virtual Python (criado)
│   ├── server.py            # Aplicação FastAPI
│   ├── requirements.txt     # Dependências Python
│   └── .env                # Configurações
│
├── frontend/
│   ├── node_modules/        # Dependências Node (criado)
│   ├── public/             # Arquivos públicos
│   ├── src/                # Código fonte React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── App.js          # Componente principal
│   │   └── index.js        # Entrada da aplicação
│   ├── package.json        # Dependências e scripts
│   └── .env               # Configurações
│
├── README.md               # Documentação geral
└── [outros arquivos de documentação]
```

---

## ✅ 13. VERIFICAÇÃO FINAL

### Checklist de Verificação:

- [ ] Python instalado e no PATH
- [ ] Node.js instalado
- [ ] MongoDB rodando
- [ ] Git instalado
- [ ] Projeto clonado
- [ ] Backend dependencies instaladas
- [ ] Frontend dependencies instaladas
- [ ] Backend rodando em http://localhost:8001
- [ ] Frontend rodando em http://localhost:3000
- [ ] Swagger UI acessível em http://localhost:8001/docs
- [ ] Usuário criado
- [ ] Login funcionando

---

## 📞 SUPORTE

Se encontrar problemas:

1. ✅ Verifique a seção **Resolução de Problemas**
2. ✅ Consulte logs do backend e frontend
3. ✅ Revise a documentação da API em `/docs`
4. ✅ Verifique se todas as dependências estão instaladas
5. ✅ Confirme que MongoDB está rodando

---

## 🎓 COMANDOS ÚTEIS

### Backend:
```powershell
# Ativar ambiente virtual
.\venv\Scripts\activate

# Instalar nova dependência
pip install nome-pacote

# Atualizar requirements.txt
pip freeze > requirements.txt

# Rodar servidor
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend:
```powershell
# Instalar dependência
npm install nome-pacote

# Rodar em desenvolvimento
npm start

# Build de produção
npm run build

# Limpar cache
npm cache clean --force
```

### MongoDB:
```powershell
# Iniciar serviço
net start MongoDB

# Parar serviço
net stop MongoDB

# Conectar via shell
mongosh

# Ver databases
show dbs

# Usar database
use techsolutions_treinamentos

# Ver collections
show collections
```

---

**🎉 SISTEMA INSTALADO E RODANDO COM SUCESSO!**

**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph
