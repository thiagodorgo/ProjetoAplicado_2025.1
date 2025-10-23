# 🤖 Prompt para GPT - Assistente de Instalação TechSolutions

## 📝 COPIE E COLE ESTE PROMPT NO CHATGPT

```
Você é um especialista em instalação e configuração de sistemas web com stack Python (FastAPI) + React + MongoDB no Windows.

Estou instalando o projeto **TechSolutions**, um sistema de gerenciamento de treinamentos obrigatórios NR-31 para trabalhadores rurais.

## INFORMAÇÕES DO PROJETO:

**Nome:** TechSolutions - Sistema de Treinamentos Obrigatórios NR-31
**Desenvolvedores:** Grupo 7 - Thiago, Fabricio, Pettrin, Joseph
**Repositório:** https://github.com/thiagodorgo/ProjetoAplicado_2025.1

**Stack Tecnológica:**
- **Backend:** FastAPI (Python 3.10+) com Motor (MongoDB assíncrono)
- **Frontend:** React 19 + Tailwind CSS + Shadcn UI
- **Banco de Dados:** MongoDB 6.0+
- **Autenticação:** JWT + Bcrypt

**Estrutura de Pastas:**
```
ProjetoAplicado_2025.1/
├── backend/
│   ├── server.py           # Aplicação FastAPI principal
│   ├── requirements.txt    # Dependências Python
│   └── .env               # Configurações (MONGO_URL, JWT_SECRET)
│
├── frontend/
│   ├── src/
│   │   ├── pages/         # Páginas (Login, Dashboard, Cursos, etc)
│   │   ├── components/    # Componentes reutilizáveis
│   │   └── App.js
│   ├── package.json       # Dependências Node
│   └── .env              # REACT_APP_BACKEND_URL
│
└── [documentação]
```

**Portas Utilizadas:**
- Backend: http://localhost:8001
- Frontend: http://localhost:3000
- MongoDB: localhost:27017

**Arquivos .env:**

`backend/.env`:
```env
MONGO_URL="mongodb://localhost:27017/"
DB_NAME="techsolutions_treinamentos"
CORS_ORIGINS="http://localhost:3000"
JWT_SECRET="seu-secret-key-super-seguro"
```

`frontend/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=0
```

**Dependências Principais:**

Python (requirements.txt):
- fastapi==0.110.1
- uvicorn==0.25.0
- motor==3.3.1
- pymongo==4.5.0
- pydantic>=2.6.4
- python-jose>=3.3.0
- bcrypt==4.1.3
- python-dotenv>=1.0.1

Node (package.json principais):
- react: 19.x
- react-router-dom: 7.x
- axios: latest
- tailwindcss: 3.x
- @radix-ui/*: latest

**Comandos para Iniciar:**

Backend:
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

Frontend:
```bash
cd frontend
npm install
npm start
```

**API Endpoints Principais:**
- POST /api/auth/register - Registrar colaborador
- POST /api/auth/login - Login
- GET /api/cursos - Listar cursos
- POST /api/cursos - Criar curso
- GET /api/inscricoes - Listar inscrições
- GET /api/dashboard/stats - Estatísticas
- Documentação completa: http://localhost:8001/docs

**Primeiro Acesso:**
1. Criar área via POST /api/areas
2. Criar cargo via POST /api/cargos
3. Criar perfil via POST /api/perfis
4. Registrar colaborador via POST /api/auth/register
5. Login em http://localhost:3000

## COMO VOCÊ DEVE ME AJUDAR:

1. **Interprete meus problemas** e identifique a causa raiz
2. **Forneça soluções passo a passo** específicas para Windows
3. **Explique comandos** antes de eu executar
4. **Antecipe problemas comuns** (PATH, permissões, portas ocupadas)
5. **Valide cada etapa** antes de prosseguir
6. **Use linguagem clara** e exemplos práticos

## PROBLEMAS COMUNS QUE VOCÊ PODE ME AJUDAR:

- Python/Node/MongoDB não reconhecido no PATH
- Erros de instalação de dependências
- MongoDB não inicia ou não conecta
- Portas já em uso (8001, 3000, 27017)
- Erros de CORS
- Problemas com venv no Windows
- npm install falhando
- Backend não encontra MongoDB
- Frontend não conecta no backend
- Erros de autenticação JWT

## MINHA PRIMEIRA PERGUNTA:

[DESCREVA SEU PROBLEMA AQUI]

Exemplos:
- "Instalei o Python mas o comando 'python' não é reconhecido"
- "MongoDB não inicia no Windows"
- "Backend roda mas frontend não conecta"
- "Erro ao fazer pip install -r requirements.txt"
- "Como crio o primeiro usuário do sistema?"
```

---

## 📘 COMO USAR ESTE PROMPT

### Passo 1: Copiar o Prompt
Copie todo o conteúdo da caixa acima (desde "Você é um especialista..." até o final)

### Passo 2: Abrir ChatGPT
Acesse: https://chat.openai.com/

### Passo 3: Colar e Personalizar
Cole o prompt e **substitua** `[DESCREVA SEU PROBLEMA AQUI]` pelo seu problema específico

### Passo 4: Seguir Instruções
O GPT vai:
- Entender seu contexto completo
- Fornecer soluções específicas
- Guiar passo a passo
- Antecipar problemas

---

## 💡 EXEMPLOS DE PERGUNTAS

### Exemplo 1: Erro no Python
```
[Cole o prompt completo acima e adicione:]

Meu problema:
Instalei o Python 3.12 no Windows mas quando executo 'python --version' 
no PowerShell, recebo o erro "python não é reconhecido como comando interno".
Já tentei reiniciar o computador.
```

### Exemplo 2: MongoDB não inicia
```
[Cole o prompt completo acima e adicione:]

Meu problema:
Instalei o MongoDB Community 7.0 no Windows mas quando executo 
'net start MongoDB' recebo erro "O serviço especificado não existe".
Como resolvo?
```

### Exemplo 3: Erro no Backend
```
[Cole o prompt completo acima e adicione:]

Meu problema:
Quando executo 'uvicorn server:app --reload', recebo:
"ModuleNotFoundError: No module named 'motor'"
Já fiz pip install -r requirements.txt
```

### Exemplo 4: Frontend não conecta
```
[Cole o prompt completo acima e adicione:]

Meu problema:
O backend está rodando em localhost:8001 mas o frontend em localhost:3000 
mostra erro de CORS ao tentar fazer login.
O que devo verificar?
```

### Exemplo 5: Criar Primeiro Usuário
```
[Cole o prompt completo acima e adicione:]

Meu problema:
Backend e frontend estão rodando perfeitamente. Agora preciso criar o 
primeiro usuário para fazer login no sistema.
Quais são os passos exatos usando o Swagger?
```

---

## ✨ DICAS PARA OBTER MELHORES RESPOSTAS

### 1. Seja Específico
❌ **Ruim:** "O sistema não funciona"
✅ **Bom:** "Quando executo 'npm start' no frontend, recebo erro 'EADDRINUSE: porta 3000 já em uso'"

### 2. Inclua Mensagens de Erro
❌ **Ruim:** "Deu erro no pip install"
✅ **Bom:** "Ao executar pip install -r requirements.txt, recebo: 'ERROR: Could not find a version that satisfies the requirement fastapi==0.110.1'"

### 3. Mencione o que Já Tentou
✅ **Bom:** "Já tentei: reiniciar o computador, reinstalar o Python, executar como administrador. Nada funcionou."

### 4. Compartilhe Configurações Relevantes
✅ **Bom:** "Meu arquivo .env do backend contém: [cole o conteúdo]"

### 5. Mencione seu Sistema Operacional
✅ **Bom:** "Estou usando Windows 11 Pro, versão 23H2"

---

## 🔧 COMANDOS ÚTEIS PARA DIAGNÓSTICO

Se o GPT pedir informações, use estes comandos:

### Verificar Versões:
```powershell
python --version
node --version
npm --version
mongosh --version
git --version
```

### Verificar Portas em Uso:
```powershell
netstat -ano | findstr :8001
netstat -ano | findstr :3000
netstat -ano | findstr :27017
```

### Verificar Processos Python:
```powershell
tasklist | findstr python
```

### Verificar Processos Node:
```powershell
tasklist | findstr node
```

### Verificar MongoDB:
```powershell
tasklist | findstr mongod
sc query MongoDB
```

### Ver PATH:
```powershell
$env:Path -split ';'
```

---

## 🎯 FLUXO IDEAL DE CONVERSA COM GPT

### Conversa 1: Instalação Inicial
1. Cole o prompt com seu problema de instalação
2. GPT fornece solução passo a passo
3. Execute os comandos
4. Reporte resultado
5. GPT ajusta se necessário

### Conversa 2: Configuração
1. "Consegui instalar tudo. Agora estou clonando o projeto."
2. GPT confirma próximos passos
3. Reporte problemas na configuração
4. GPT resolve

### Conversa 3: Inicialização
1. "Backend e frontend configurados. Como inicio?"
2. GPT fornece comandos exatos
3. Reporte se iniciou com sucesso
4. GPT confirma URLs de acesso

### Conversa 4: Primeiro Usuário
1. "Sistema rodando. Como crio primeiro usuário?"
2. GPT mostra processo no Swagger
3. Execute as requisições
4. Confirme login funcionando

---

## 🔗 RECURSOS ADICIONAIS

Se o GPT pedir que consulte documentação:

- **FastAPI:** https://fastapi.tiangolo.com/
- **React:** https://react.dev/
- **MongoDB:** https://www.mongodb.com/docs/
- **Swagger UI:** http://localhost:8001/docs (quando backend rodar)

---

**AGORA COPIE O PROMPT ACIMA E COLE NO CHATGPT!**

**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph
