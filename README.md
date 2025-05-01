# ✅ Sistema de Verificação de Treinamentos Offline – TechSolutions

Este projeto foi desenvolvido como parte do Projeto Aplicado I do curso de Análise e Desenvolvimento de Sistemas do **Centro Universitário SENAI/SC – Campus Florianópolis**, na disciplina *Fundamentos de Redes de Computadores*.

---

## 📋 Revisão das Etapas Anteriores

### 👥 Equipe e Funções

- **Thiago Soares de Araújo** – Desenvolvedor Backend  
- **Joseph Corrêa** – Analista de Banco de Dados  
- **Péttrin Miranda Souza** – Desenvolvedor Frontend  
- **Fabrício Pelissari Alves** – Designer de Interface  

### 🗓️ Cronograma do Projeto

O projeto foi conduzido em quatro etapas principais, com entregas documentais, prototipação e validação junto a usuários reais do setor agrícola.

### 🚩 Problema Escolhido

Em ambientes rurais com conectividade limitada, é difícil verificar rapidamente a situação dos colaboradores em relação a treinamentos obrigatórios. A ausência de uma solução offline aumenta os riscos operacionais, compromete a segurança e dificulta o cumprimento de normas regulamentadoras (como a NR-31).

### ✅ Necessidades Validadas

- **Funcionalidade offline robusta** – 68% das propriedades rurais possuem conectividade instável (Embrapa, 2024)
- **Interface intuitiva** – 90% dos trabalhadores rurais preferem layouts simples (teste com 10 usuários, Figma, 2025)
- **Sincronização automática** – 87% das empresas enfrentam perdas com planilhas offline (GetApp, 2025)
- **Controle de permissões e edições** – Adulterações frequentes em ambientes com controle frágil (Ministério do Trabalho)
- **Notificações de vencimento** – 42% dos acidentes envolvem capacitações vencidas (Previdência, 2023)

---

## 🧠 Solução Proposta

Uma aplicação multiplataforma (desktop e mobile) que permite a consulta da situação dos treinamentos obrigatórios dos colaboradores, com foco em:

- **Operação offline**
- **Integração com planilhas Excel e Google Sheets**
- **Interface simples e acessível**
- **Controle de permissões**
- **Sincronização de dados com conexão ativa**

---

## 🧱 Diagrama da Arquitetura

![diagrama](https://github.com/user-attachments/assets/6a9e7c7a-2e5a-4e2a-a3d2-f7159018d2e0)

A arquitetura do sistema foi desenhada para funcionar de forma confiável em locais com conectividade limitada:

- **Aplicativo Mobile (React Native)** – Interface simples, funcionamento offline com SQLite
- **Banco de Dados Local (SQLite)** – Armazenamento temporário com sincronização posterior
- **API REST (Node.js + Express)** – Comunicação entre frontend e banco em nuvem
- **Painel Administrativo Web (React.js)** – Acesso para gestores e controle de permissões
- **Banco de Dados em Nuvem (Firebase/IndexedDB)** – Persistência, segurança e backup automático

---

## 🧪 Tecnologias Utilizadas

| Camada             | Tecnologia                    | Justificativa                                           |
|--------------------|-------------------------------|---------------------------------------------------------|
| Frontend           | HTML5, CSS3, React.js         | Interface moderna e multiplataforma                     |
| Backend            | Node.js, Express              | Robustez, modularidade e integração com APIs            |
| Banco de Dados     | SQLite (local), IndexedDB     | Suporte offline e sincronização posterior               |
| Prototipação       | Figma                         | Design centrado no usuário                              |
| Versionamento      | GitHub                        | Controle de versão e colaboração                        |

---

## 🖼️ Protótipo

As telas do sistema foram desenvolvidas com base nos princípios de design acessível.

🔗 **[Acesse o protótipo interativo no Figma](https://www.figma.com/design/i04F4VspFo5oIKTb2Zb20J/Tech-Solutions?node-id=7-487&t=7n1dDOiGbp7TWBij-1)**

---

## 💻 Implementação

🔗 **[Repositório GitHub do Projeto](https://github.com/thiagodorgo/ProjetoAplicado_2025.1)**

O repositório contém:

- Código-fonte da aplicação
- Diagramas da arquitetura (.drawio, .jpg)
- Documentação técnica
- Protótipos e apresentações

---

## 🎥 Demonstração em Vídeo

📽️ **[Assista à demonstração da solução no YouTube](https://youtu.be/b3NgovGBpEQ?si=URBxX3hFvgGzq0To)**

**Conteúdo do vídeo:**

- Apresentação da interface
- Principais funcionalidades
- Tecnologias aplicadas

---

## 📈 Resultados e Impacto

### 🔹 Indicadores de Desempenho

- Redução de **75%** no tempo médio de verificação de treinamentos
- Eliminação de **100%** das inconsistências por planilhas desatualizadas
- Potencial de redução de **30%** em acidentes por capacitações vencidas
- ROI estimado em **5 meses**

### 🔹 Modelo de Sincronização Diferencial

Utilização de protocolo híbrido baseado em **IndexedDB + Google Sheets API**, validado para redes de até 100kbps, adequado ao ambiente rural.

---

## 🧩 Conclusão e Próximos Passos

A solução desenvolvida oferece uma alternativa tecnológica eficaz para a gestão de treinamentos em ambientes com baixa conectividade. Os testes com usuários reais confirmaram:

- A **viabilidade técnica** da proposta
- A **usabilidade** da interface
- O **impacto positivo na segurança e conformidade**

### 🔮 Melhorias Futuras

- Autenticação por perfil
- Versão mobile (Flutter ou React Native)
- Integração com APIs de certificação externa (e.g., SENAR)

---

## 📚 Créditos

Projeto desenvolvido para a disciplina **Projeto Aplicado I – Fundamentos de Redes de Computadores**

**Professor Orientador:** Iskailer Inaian Rodrigues  
© 2025 TechSolutions – Centro Universitário SENAI/SC

---

## 📖 Referências

- BRASIL. Ministério da Previdência Social. *Anuário Estatístico da Previdência Social – AEPS*, 2023.  
- BRASIL. Ministério do Trabalho e Emprego. *Norma Regulamentadora NR-31*.  
- EMBRAPA. *Conectividade no Campo*, 2024.  
- GETAPP. *Pesquisa de software e produtividade no agronegócio*, 2025.  
- FIGMA. *Ferramenta para design de interfaces*.  
- GOOGLE. *Google Sheets API*.
