
# TechSolutions - Sistema de Treinamentos Obrigatórios

**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph

---

## 🚀 Guia Rápido: Como Rodar o Sistema Localmente

### Pré-requisitos
- Node.js
- Python 3.10+
- MongoDB rodando localmente (`localhost:27017`)
- VSCode

---

## 1. Backend (FastAPI)

### Instalação e Execução

Abra o terminal, navegue até a pasta do projeto e execute:

```powershell
cd backend
python -m venv venv
.\venvin\Activate  # ou .\venv\Scripts\Activate no Windows
pip install -r requirements.txt
```

Crie o arquivo `backend/.env` com:
```env
MONGO_URL="mongodb://localhost:27017/"
DB_NAME="techsolutions_treinamentos"
CORS_ORIGINS="http://localhost:3000"
JWT_SECRET="troque-por-um-segredo-seguro"
```

Para rodar o backend:
```powershell
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

API disponível em: [http://localhost:8001/docs](http://localhost:8001/docs)

---

## 2. Frontend (React)

Abra outro terminal e execute:

```powershell
cd frontend
npm install --legacy-peer-deps
```

Crie o arquivo `frontend/.env` com:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Para rodar o frontend:
```powershell
npm start
```

App disponível em: [http://localhost:3000](http://localhost:3000)

---

## 3. Criando Usuários (Admin e Aluno)

### Método Automático (Script)

Execute o script para criar área, cargo, perfis e dois usuários (admin e aluno):

```powershell
cd backend
python scripts_create_user.py
```

Usuários criados:
- **Admin:**
  - Email: joao@example.com
  - Senha: senha123
- **Aluno:**
  - Email: senai@senai.com
  - Senha: senai

### Método Manual (Swagger)

1. Acesse [http://localhost:8001/docs](http://localhost:8001/docs)
2. Crie área, cargo, perfil e colaborador usando os endpoints `/api/areas`, `/api/cargos`, `/api/perfis`, `/api/auth/register`.

---

## 4. Fluxo de Login

1. Acesse [http://localhost:3000](http://localhost:3000)
2. Faça login com um dos usuários criados
3. Admin tem acesso total, aluno tem acesso restrito

---

## 5. Troubleshooting

- **Backend não inicia:**
  - Verifique se o MongoDB está rodando
  - Confirme o arquivo `.env` do backend
  - Reinstale dependências: `pip install -r requirements.txt --force-reinstall`
- **Frontend não conecta:**
  - Backend deve estar rodando em `http://localhost:8001`
  - Confirme o `.env` do frontend
  - Reinicie o frontend
- **Erro de CORS:**
  - No backend/.env: `CORS_ORIGINS="http://localhost:3000"`
- **Criação de usuário falha:**
  - Verifique se área, cargo e perfil existem (IDs válidos)
  - Use o script para garantir criação correta

---

## 6. Estrutura do Projeto

```
ProjetoAplicado_2025.1/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── .env
│   └── scripts_create_user.py
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
└── README.md
```

---

## 7. Tecnologias

- **Backend:** FastAPI, Motor, Pydantic, JWT, Bcrypt
- **Frontend:** React, Tailwind, Shadcn UI, Axios
- **Banco:** MongoDB

---

## 8. Suporte

Se tiver problemas:
- Consulte os logs do backend e frontend
- Verifique a documentação da API em `/docs`
- Revise o troubleshooting acima

---

**Desenvolvido com FastAPI + React + MongoDB** 🚀
