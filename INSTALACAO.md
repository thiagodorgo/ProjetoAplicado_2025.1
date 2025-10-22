# 📦 Guia Rápido de Instalação - Windows

## Passo a Passo Simplificado

### 1️⃣ Prepare o Ambiente

Você já tem:
- ✅ Node.js instalado
- ✅ VSCode instalado  
- ✅ MongoDB rodando em `localhost:3305`

### 2️⃣ Abra o Projeto no VSCode

```bash
# Abra o VSCode na pasta do projeto
code .
```

### 3️⃣ Terminal 1: Backend

```bash
# Entre na pasta backend
cd backend

# Crie ambiente virtual Python
python -m venv venv

# Ative o ambiente virtual
venv\Scripts\activate

# Instale dependências
pip install -r requirements.txt

# Configure o .env (já está configurado)
# MONGO_URL="mongodb://root:root@localhost:3305"
# DB_NAME="curso_management"

# Inicie o backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

✅ Backend rodando em: `http://localhost:8001`

### 4️⃣ Terminal 2: Frontend

Abra um **novo terminal** no VSCode (deixe o backend rodando):

```bash
# Entre na pasta frontend
cd frontend

# Instale dependências
npm install

# Configure o .env
# Crie o arquivo frontend/.env com:
# REACT_APP_BACKEND_URL=http://localhost:8001

# Inicie o frontend
npm start
```

✅ Frontend rodando em: `http://localhost:3000`

### 5️⃣ Crie Seu Primeiro Usuário

**Opção A: Via Terminal (curl)**

```bash
# 1. Crie uma Área
curl -X POST "http://localhost:8001/api/areas" -H "Content-Type: application/json" -d "{\"nome\": \"Campo\", \"departamento\": \"Producao\"}"

# 2. Crie um Cargo
curl -X POST "http://localhost:8001/api/cargos" -H "Content-Type: application/json" -d "{\"nome\": \"Trabalhador Rural\"}"

# 3. Crie um Perfil
curl -X POST "http://localhost:8001/api/perfis" -H "Content-Type: application/json" -d "{\"nome\": \"Administrador\"}"

# 4. Registre um Colaborador
curl -X POST "http://localhost:8001/api/auth/register" -H "Content-Type: application/json" -d "{\"nome\": \"Joao Silva\", \"email\": \"joao@example.com\", \"senha\": \"senha123\", \"id_cargo\": 1, \"id_area\": 1, \"id_perfil\": 1}"
```

**Opção B: Via Swagger UI**

1. Abra `http://localhost:8001/docs`
2. Siga a ordem:
   - POST `/api/areas` → Crie uma área
   - POST `/api/cargos` → Crie um cargo
   - POST `/api/perfis` → Crie um perfil
   - POST `/api/auth/register` → Registre colaborador

### 6️⃣ Faça Login

1. Abra `http://localhost:3000`
2. Entre com:
   - **Email**: `joao@example.com`
   - **Senha**: `senha123`

---

## ✅ Pronto!

Agora você pode:
- ✅ Criar cursos
- ✅ Organizar trilhas
- ✅ Cadastrar colaboradores
- ✅ Configurar regras obrigatórias
- ✅ Gerenciar inscrições

---

## 🚨 Problemas Comuns

### MongoDB não conecta
```bash
# Teste a conexão:
mongosh mongodb://root:root@localhost:3305
```

### Backend não inicia
```bash
# Reinstale as dependências:
pip install -r requirements.txt --force-reinstall
```

### Frontend não conecta
1. Verifique se o backend está em `http://localhost:8001`
2. Confirme o `.env` do frontend
3. Reinicie com `npm start`

---

## 📚 Documentação Completa

Veja o arquivo `README.md` para informações detalhadas sobre:
- Estrutura do projeto
- Todos os endpoints da API
- Estrutura do banco de dados
- Guia de uso completo
