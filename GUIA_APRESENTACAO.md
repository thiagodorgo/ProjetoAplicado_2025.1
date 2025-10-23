# 🎯 Guia de Apresentação do Projeto

**TechSolutions - Sistema de Treinamentos Obrigatórios NR-31**  
**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph

---

## 📋 SUMÁRIO DA APRESENTAÇÃO

**Tempo Total:** 15-20 minutos

1. **Introdução e Problema** (3 min) - Thiago
2. **Solução e Tecnologias** (4 min) - Fabricio
3. **Arquitetura e Banco de Dados** (4 min) - Pettrin
4. **Demonstração Prática** (5 min) - Joseph
5. **Conclusão e Perguntas** (3 min) - Thiago

---

## 👨‍💼 1. INTRODUÇÃO E PROBLEMA (Thiago - 3 min)

### 🎯 Objetivo da Fala:
Apresentar o problema e contextualizar a necessidade do sistema

### 🗣️ Roteiro de Fala:

**Abertura:**
> "Bom dia/tarde. Somos o Grupo 7 do Projeto Aplicado 2 e desenvolvemos o **TechSolutions**, um sistema de gerenciamento de treinamentos obrigatórios para trabalhadores rurais."

**Contextualização do Problema:**
> "O trabalho rural é uma das atividades com **maior índice de acidentes** no Brasil. Segundo dados do Ministério do Trabalho, em 2023 foram registrados mais de **15 mil acidentes** no setor agropecuário."

> "A **NR-31** (Norma Regulamentadora 31) estabelece treinamentos obrigatórios para trabalhadores rurais, incluindo:
> - Segurança no manuseio de agrotóxicos
> - Operação segura de máquinas agrícolas
> - Primeiros socorros
> - Prevenção de acidentes"

**Desafios Identificados:**
> "Identificamos **4 principais desafios** nas empresas rurais:
>
> 1. **Dificuldade de controle** - Falta de sistema centralizado
> 2. **Certificados vencidos** - Sem alertas automáticos
> 3. **Falta de evidencias** - Comprovação de treinamentos
> 4. **Conformidade legal** - Dificuldade em comprovar conformidade com NR-31"

**Transição:**
> "Para resolver esses problemas, desenvolvemos o TechSolutions. Agora vou passar a palavra ao **Fabricio**, que vai apresentar nossa solução e as tecnologias utilizadas."

### 📊 Recursos Visuais:
- Slide com estatísticas de acidentes rurais
- Gráfico mostrando principais causas de acidentes
- Imagem ilustrativa de trabalhador rural
- Lista dos 4 desafios destacados

---

## 🛠️ 2. SOLUÇÃO E TECNOLOGIAS (Fabricio - 4 min)

### 🎯 Objetivo da Fala:
Apresentar a solução proposta e justificar escolhas tecnológicas

### 🗣️ Roteiro de Fala:

**Apresentação da Solução:**
> "Obrigado, Thiago. O **TechSolutions** é um sistema web completo que resolve todos os desafios apresentados."

**Funcionalidades Principais:**
> "Nosso sistema oferece:
>
> ✅ **Gestão de Treinamentos** - Cadastro completo com modalidades presencial e online
> ✅ **Controle de Inscrições** - Manual, auto-inscrição ou automática por cargo
> ✅ **Acompanhamento de Progresso** - Dashboard em tempo real
> ✅ **Certificados Digitais** - Emissão automática com validade configurável
> ✅ **Alertas de Vencimento** - Notificações antes do certificado vencer
> ✅ **Evidências de Participação** - QR Code, assinatura digital, lista de presença
> ✅ **Auditoria Completa** - Log de todas as ações do sistema"

**Stack Tecnológica:**
> "Para desenvolver o TechSolutions, utilizamos uma **stack moderna e robusta**:
>
> **Backend:**
> - **FastAPI** (Python) - Framework web moderno, rápido e com documentação automática
> - **Motor** - Driver MongoDB assíncrono para alta performance
> - **Pydantic** - Validação de dados em tempo real
> - **JWT + Bcrypt** - Autenticação segura com tokens e senhas hasheadas
>
> **Frontend:**
> - **React 19** - Biblioteca UI mais popular do mercado
> - **Tailwind CSS** - Framework CSS utility-first para design moderno
> - **Shadcn UI** - Componentes acessíveis e customizáveis
> - **Axios** - Cliente HTTP para comunicação com backend
>
> **Banco de Dados:**
> - **MongoDB** - Banco NoSQL flexível, ideal para estruturas complexas"

**Justificativa das Escolhas:**
> "Escolhemos essa stack porque:
> 1. **FastAPI** é até **3x mais rápido** que Flask
> 2. **MongoDB** permite estruturas flexíveis sem migrações complexas
> 3. **React** facilita criação de interfaces interativas e responsivas
> 4. Todas são tecnologias **amplamente adotadas no mercado**"

**Transição:**
> "Agora vou passar para o **Pettrin**, que vai explicar a arquitetura do sistema e o modelo de banco de dados."

### 📊 Recursos Visuais:
- Diagrama de funcionalidades (com ícones)
- Logos das tecnologias utilizadas
- Gráfico comparativo de performance FastAPI vs outros frameworks
- Screenshot da interface do sistema

---

## 🏛️ 3. ARQUITETURA E BANCO DE DADOS (Pettrin - 4 min)

### 🎯 Objetivo da Fala:
Explicar arquitetura do sistema e estrutura do banco de dados

### 🗣️ Roteiro de Fala:

**Arquitetura do Sistema:**
> "Obrigado, Fabricio. Vou explicar como estruturamos nosso sistema."

> "Utilizamos uma **arquitetura em 3 camadas**:
>
> **1. Camada de Apresentação (Frontend)**
> - Interface React rodando na porta 3000
> - Comunicação via API REST
> - Design responsivo para desktop, tablet e mobile
>
> **2. Camada de Aplicação (Backend)**
> - FastAPI rodando na porta 8001
> - +80 endpoints RESTful
> - Autenticação JWT em todas as rotas protegidas
> - Documentação automática via Swagger
>
> **3. Camada de Dados (MongoDB)**
> - 15 collections organizadas
> - IDs sequenciais para facilitar referências
> - Índices para otimização de consultas"

**Modelo Entidade-Relacionamento:**
> "Nosso banco de dados segue o **MER fornecido no projeto**, com **14 entidades principais**:
>
> **Entidades Organizacionais:**
> - **Colaborador** - Trabalhadores rurais (com CPF, cargo, área)
> - **Área** - Setores da empresa (campo, administrativa, etc)
> - **Cargo** - Funções (operador de máquinas, supervisor, etc)
> - **Perfil** - Níveis de acesso (admin, gestor, colaborador)
>
> **Entidades de Treinamento:**
> - **Curso** - Treinamentos com modalidade e tipo NR-31
> - **Trilha** - Sequências de cursos organizados
> - **Curso_Trilha** - Relação com ordem e pré-requisitos
> - **Tag** - Categorização de cursos
>
> **Entidades de Controle:**
> - **Regra_Obrigatória** - Define treinamentos obrigatórios por cargo/área
> - **Inscrição** - Registra inscrições dos colaboradores
> - **Progresso** - Acompanha avanço percentual
> - **Evidência** - Comprovações de participação
> - **Certificado** - Certificados digitais com validade
> - **Auditoria** - Log completo de ações"

**Relacionamentos Principais:**
> "Os **relacionamentos críticos** são:
> - Colaborador **pertence a** Cargo e Área
> - Curso **pode ser** obrigatório para Cargo/Área
> - Inscrição **gera automaticamente** Progresso
> - Progresso **concluído** permite emitir Certificado
> - Certificado **tem validade** definida pela Regra Obrigatória"

**Segurança:**
> "Implementamos **múltiplas camadas de segurança**:
> - Senhas com **hash bcrypt** (irreversível)
> - **JWT tokens** com expiração de 24h
> - Todas rotas protegidas com **middleware de autenticação**
> - **Auditoria completa** de todas operações sensíveis
> - **CORS** configurado para aceitar apenas origens confiáveis"

**Transição:**
> "Agora que entendemos a arquitetura, vou passar para o **Joseph**, que fará uma **demonstração ao vivo** do sistema funcionando."

### 📊 Recursos Visuais:
- Diagrama de arquitetura em 3 camadas
- MER completo (diagrama entidade-relacionamento)
- Fluxo de autenticação JWT
- Screenshot da documentação Swagger

---

## 🖥️ 4. DEMONSTRAÇÃO PRÁTICA (Joseph - 5 min)

### 🎯 Objetivo da Fala:
Mostrar o sistema funcionando na prática

### 🗣️ Roteiro de Fala:

**Introdução:**
> "Obrigado, Pettrin. Agora vou mostrar o **TechSolutions em ação**. Vou fazer uma demonstração completa do fluxo principal do sistema."

**1. Login e Dashboard (30 seg)**
> "Primeiro, fazemos login no sistema. [DIGITAR CREDENCIAIS]"
> "Após autenticados, chegamos ao **Dashboard** que mostra:
> - Total de cursos cadastrados
> - Número de colaboradores ativos
> - Inscrições concluídas
> - Certificados próximos do vencimento
> - Ações rápidas para gestão"

**2. Cadastro de Curso (1 min)**
> "Vou criar um **novo treinamento NR-31**. [CLICAR EM 'CURSOS']"
> "Aqui cadastramos:
> - **Título**: 'Operação Segura de Tratores'
> - **Tipo**: NR-31
> - **Modalidade**: Presencial
> - **Carga horária**: 8 horas
> - **Público-alvo**: Operadores de máquinas
> - **Permite auto-inscrição**: Sim"
> [CRIAR CURSO]

**3. Configuração de Regra Obrigatória (1 min)**
> "Agora vou tornar este curso **obrigatório** para o cargo de Operador. [IR PARA 'REGRAS']"
> "Definimos:
> - **Curso**: Operação Segura de Tratores
> - **Cargo**: Operador de Máquinas
> - **Validade**: 12 meses
> - **Alerta**: 30 dias antes do vencimento"
> [CRIAR REGRA]

**4. Inscrição e Progresso (1 min)**
> "Vou inscrever um colaborador neste curso. [IR PARA 'INSCRIÇÕES']"
> [CRIAR INSCRIÇÃO]
> "Observe que o sistema **automaticamente criou** um registro de progresso."
> "Podemos atualizar o progresso conforme o colaborador avança no treinamento."
> [MOSTRAR PROGRESSO]

**5. Emissão de Certificado (1 min)**
> "Quando o treinamento é concluído, emitimos o **certificado digital**. [IR PARA 'CERTIFICADOS']"
> [EMITIR CERTIFICADO]
> "O certificado contém:
> - Nome do colaborador
> - Nome do curso
> - Data de emissão
> - Data de validade (12 meses)
> - Código de verificação único"

**6. Documentação API (30 seg)**
> "Por fim, nosso sistema possui **documentação automática** via Swagger."
> [ABRIR http://localhost:8001/docs]
> "Aqui temos:
> - Todos os **+80 endpoints** documentados
> - Possibilidade de **testar** cada endpoint
> - Exemplos de **request e response**
> - Esquemas de dados completos"

**Conclusão da Demo:**
> "Como vimos, o sistema é **intuitivo, completo e funcional**. Agora vou passar de volta para o **Thiago** para as considerações finais."

### 📊 Recursos Visuais:
- **Sistema rodando ao vivo**
- Preparar dados de exemplo antes
- Ter screenshots de backup caso dê erro

---

## 🎯 5. CONCLUSÃO E PERGUNTAS (Thiago - 3 min)

### 🎯 Objetivo da Fala:
Recapitular, destacar diferenciais e abrir para perguntas

### 🗣️ Roteiro de Fala:

**Recapitulação:**
> "Obrigado, Joseph. Para recapitular, o **TechSolutions**:
>
> ✅ Resolve o problema de **controle de treinamentos** obrigatórios
> ✅ Garante **conformidade com NR-31**
> ✅ Reduz **acidentes de trabalho** rural
> ✅ Automatiza **emissão de certificados**
> ✅ Fornece **auditoria completa** para fiscalizações"

**Diferenciais do Projeto:**
> "Nossos **principais diferenciais** são:
>
> 1. **Foco específico em NR-31** - Não é um sistema genérico
> 2. **Alertas de vencimento** - Evita certificados vencidos
> 3. **Evidências digitais** - Comprovação de treinamentos
> 4. **Regras flexíveis** - Configurável por cargo e área
> 5. **Interface moderna** - Fácil de usar até para quem tem pouca experiência
> 6. **Documentação completa** - API totalmente documentada"

**Possibilidades de Expansão:**
> "O sistema pode ser facilmente expandido para:
> - Integração com sistemas de RH
> - Aplicativo mobile para colaboradores
> - Relatórios avançados e analíticos
> - Integração com plataformas de EAD
> - Assinatura eletrônica via ICP-Brasil"

**Resultados Esperados:**
> "Com a implantação do TechSolutions, esperamos:
> - **Redução de 40%** nos acidentes de trabalho
> - **100% de conformidade** com NR-31
> - **Redução de custos** com multas e processos
> - **Melhoria na produtividade** com colaboradores capacitados"

**Fechamento:**
> "Esse foi o **TechSolutions**, desenvolvido pelo **Grupo 7**: Thiago, Fabricio, Pettrin e Joseph.
> Agora estamos disponíveis para **perguntas**."

### 📊 Recursos Visuais:
- Slide de recapitulação
- Gráfico com resultados esperados
- Slide final com contatos da equipe

---

## ❓ POSSÍVEIS PERGUNTAS E RESPOSTAS

### Pergunta 1: "Como garantem a segurança dos dados?"
**Resposta (Pettrin):**
> "Implementamos múltiplas camadas de segurança:
> - Senhas com hash bcrypt irreversível
> - Tokens JWT com expiração
> - HTTPS em produção
> - Auditoria de todas ações
> - Backup automático do MongoDB
> - Conforme LGPD, armazenamos apenas dados necessários"

### Pergunta 2: "O sistema funciona offline?"
**Resposta (Fabricio):**
> "Atualmente o sistema é online. Porém, podemos implementar:
> - PWA (Progressive Web App) para cache local
> - Sincronização automática quando voltar online
> - App mobile com modo offline"

### Pergunta 3: "Quanto tempo levou para desenvolver?"
**Resposta (Thiago):**
> "O desenvolvimento completo levou aproximadamente [X semanas/meses]:
> - Planejamento e levantamento: 1 semana
> - Desenvolvimento backend: 2 semanas
> - Desenvolvimento frontend: 2 semanas
> - Integração e testes: 1 semana
> - Documentação: Durante todo processo"

### Pergunta 4: "Quanto custaria implementar em uma empresa?"
**Resposta (Joseph):**
> "O sistema é open-source e pode ser hospedado internamente:
> - **Infraestrutura:** R$ 500-1000/mês (servidor cloud)
> - **Customização:** Depende das necessidades específicas
> - **Treinamento:** 1-2 dias para equipe
> - Comparado com multas NR-31 (R$ 6.000 - R$ 600.000), o ROI é rápido"

### Pergunta 5: "Pode integrar com outros sistemas?"
**Resposta (Fabricio):**
> "Sim! Nossa API REST permite integração com:
> - Sistemas de RH (importar colaboradores)
> - Plataformas EAD (lançar notas automaticamente)
> - Sistemas de ponto (validar presença)
> - Qualquer sistema via nossa API documentada"

---

## 📝 CHECKLIST DE PREPARAÇÃO

### 1 Semana Antes:
- [ ] Definir quem apresenta cada parte
- [ ] Criar slides da apresentação
- [ ] Preparar ambiente de demonstração
- [ ] Inserir dados de exemplo no banco
- [ ] Testar sistema completo

### 1 Dia Antes:
- [ ] Ensaiar apresentação completa
- [ ] Cronometrar cada parte
- [ ] Testar equipamentos (projetor, notebook)
- [ ] Ter backup dos slides em PDF
- [ ] Screenshots de todas as telas

### No Dia:
- [ ] Chegar 15 minutos antes
- [ ] Testar conexão e projeção
- [ ] Iniciar backend e frontend
- [ ] Abrir todas as abas necessárias
- [ ] Ter água disponível

---

## 🎯 DICAS FINAIS

### Para Todos:
1. **Postura:** Mantenha contato visual com a audiência
2. **Clareza:** Fale devagar e articule bem
3. **Entusiasmo:** Mostre empolgamento com o projeto
4. **Tempo:** Respeite o tempo de cada parte
5. **Transições:** Passe a palavra de forma natural

### Para a Demonstração:
1. Testar tudo antes pelo menos 3 vezes
2. Ter screenshots como backup
3. Zoom no navegador para visão melhor
4. Explicar o que está fazendo enquanto faz
5. Se der erro, manter a calma e usar o backup

---

**BOA SORTE NA APRESENTAÇÃO! 🎉**

**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph
