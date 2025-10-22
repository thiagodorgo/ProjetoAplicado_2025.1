# 🧪 Teste de Conexão

## Verifique se Tudo Está Funcionando

### 1. Teste o MongoDB

```bash
# No terminal, execute:
mongosh mongodb://root:root@localhost:3305

# Se conectou com sucesso, você verá:
# Connected to MongoDB
# Digite: exit
```

### 2. Teste o Backend

**Inicie o backend:**
```bash
cd backend
venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Abra outro terminal e teste:**
```bash
curl http://localhost:8001/api/
```

**Resposta esperada:**
```json
{"message":"Sistema de Gerenciamento de Cursos Obrigatórios - API v1.0"}
```

### 3. Teste a Documentação da API

Abra no navegador: `http://localhost:8001/docs`

Você deve ver a interface Swagger UI com todos os endpoints.

### 4. Teste o Frontend

**Inicie o frontend:**
```bash
cd frontend
npm start
```

**No navegador:**
Abra `http://localhost:3000`

Você deve ver a tela de login do FieldLearn Hub.

---

## ✅ Checklist de Funcionamento

- [ ] MongoDB conectando na porta 3305
- [ ] Backend respondendo em `http://localhost:8001`
- [ ] Swagger UI acessível em `http://localhost:8001/docs`
- [ ] Frontend carregando em `http://localhost:3000`
- [ ] Tela de login aparecendo

---

## 🎯 Próximo Passo

Se todos os itens acima estão OK, siga para criar seu primeiro usuário:

1. Abra `http://localhost:8001/docs`
2. Siga as instruções no arquivo `INSTALACAO_RAPIDA.md`
3. Crie área, cargo, perfil e colaborador
4. Faça login no sistema!

---

## 🐛 Problemas Comuns

### Erro: "Could not connect to MongoDB"
- Verifique se o MongoDB está rodando
- Confirme user/senha: `root/root`
- Confirme porta: `3305`

### Erro: "Port 8001 already in use"
```bash
# Windows - mate o processo na porta 8001
netstat -ano | findstr :8001
taskkill /PID [número] /F
```

### Erro: Frontend não carrega
1. Limpe o cache: `npm cache clean --force`
2. Delete `node_modules` e reinstale: `npm install`
3. Verifique o `.env` do frontend

---

**Tudo funcionando? Comece a usar o sistema!** 🚀
