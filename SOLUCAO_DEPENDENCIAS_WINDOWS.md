# 🔧 Solução de Problemas - Dependências Frontend (Windows)

## 🚨 Problema Reportado

Após executar `npm audit fix --force`, o pacote `react-scripts` foi corrompido para versão `0.0.0`, causando o erro:

```
Error: Cannot find module 'react-scripts\config\env.js'
```

---

## ✅ Solução Completa

### Passo 1: Limpar Completamente o Ambiente

Abra o terminal no diretório `frontend` e execute:

```bash
# Remover node_modules e arquivos de lock
rmdir /s /q node_modules
del package-lock.json
del yarn.lock
```

### Passo 2: Verificar Versão do Node.js

```bash
node --version
```

**Importante:** Este projeto requer **Node.js v18.x ou superior**. Se você estiver usando uma versão diferente, considere usar [nvm-windows](https://github.com/coreybutler/nvm-windows) para gerenciar versões do Node.

### Passo 3: Instalar Dependências Corretamente

**Opção A - Usando Yarn (Recomendado):**

```bash
# Instalar Yarn globalmente se não tiver
npm install -g yarn

# Instalar dependências
yarn install
```

**Opção B - Usando NPM:**

```bash
npm install --legacy-peer-deps
```

### Passo 4: Iniciar o Frontend

```bash
# Com Yarn
yarn start

# Com NPM
npm start
```

---

## 📦 Versões das Dependências Principais

O `package.json` foi atualizado com versões compatíveis:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.28.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@craco/craco": "^7.1.0"
  }
}
```

### Por que essas versões?

- **React 18.2.0**: Versão estável e amplamente testada
- **React Router Dom 6.28.0**: Compatível com Node.js v18 (v7 requer Node.js v20+)
- **React Scripts 5.0.1**: Versão estável do Create React App
- **Craco 7.1.0**: Compatível com React Scripts 5.x

---

## ⚠️ Comandos a EVITAR

**NUNCA execute estes comandos:**

```bash
# ❌ Este comando pode corromper dependências
npm audit fix --force

# ❌ Pode causar incompatibilidades
npm update
```

Se precisar corrigir vulnerabilidades de segurança, analise cada uma individualmente antes de aplicar correções.

---

## 🔍 Verificação de Problemas Comuns

### Erro: "Cannot find module"

**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rmdir /s /q node_modules
yarn install
```

### Erro: "Port 3000 is already in use"

**Solução:**
```bash
# Descobrir qual processo está usando a porta
netstat -ano | findstr :3000

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

### Erro de compilação com CRACO

**Solução:**
Verifique se o arquivo `craco.config.js` está presente no diretório `frontend`:

```javascript
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```

---

## 📞 Precisa de Mais Ajuda?

Se após seguir todos os passos o problema persistir:

1. Verifique se o MongoDB está rodando em `localhost:27017`
2. Verifique se o backend está rodando em `localhost:8001`
3. Verifique as variáveis de ambiente no arquivo `frontend/.env`
4. Tente reiniciar o computador (às vezes processos ficam travados)

---

## 🎯 Checklist de Instalação Limpa

- [ ] Node.js v18 ou superior instalado
- [ ] MongoDB rodando (sem autenticação)
- [ ] Backend rodando e acessível em `http://localhost:8001/docs`
- [ ] Diretório `frontend/node_modules` limpo
- [ ] Dependências instaladas com `yarn install`
- [ ] Frontend iniciado com `yarn start`
- [ ] Aplicação acessível em `http://localhost:3000`

---

**Desenvolvido por:** Projeto Aplicado 2 / Grupo 7 / Thiago / Fabricio / Pettrin / Joseph
