# TechSolutions - Sistema de Treinamentos Obrigatórios NR-31

## 📋 Sobre o Projeto

**TechSolutions** é um sistema completo de gestão de treinamentos obrigatórios para trabalhadores rurais, desenvolvido com **FastAPI + React + MongoDB**, focado na conformidade com a **NR-31** (Norma Regulamentadora de Segurança e Saúde no Trabalho na Agricultura).

### 🎯 Objetivo

Reduzir acidentes no trabalho rural através da gestão eficiente de treinamentos obrigatórios, garantindo conformidade legal e segurança dos colaboradores em ambientes agrícolas.

### Funcionalidades Principais

✅ **Gerenciamento de Cursos**
- Cadastro completo de cursos com modalidades (presencial, online síncrono/assíncrono)
- Carga horária, público-alvo, instrutores
- Auto-inscrição configurável

✅ **Trilhas de Aprendizagem**
- Organização de cursos em trilhas estruturadas
- Ordenação e pré-requisitos
- Tags para categorização

✅ **Gestão de Colaboradores**
- Cadastro com áreas, cargos e perfis
- Hierarquia (gestores)
- Autenticação JWT

✅ **Treinamentos Obrigatórios**
- Configuração de regras por cargo/área
- Validade de certificados
- Renovação automática

✅ **Acompanhamento**
- Progresso detalhado dos colaboradores
- Evidências de participação
- Certificados digitais
- Auditoria completa

✅ **Dashboard e Relatórios**
- Estatísticas em tempo real
- Relatórios de progresso
- Alertas de vencimento

---

## 🚀 Como Rodar no Seu PC (Windows)

### Pré-requisitos

Você já tem instalado:
- ✅ Node.js
- ✅ VSCode
- ✅ MongoDB (localhost:3305)

### Passo 1: Clone ou Baixe o Projeto

```bash
# Clone o repositório:
git clone https://github.com/thiagodorgo/ProjetoAplicado_2025.1.git
cd ProjetoAplicado_2025.1

# Ou baixe e extraia o ZIP do projeto
```

### Passo 2: Configure o Backend

```bash
# Entre na pasta do backend
cd backend

# Crie um ambiente virtual Python (recomendado)
python -m venv venv

# Ative o ambiente virtual
venv\Scripts\activate

# Instale as dependências
pip install -r requirements.txt
```

**Configure o arquivo `.env` no backend:**

```env
# backend/.env
MONGO_URL="mongodb://localhost:27017/"
DB_NAME="techsolutions_treinamentos"
CORS_ORIGINS="http://localhost:3000"
JWT_SECRET="seu-secret-key-aqui-troque-em-producao"
```

**Inicie o backend:**

```bash
# Ainda na pasta backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

Backend rodando em: `http://localhost:8001`  
Documentação da API: `http://localhost:8001/docs`

### Passo 3: Configure o Frontend

Abra um **novo terminal** (deixe o backend rodando no outro):

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install
# ou
yarn install
```

**Configure o arquivo `.env` no frontend:**

```env
# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Inicie o frontend:**

```bash
# Ainda na pasta frontend
npm start
# ou
yarn start
```

Frontend rodando em: `http://localhost:3000`

### Passo 4: Acesse o Sistema

1. Abra seu navegador em `http://localhost:3000`
2. **Primeiro Acesso**: Você precisa criar um colaborador

---

## 🔧 Criando Primeiro Usuário

### Opção 1: Via API (Recomendado)

**Passo 1**: Acesse a documentação Swagger:

Abra `http://localhost:8001/docs` e execute na ordem:

**1. Crie uma Área:**
```json
POST /api/areas
{
  "nome": "Campo",
  "departamento": "Produção"
}
```

**2. Crie um Cargo:**
```json
POST /api/cargos
{
  "nome": "Trabalhador Rural",
  "requer_nr31": true
}
```

**3. Crie um Perfil:**
```json
POST /api/perfis
{
  "nome": "Administrador",
  "permissoes": ["admin"]
}
```

**Passo 2**: Registre um colaborador:

**4. Registre um Colaborador:**
```json
POST /api/auth/register
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "cpf": "123.456.789-00",
  "id_cargo": 1,
  "id_area": 1,
  "id_perfil": 1,
  "ativo": true
}
```

**Passo 3**: Faça login no sistema:
- Email: `joao@example.com`
- Senha: `senha123`

**Passo 3**: Faça login no sistema:

Acesse `http://localhost:3000` e entre com:
- Email: `joao@example.com`
- Senha: `senha123`

### Opção 2: Via MongoDB Shell

```javascript
// Conectar ao MongoDB
mongosh mongodb://localhost:27017/

// Usar o banco
use techsolutions_treinamentos

// Verificar conexão
show dbs
```

---

## 📁 Estrutura do Projeto

```
/app/
├── backend/
│   ├── server.py          # Aplicação FastAPI principal
│   ├── requirements.txt   # Dependências Python
│   └── .env              # Configurações do backend
│
├── frontend/
│   ├── src/
│   │   ├── App.js        # Componente principal
│   │   ├── App.css       # Estilos globais
│   │   ├── pages/        # Páginas da aplicação
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Cursos.jsx
│   │   │   ├── Trilhas.jsx
│   │   │   ├── Colaboradores.jsx
│   │   │   ├── MeusCursos.jsx
│   │   │   ├── RegrasObrigatorias.jsx
│   │   │   └── Relatorios.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── ui/       # Componentes Shadcn UI
│   │   └── index.js
│   ├── package.json      # Dependências Node
│   └── .env             # Configurações do frontend
│
└── README.md            # Este arquivo
```

---

## 🗄️ Estrutura do Banco de Dados (MongoDB)

O sistema utiliza as seguintes collections:

### Collections Principais

1. **colaboradores** - Usuários do sistema
2. **areas** - Áreas/departamentos
3. **cargos** - Cargos/funções
4. **perfis** - Perfis de acesso
5. **cursos** - Cursos disponíveis
6. **trilhas** - Trilhas de aprendizagem
7. **curso_trilhas** - Relação cursos-trilhas com ordem e pré-requisitos
8. **tags** - Tags para categorização
9. **regras_obrigatorias** - Regras de treinamento obrigatório
10. **inscricoes** - Inscrições dos colaboradores
11. **progressos** - Progresso dos colaboradores
12. **evidencias** - Evidências de participação
13. **certificados** - Certificados emitidos
14. **auditoria** - Log de auditoria
15. **counters** - Contadores para IDs sequenciais

---

## 🔐 Autenticação e Segurança

- **JWT Token**: Autenticação via tokens JWT
- **Bcrypt**: Senhas hasheadas com bcrypt
- **CORS**: Configurado para aceitar requisições do frontend
- **Auditoria**: Todas as ações críticas são registradas

---

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar colaborador
- `POST /api/auth/login` - Login

### Áreas
- `GET /api/areas` - Listar áreas
- `POST /api/areas` - Criar área
- `PUT /api/areas/{id}` - Atualizar área
- `DELETE /api/areas/{id}` - Deletar área

### Cargos
- `GET /api/cargos` - Listar cargos
- `POST /api/cargos` - Criar cargo
- `PUT /api/cargos/{id}` - Atualizar cargo
- `DELETE /api/cargos/{id}` - Deletar cargo

### Perfis
- `GET /api/perfis` - Listar perfis
- `POST /api/perfis` - Criar perfil
- `DELETE /api/perfis/{id}` - Deletar perfil

### Colaboradores
- `GET /api/colaboradores` - Listar colaboradores
- `GET /api/colaboradores/{id}` - Buscar colaborador
- `PUT /api/colaboradores/{id}` - Atualizar colaborador
- `DELETE /api/colaboradores/{id}` - Deletar colaborador

### Cursos
- `GET /api/cursos` - Listar cursos
- `POST /api/cursos` - Criar curso
- `GET /api/cursos/{id}` - Buscar curso
- `PUT /api/cursos/{id}` - Atualizar curso
- `DELETE /api/cursos/{id}` - Deletar curso

### Trilhas
- `GET /api/trilhas` - Listar trilhas
- `POST /api/trilhas` - Criar trilha
- `GET /api/trilhas/{id}` - Buscar trilha
- `PUT /api/trilhas/{id}` - Atualizar trilha
- `DELETE /api/trilhas/{id}` - Deletar trilha

### Curso-Trilhas
- `GET /api/curso-trilhas` - Listar cursos de trilhas
- `POST /api/curso-trilhas` - Adicionar curso à trilha
- `DELETE /api/curso-trilhas/{id}` - Remover curso da trilha

### Regras Obrigatórias
- `GET /api/regras-obrigatorias` - Listar regras
- `POST /api/regras-obrigatorias` - Criar regra
- `DELETE /api/regras-obrigatorias/{id}` - Deletar regra

### Inscrições
- `GET /api/inscricoes` - Listar inscrições
- `POST /api/inscricoes` - Criar inscrição
- `GET /api/inscricoes/{id}` - Buscar inscrição
- `PUT /api/inscricoes/{id}` - Atualizar inscrição

### Progresso
- `GET /api/progressos` - Listar progressos
- `PUT /api/progressos/{id}` - Atualizar progresso

### Evidências
- `GET /api/evidencias` - Listar evidências
- `POST /api/evidencias` - Criar evidência

### Certificados
- `GET /api/certificados` - Listar certificados
- `POST /api/certificados` - Emitir certificado

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas gerais
- `GET /api/reports/colaborador/{id}` - Relatório do colaborador

**Documentação Completa**: `http://localhost:8001/docs` (Swagger UI)

---

## 🎨 Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **MongoDB** - Banco de dados NoSQL
- **Motor** - Driver assíncrono para MongoDB
- **Pydantic** - Validação de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas

### Frontend
- **React 19** - Biblioteca UI
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Shadcn UI** - Componentes UI modernos
- **Radix UI** - Componentes acessíveis
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

---

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Verifique se o MongoDB está rodando
mongosh mongodb://root:root@localhost:3305

# Reinstale as dependências
pip install -r requirements.txt --force-reinstall
```

### Frontend não conecta ao backend

1. Verifique se o backend está rodando em `http://localhost:8001`
2. Confirme o arquivo `.env` do frontend:
   ```
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```
3. Reinicie o servidor frontend

### Erro de CORS

No arquivo `backend/.env`, configure:
```
CORS_ORIGINS="http://localhost:3000"
```

### MongoDB Connection Error

1. Verifique se o MongoDB está rodando na porta 3305
2. Confirme as credenciais no `.env` do backend
3. Teste a conexão:
   ```bash
   mongosh mongodb://root:root@localhost:3305
   ```

---

## 📝 Próximos Passos

Depois de rodar localmente, você pode:

1. ✅ Criar áreas, cargos e perfis
2. ✅ Cadastrar colaboradores
3. ✅ Criar cursos
4. ✅ Organizar trilhas de aprendizagem
5. ✅ Configurar regras obrigatórias
6. ✅ Inscrever colaboradores em cursos
7. ✅ Acompanhar progresso e emitir certificados

---

## 🤝 Suporte

Se encontrar problemas:

1. Verifique a seção **Troubleshooting** acima
2. Consulte os logs do backend e frontend
3. Revise a documentação da API em `/docs`

---

## 📄 Licença

Projeto desenvolvido para gerenciamento de cursos obrigatórios.

---

**Desenvolvido com FastAPI + React + MongoDB** 🚀
