# 🚀 Instalação Rápida - Windows

## ⚡ Setup em 5 Minutos

### 📋 Você Precisa Ter

- ✅ Node.js instalado
- ✅ Python instalado
- ✅ VSCode instalado
- ✅ MongoDB rodando em `localhost:27017` (sem autenticação)

---

## 🎯 Passo a Passo

### 1️⃣ Abra 2 Terminais no VSCode

**Terminal 1 - Backend:**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

✅ Backend rodando em: `http://localhost:8001`

---

**Terminal 2 - Frontend:**

```bash
cd frontend
npm install
npm start
```

✅ Frontend rodando em: `http://localhost:3000`

---

### 2️⃣ Crie Seu Primeiro Usuário

Abra: `http://localhost:8001/docs`

Execute **NA ORDEM**:

#### 1. Criar Área
```json
POST /api/areas
{
  "nome": "Campo",
  "departamento": "Produção"
}
```

#### 2. Criar Cargo
```json
POST /api/cargos
{
  "nome": "Trabalhador Rural"
}
```

#### 3. Criar Perfil
```json
POST /api/perfis
{
  "nome": "Administrador"
}
```

#### 4. Registrar Colaborador
```json
POST /api/auth/register
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "id_cargo": 1,
  "id_area": 1,
  "id_perfil": 1
}
```

---

### 3️⃣ Faça Login

Abra: `http://localhost:3000`

**Credenciais:**
- Email: `joao@example.com`
- Senha: `senha123`

---

## ✅ Pronto!

Agora você pode:
- ✅ Criar cursos
- ✅ Organizar trilhas
- ✅ Cadastrar colaboradores
- ✅ Configurar regras obrigatórias
- ✅ Gerenciar inscrições e certificados

---

## 🆘 Problemas?

### MongoDB não conecta
```bash
# Teste:
mongosh mongodb://root:root@localhost:3305
```

### Backend com erro
```bash
# Reinstale:
pip install -r requirements.txt --force-reinstall
```

### Frontend não carrega
1. Verifique se backend está rodando
2. Confirme que `frontend/.env` tem:
   ```
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```
3. Reinicie: `npm start`

---

## 📚 Documentação Completa

- **API Docs**: `http://localhost:8001/docs`
- **README completo**: Ver arquivo `README.md`

---

**Desenvolvido com FastAPI + React + MongoDB** 🚀
