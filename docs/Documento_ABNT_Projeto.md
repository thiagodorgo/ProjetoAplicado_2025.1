# PROJETO APLICADO 2 – DOCUMENTAÇÃO DO SOFTWARE

**Instituição:** SENAI  
**Curso:** Desenvolvimento de Sistemas  
**Projeto:** TechSolutions – Sistema de Treinamentos Obrigatórios  
**Equipe:** Grupo 7  
**Cidade/UF:** 
**Ano:** 2025

## 1. Mapeamento do cenário atual do problema e fluxo de trabalho a ser solucionado
No cenário atual, empresas com muitos colaboradores ainda controlam treinamentos obrigatórios por planilhas, e-mails e cobranças manuais dos gestores. Esse modelo dificulta a visão centralizada sobre quem já concluiu cada curso e quem está com pendência. Como consequência, há risco de não conformidade com normas internas, auditorias e exigências legais, além de perda de produtividade das lideranças. Também existe falha na rastreabilidade histórica de inscrições, aprovações e vencimentos de treinamentos críticos.

O fluxo proposto pelo software resolve esse problema com uma trilha digital completa. Primeiro, o administrador cadastra áreas, cargos, perfis e cursos obrigatórios. Em seguida, o colaborador é vinculado ao seu perfil e visualiza automaticamente os treinamentos exigidos para sua função. O sistema registra inscrição, andamento e conclusão, notificando pendências e permitindo acompanhamento contínuo por gestores. Por fim, relatórios consolidados disponibilizam indicadores de conformidade por colaborador, equipe e período, reduzindo riscos e padronizando o processo.

## 2. Usuários, partes interessadas e necessidades atendidas
### 2.1 Usuários e partes interessadas
- Administrador de treinamento (RH/T&D);
- Gestores de área e líderes de equipe;
- Colaboradores/alunos que realizam os cursos;
- Diretoria e auditoria interna/externa;
- Time de TI responsável pela sustentação do sistema.

### 2.2 Necessidades que o software deve atender
1. Centralizar, em um único ambiente, os treinamentos obrigatórios por cargo/perfil.
2. Permitir acompanhamento em tempo real das pendências de cada colaborador.
3. Garantir rastreabilidade de histórico (inscrição, conclusão, aprovação e status).
4. Emitir relatórios de conformidade para apoio à decisão e auditorias.
5. Reduzir retrabalho administrativo com automação do controle de obrigatoriedades.
6. Facilitar acesso do colaborador aos seus cursos e regras obrigatórias.

## 3. Encaixe da solução nos pilares da Indústria 4.0 e inovação
A solução se conecta aos pilares da Indústria 4.0 ao promover integração digital entre pessoas, processos e dados de capacitação corporativa. O uso de plataforma web com banco de dados centralizado permite tomada de decisão orientada por dados (data-driven), com relatórios de desempenho e conformidade. A automação do fluxo de treinamentos obrigatórios reduz atividades repetitivas e aumenta eficiência operacional. A disponibilidade remota do sistema favorece conectividade e colaboração entre unidades e áreas da organização.

Em termos de inovação, o diferencial está na combinação de gestão de obrigatoriedades por perfil/cargo com visão gerencial em tempo real e histórico auditável. Diferente de controles manuais, o software organiza o ciclo completo do treinamento em uma jornada única para administrador, gestor e colaborador. Com isso, a organização ganha previsibilidade, redução de riscos de não conformidade e melhor governança sobre desenvolvimento de competências críticas.

## 4. Requisitos do projeto
### 4.1 Requisitos funcionais (RF)
- **RF01:** Cadastrar e manter áreas, cargos e perfis organizacionais.
- **RF02:** Cadastrar cursos e definir quais são obrigatórios por perfil/cargo.
- **RF03:** Permitir autenticação de usuários com perfis de acesso (admin e colaborador).
- **RF04:** Exibir ao colaborador a lista de cursos obrigatórios, status e detalhes de cada curso.
- **RF05:** Registrar inscrições, andamento e conclusão dos treinamentos.
- **RF06:** Gerar relatórios de conformidade por colaborador, equipe e período.

### 4.2 Requisitos não funcionais (RNF)
- **RNF01:** O sistema deve possuir interface web responsiva e de fácil usabilidade.
- **RNF02:** O tempo médio de resposta das operações principais deve ser inferior a 3 segundos em condições normais.
- **RNF03:** As senhas devem ser armazenadas de forma criptografada e a autenticação deve usar token seguro.
- **RNF04:** O sistema deve manter disponibilidade mínima de 99% durante horário comercial.
- **RNF05:** O software deve registrar logs para auditoria e rastreabilidade de ações críticas.
- **RNF06:** A arquitetura deve permitir evolução modular entre frontend, backend e banco de dados.

## 5. Organização das tarefas e entregas com metodologia ágil
A abordagem adotada será **Scrum**, com Sprints quinzenais, backlog priorizado por valor de negócio e reuniões de planejamento, daily, review e retrospectiva. O Product Owner definirá prioridades com base em risco de não conformidade e impacto operacional. O time de desenvolvimento implementará funcionalidades em incrementos curtos e validáveis. Cada Sprint terá critérios de pronto (Definition of Done), incluindo desenvolvimento, testes básicos, documentação e validação com o orientador/cliente.

Quadro de tarefas por Sprint: backlog de produto → backlog da Sprint → execução (To Do, In Progress, Review, Done). Essa estrutura traz transparência do progresso e facilita ajustes contínuos de escopo conforme feedback das partes interessadas.

## 6. Funcionalidades disponíveis ao usuário final
1. **Login e controle de acesso:** entrada segura no sistema com permissões por perfil.
2. **Painel de cursos obrigatórios:** visualização rápida dos cursos pendentes, em andamento e concluídos.
3. **Detalhes do curso:** acesso a informações de carga horária, conteúdo e status.
4. **Gestão de inscrições:** solicitação e acompanhamento de inscrições em treinamentos.
5. **Relatórios e indicadores:** consulta de conformidade por usuário, equipe e período.
6. **Gestão administrativa:** cadastro de áreas, cargos, perfis, colaboradores e regras obrigatórias.

## 7. Prazos, entregáveis por Sprint e evolução futura
### Sprint 1 (Semanas 1 e 2)
- Levantamento de requisitos e modelagem inicial.
- Estrutura base do backend e banco de dados.
- Entregáveis: documento de requisitos, arquitetura inicial e API de autenticação.

### Sprint 2 (Semanas 3 e 4)
- Implementação de cadastros administrativos (áreas, cargos, perfis, cursos).
- Integração frontend-backend para operações de cadastro.
- Entregáveis: telas administrativas principais e endpoints funcionais.

### Sprint 3 (Semanas 5 e 6)
- Fluxo do colaborador (meus cursos, detalhes, inscrição, status).
- Regras de obrigatoriedade por perfil/cargo.
- Entregáveis: jornada do colaborador concluída e validação de regras obrigatórias.

### Sprint 4 (Semanas 7 e 8)
- Relatórios de conformidade e ajustes de usabilidade.
- Testes finais, correções e preparação para apresentação.
- Entregáveis: dashboard/relatórios, versão estável e documentação final.

### Sprints futuras
- Notificações automáticas por e-mail/app.
- Integração com RH/ERP para sincronização de colaboradores.
- Indicadores avançados com análise preditiva de risco de não conformidade.

## 8. Entregáveis de valor para o cliente
1. Redução do risco de não conformidade em auditorias de treinamentos obrigatórios.
2. Visibilidade gerencial em tempo real de pendências e conclusões.
3. Padronização do processo de capacitação corporativa entre áreas.
4. Redução de retrabalho operacional com automação de controles.
5. Histórico auditável para suporte a decisões e governança.
6. Base tecnológica escalável para novas integrações e módulos.

## 9. Critérios claros de aceitação (Product Backlog)
- **CA01 (Autenticação):** usuário válido acessa o sistema e usuário inválido recebe mensagem de erro.
- **CA02 (Cadastro administrativo):** é possível criar, editar e inativar área/cargo/perfil sem inconsistências.
- **CA03 (Obrigatoriedade):** ao vincular colaborador a perfil/cargo, os cursos obrigatórios aparecem automaticamente.
- **CA04 (Acompanhamento):** atualização de status do curso reflete corretamente no painel do colaborador e no relatório gerencial.
- **CA05 (Relatórios):** geração de relatório por período/equipe com dados coerentes e exportáveis.
- **CA06 (Segurança):** endpoints protegidos bloqueiam acesso sem token válido.
- **CA07 (Usabilidade):** usuário realiza tarefas principais (login, consulta, inscrição) sem suporte técnico adicional.
