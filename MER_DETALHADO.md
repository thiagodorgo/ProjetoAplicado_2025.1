# 🗃️ Modelo Entidade-Relacionamento (MER) Detalhado

**TechSolutions - Sistema de Treinamentos Obrigatórios NR-31**  
**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph

---

## 📊 DIAGRAMA TEXTUAL DO MER

```
                    ┌─────────────────┐
                    │     PERFIL      │
                    │ (id_perfil)    │
                    └───────┬────────┘
                            │
                            │ possui
                            │
        ┌───────┬───────┼───────┬───────┐
        │           │           │           │
   ┌────┴────┐ ┌───┴────┐ ┌──┴───┐ ┌───┴─────┐
   │   ÁREA   │ │  CARGO  │ │ TAG  │ │ COLABORADOR │
   │(id_area) │ │(id_cargo)│ │(id)  │ │(id_colab)  │
   └───┬─────┘ └──┬─────┘ └─┬───┘ └───┬───────┘
        │           │        │          │
        │           │        │          │ cria
        │ possui    │ requer │ categoriza│
        │           │        │          │
        │      ┌────┼────────┼─────┐    │
        │      │    │            │    │
        │   ┌─┴───┴────────────┼────┐
        │   │        CURSO          │    │
        │   │      (id_curso)       │    │
        │   └─┬─────────┬────────┬─┘    │
        │     │          │        │       │
        │     │ compõe   │ gera   │       │
        │     │          │        │       │
        │  ┌──┼──────────┼────────┼────┐  │
        │  │  │            │        │    │  │
    ┌───┼──┼──┴────────────┴────────┴────┼──┼───────┐
    │   │  │                            │  │       │
 ┌──┼───┼──┼──┴────────────────────────────┼──┼────────┐
 │  │   │  │                                  │  │        │
 │  │   │  │       REGRA_OBRIGATORIA           │  │ INSCRICAO│
 │  │   │  │         (id_regra)                 │  │(id_insc) │
 │  │   │  └──────────────────────────────────┼──┼────────┘
 │  │   │                                        │  │
 │  │   │                                        │  │ gera
 │  │   │                                   ┌────┼──┼────────┐
 │  │   │                                   │    │  │        │
 │  │   │ categoriza                       │ PROGRESSO  │
 │  │   │                                   │ (id_prog)  │
 │  │   │                                   └────┬───┬───────┘
 │  │   │                                        │   │
 │  │ ┌─┴───────────────────────────────────────┼───┼────────┐
 │  │ │              TRILHA                        │   │        │
 │  │ │            (id_trilha)                     │   │        │
 │  │ └─────────────┬────────────────────────────┼───┼────────┘
 │  │                │                              │   │
 │  │                │ possui                       │   │ emite
 │  │                │                              │   │
 │  │           ┌────┼────────────────────────────┼───┼────────┐
 │  │           │    │                              │   │        │
 │  │           │ CURSO_TRILHA                     │ CERTIFICADO│
 │  │           │ (id_ct, ordem)                   │ (id_cert)  │
 │  │           └──────────────────────────────────┴───┴────────┘
 │  │                                                  │
 │  │ registra                                        │ comprova
 │  │                                                  │
 │  │           ┌──────────────────────────────────┼──────────┐
 │  └───────────┼───────────────────────────────────────────┘          │
 │                │                   EVIDENCIA_PARTICIPACAO     │
 │                │                      (id_evidencia)         │
 │                └────────────────────────────────────────────┘
 │
 │ audita
 │
 └────────────────────────────────────────────────────────┐
                               AUDITORIA                          │
                             (id_auditoria)                       │
                          └────────────────────────────────────┘
```

---

## 📋 ENTIDADES E ATRIBUTOS

### 1. ÁREA
**Descrição:** Representa os setores/departamentos da empresa rural

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_area | INT | PK | Sim | Identificador único |
| nome | VARCHAR(100) | - | Sim | Nome da área |
| departamento | VARCHAR(100) | - | Não | Departamento superior |
| localizacao | VARCHAR(200) | - | Não | Localização física |

**Exemplos:**
- "Setor Campo - Fazenda Principal"
- "Administração - Escritório Central"
- "Manutenção - Galpão de Máquinas"

---

### 2. CARGO
**Descrição:** Define as funções/cargos dos colaboradores

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_cargo | INT | PK | Sim | Identificador único |
| nome | VARCHAR(100) | - | Sim | Nome do cargo |
| descricao | TEXT | - | Não | Descrição das atividades |
| requer_nr31 | BOOLEAN | - | Sim | Se necessita treinamento NR-31 |

**Exemplos:**
- "Operador de Trator" (requer_nr31: true)
- "Aplicador de Agrotóxicos" (requer_nr31: true)
- "Supervisor de Campo" (requer_nr31: true)

---

### 3. PERFIL
**Descrição:** Define os perfis de acesso ao sistema

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_perfil | INT | PK | Sim | Identificador único |
| nome | VARCHAR(50) | - | Sim | Nome do perfil |
| permissoes | ARRAY | - | Sim | Lista de permissões |

**Exemplos de Perfis:**
- **Administrador:** ["admin", "create", "read", "update", "delete"]
- **Gestor:** ["read", "update", "reports"]
- **Colaborador:** ["read_own"]

---

### 4. COLABORADOR
**Descrição:** Representa os trabalhadores rurais do sistema

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_colaborador | INT | PK | Sim | Identificador único |
| nome | VARCHAR(200) | - | Sim | Nome completo |
| email | VARCHAR(100) | UNIQUE | Sim | Email (login) |
| cpf | VARCHAR(14) | - | Não | CPF do colaborador |
| senha_hash | VARCHAR(255) | - | Sim | Senha hasheada (bcrypt) |
| id_cargo | INT | FK | Sim | Referência ao cargo |
| id_area | INT | FK | Sim | Referência à área |
| id_perfil | INT | FK | Sim | Referência ao perfil |
| id_gestor | INT | FK | Não | Referência ao gestor |
| data_admissao | DATE | - | Não | Data de admissão |
| ativo | BOOLEAN | - | Sim | Status do colaborador |

**Relacionamentos:**
- N:1 com CARGO (um cargo pode ter vários colaboradores)
- N:1 com ÁREA (uma área pode ter vários colaboradores)
- N:1 com PERFIL (um perfil pode ter vários colaboradores)
- N:1 com COLABORADOR (gestor - autorrelação)

---

### 5. TAG
**Descrição:** Tags para categorizar cursos e trilhas

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_tag | INT | PK | Sim | Identificador único |
| nome | VARCHAR(50) | - | Sim | Nome da tag |
| cor | VARCHAR(20) | - | Não | Cor para identificação visual |

**Exemplos:**
- "NR-31" (cor: #10b981)
- "Máquinas" (cor: #3b82f6)
- "Agrotóxicos" (cor: #ef4444)

---

### 6. CURSO
**Descrição:** Representa os treinamentos/cursos do sistema

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_curso | INT | PK | Sim | Identificador único |
| titulo | VARCHAR(200) | - | Sim | Título do curso |
| descricao | TEXT | - | Não | Descrição detalhada |
| carga_horaria | INT | - | Sim | Carga horária em horas |
| modalidade | ENUM | - | Sim | presencial, online_sincrono, online_assincrono |
| tipo_treinamento | ENUM | - | Sim | nr31, operacao_maquinas, agrotoxicos, primeiros_socorros, prevencao_acidentes, outros |
| norma_referencia | VARCHAR(50) | - | Não | Ex: "NR-31", "NR-12" |
| publico_alvo | VARCHAR(200) | - | Não | Descrição do público |
| instrutores | TEXT | - | Não | Nomes dos instrutores |
| permite_auto_inscricao | BOOLEAN | - | Sim | Se permite auto-inscrição |
| tags | ARRAY(INT) | - | Não | IDs das tags |
| conteudo_programatico | TEXT | - | Não | Conteúdo programático |

**Relacionamentos:**
- N:M com TAG (um curso pode ter várias tags)

---

### 7. TRILHA
**Descrição:** Organiza cursos em sequências de aprendizagem

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_trilha | INT | PK | Sim | Identificador único |
| titulo | VARCHAR(200) | - | Sim | Título da trilha |
| descricao | TEXT | - | Não | Descrição da trilha |
| obrigatoria | BOOLEAN | - | Sim | Se a trilha é obrigatória |
| tags | ARRAY(INT) | - | Não | IDs das tags |

**Exemplo:**
- "Trilha Operador de Máquinas Agrícolas"
- "Trilha Segurança com Agrotóxicos"

---

### 8. CURSO_TRILHA
**Descrição:** Relaciona cursos com trilhas (com ordem e pré-requisitos)

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_curso_trilha | INT | PK | Sim | Identificador único |
| id_curso | INT | FK | Sim | Referência ao curso |
| id_trilha | INT | FK | Sim | Referência à trilha |
| ordem | INT | - | Sim | Ordem do curso na trilha |
| id_prerequisito | INT | FK | Não | Curso pré-requisito |
| obrigatorio | BOOLEAN | - | Sim | Se o curso é obrigatório |

**Exemplo de Sequência:**
1. Introdução à Segurança Rural (ordem: 1, pré-requisito: null)
2. Operação Básica de Tratores (ordem: 2, pré-requisito: 1)
3. Operação Avançada (ordem: 3, pré-requisito: 2)

---

### 9. REGRA_OBRIGATORIA
**Descrição:** Define quais cursos/trilhas são obrigatórios por cargo/área

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_regra | INT | PK | Sim | Identificador único |
| id_curso | INT | FK | Não* | Referência ao curso |
| id_trilha | INT | FK | Não* | Referência à trilha |
| id_cargo | INT | FK | Não | Aplica para cargo específico |
| id_area | INT | FK | Não | Aplica para área específica |
| validade_certificado_meses | INT | - | Sim | Validade em meses |
| alerta_vencimento_dias | INT | - | Sim | Dias antes para alertar |
| descricao | TEXT | - | Não | Descrição da regra |

**\*Nota:** Deve ter id_curso OU id_trilha (pelo menos um)

**Lógica de Aplicação:**
- Se id_cargo preenchido: aplica a TODOS do cargo
- Se id_area preenchido: aplica a TODOS da área
- Se ambos: aplica ao cargo DENTRO da área
- Se nenhum: aplica a TODOS colaboradores

---

### 10. INSCRICAO
**Descrição:** Registra inscrições dos colaboradores nos cursos

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_inscricao | INT | PK | Sim | Identificador único |
| id_colaborador | INT | FK | Sim | Referência ao colaborador |
| id_curso | INT | FK | Sim | Referência ao curso |
| data_inscricao | DATETIME | - | Sim | Data/hora da inscrição |
| data_prevista | DATE | - | Não | Data prevista de conclusão |
| status | ENUM | - | Sim | pendente, em_andamento, concluido, vencido, cancelado |
| tipo_inscricao | ENUM | - | Sim | manual, auto_inscricao, automatica |
| data_conclusao | DATETIME | - | Não | Data/hora da conclusão |
| nota | FLOAT | - | Não | Nota obtida |
| aprovado | BOOLEAN | - | Sim | Se foi aprovado |

**Relação:**
- 1:1 com PROGRESSO (cada inscrição gera um progresso)

---

### 11. PROGRESSO
**Descrição:** Acompanha o progresso do colaborador no curso

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_progresso | INT | PK | Sim | Identificador único |
| id_inscricao | INT | FK | Sim | Referência à inscrição |
| percentual | FLOAT | - | Sim | Percentual concluído (0-100) |
| status | ENUM | - | Sim | pendente, em_andamento, concluido |
| data_conclusao | DATETIME | - | Não | Data/hora da conclusão |
| observacoes | TEXT | - | Não | Observações adicionais |

---

### 12. EVIDENCIA_PARTICIPACAO
**Descrição:** Registra evidências de participação nos treinamentos

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_evidencia | INT | PK | Sim | Identificador único |
| id_inscricao | INT | FK | Sim | Referência à inscrição |
| tipo_evidencia | ENUM | - | Sim | assinatura_digital, qr_code, log_acesso, certificado, lista_presenca |
| url_arquivo | VARCHAR(500) | - | Não | URL do arquivo de evidência |
| data_registro | DATETIME | - | Sim | Data/hora do registro |
| descricao | TEXT | - | Não | Descrição da evidência |

**Tipos de Evidência:**
- **assinatura_digital:** Assinatura eletrônica do colaborador
- **qr_code:** Leitura de QR Code na entrada/saída
- **log_acesso:** Log de acesso ao sistema EAD
- **certificado:** Cópia do certificado emitido
- **lista_presenca:** Lista de presença digitalizada

---

### 13. CERTIFICADO
**Descrição:** Certificados digitais emitidos após conclusão

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_certificado | INT | PK | Sim | Identificador único |
| id_inscricao | INT | FK | Sim | Referência à inscrição |
| data_emissao | DATETIME | - | Sim | Data/hora de emissão |
| data_validade | DATE | - | Não | Data de vencimento |
| codigo_verificacao | VARCHAR(50) | UNIQUE | Sim | Código para validação |
| status | ENUM | - | Sim | ativo, vencido, revogado |

**Cálculo de Validade:**
- Busca REGRA_OBRIGATORIA do curso
- Adiciona `validade_certificado_meses` à data_emissao
- Sistema alerta `alerta_vencimento_dias` antes do vencimento

---

### 14. AUDITORIA
**Descrição:** Log completo de todas as ações no sistema

| Atributo | Tipo | Chave | Obrigatório | Descrição |
|----------|------|-------|--------------|----------|
| id_auditoria | INT | PK | Sim | Identificador único |
| id_colaborador_acao | INT | FK | Sim | Quem fez a ação |
| acao | ENUM | - | Sim | CREATE, UPDATE, DELETE, LOGIN, LOGOUT, SINCRONIZACAO |
| nome_tabela | VARCHAR(50) | - | Sim | Tabela afetada |
| id_registro_afetado | INT | - | Não | ID do registro modificado |
| ip_origem | VARCHAR(45) | - | Não | IP de origem |
| dados_antigos | JSON | - | Não | Estado anterior (JSON) |
| dados_novos | JSON | - | Não | Estado novo (JSON) |
| data_hora | DATETIME | - | Sim | Data/hora da ação |

---

## 🔗 RELACIONAMENTOS

### Relacionamentos 1:N (Um para Muitos)

1. **ÁREA → COLABORADOR**
   - Uma área possui muitos colaboradores
   - Um colaborador pertence a uma área

2. **CARGO → COLABORADOR**
   - Um cargo possui muitos colaboradores
   - Um colaborador tem um cargo

3. **PERFIL → COLABORADOR**
   - Um perfil possui muitos colaboradores
   - Um colaborador tem um perfil

4. **COLABORADOR → INSCRICAO**
   - Um colaborador pode ter muitas inscrições
   - Uma inscrição pertence a um colaborador

5. **CURSO → INSCRICAO**
   - Um curso pode ter muitas inscrições
   - Uma inscrição é de um curso

6. **INSCRICAO → PROGRESSO**
   - Uma inscrição tem um progresso
   - Um progresso pertence a uma inscrição

7. **INSCRICAO → EVIDENCIA**
   - Uma inscrição pode ter muitas evidências
   - Uma evidência pertence a uma inscrição

8. **INSCRICAO → CERTIFICADO**
   - Uma inscrição pode gerar um certificado
   - Um certificado pertence a uma inscrição

### Relacionamentos N:M (Muitos para Muitos)

1. **CURSO ↔ TRILHA** (via CURSO_TRILHA)
   - Um curso pode estar em muitas trilhas
   - Uma trilha possui muitos cursos
   - Atributos: ordem, id_prerequisito, obrigatorio

2. **CURSO ↔ TAG**
   - Um curso pode ter muitas tags
   - Uma tag pode estar em muitos cursos

3. **TRILHA ↔ TAG**
   - Uma trilha pode ter muitas tags
   - Uma tag pode estar em muitas trilhas

### Autorrelacionamentos

1. **COLABORADOR → COLABORADOR (gestor)**
   - Um colaborador pode ser gestor de muitos colaboradores
   - Um colaborador tem um gestor (opcional)

---

## 🔐 REGRAS DE NEGÓCIO

### RN01: Inscrição Automática
**Quando:** Colaborador é cadastrado ou muda de cargo/área  
**Então:** Sistema verifica REGRA_OBRIGATORIA e cria INSCRICAO automaticamente

### RN02: Criação de Progresso
**Quando:** INSCRICAO é criada  
**Então:** Sistema cria PROGRESSO automaticamente com percentual 0%

### RN03: Validação de Pré-requisito
**Quando:** Colaborador tenta se inscrever em curso de trilha  
**Então:** Sistema valida se pré-requisito foi concluído

### RN04: Emissão de Certificado
**Quando:** PROGRESSO atinge 100% e status = concluido  
**Então:** Sistema permite emitir CERTIFICADO

### RN05: Cálculo de Validade
**Quando:** CERTIFICADO é emitido  
**Então:** Sistema calcula data_validade baseado em REGRA_OBRIGATORIA.validade_certificado_meses

### RN06: Alerta de Vencimento
**Quando:** Sistema roda job diário  
**Então:** Identifica certificados próximos do vencimento (baseado em alerta_vencimento_dias)

### RN07: Status Vencido
**Quando:** data_validade do CERTIFICADO < data_atual  
**Então:** Sistema atualiza status para "vencido"

### RN08: Auditoria de Ações
**Quando:** CREATE, UPDATE, DELETE em tabelas críticas  
**Então:** Sistema registra em AUDITORIA com dados antigos e novos

---

## 📊 ÍNDICES RECOMENDADOS

### Performance de Consultas:

```sql
-- COLABORADOR
CREATE INDEX idx_colaborador_email ON COLABORADOR(email);
CREATE INDEX idx_colaborador_cargo ON COLABORADOR(id_cargo);
CREATE INDEX idx_colaborador_area ON COLABORADOR(id_area);
CREATE INDEX idx_colaborador_ativo ON COLABORADOR(ativo);

-- INSCRICAO
CREATE INDEX idx_inscricao_colaborador ON INSCRICAO(id_colaborador);
CREATE INDEX idx_inscricao_curso ON INSCRICAO(id_curso);
CREATE INDEX idx_inscricao_status ON INSCRICAO(status);
CREATE INDEX idx_inscricao_data ON INSCRICAO(data_inscricao);

-- CERTIFICADO
CREATE INDEX idx_certificado_inscricao ON CERTIFICADO(id_inscricao);
CREATE INDEX idx_certificado_codigo ON CERTIFICADO(codigo_verificacao);
CREATE INDEX idx_certificado_validade ON CERTIFICADO(data_validade);
CREATE INDEX idx_certificado_status ON CERTIFICADO(status);

-- CURSO_TRILHA
CREATE INDEX idx_ct_trilha ON CURSO_TRILHA(id_trilha);
CREATE INDEX idx_ct_ordem ON CURSO_TRILHA(id_trilha, ordem);

-- AUDITORIA
CREATE INDEX idx_auditoria_colaborador ON AUDITORIA(id_colaborador_acao);
CREATE INDEX idx_auditoria_data ON AUDITORIA(data_hora);
CREATE INDEX idx_auditoria_tabela ON AUDITORIA(nome_tabela);
```

---

## 📦 CARDINALIDADES

| Relacionamento | Cardinalidade |
|----------------|---------------|
| ÁREA → COLABORADOR | 1:N |
| CARGO → COLABORADOR | 1:N |
| PERFIL → COLABORADOR | 1:N |
| COLABORADOR → COLABORADOR (gestor) | 1:N |
| COLABORADOR → INSCRICAO | 1:N |
| CURSO → INSCRICAO | 1:N |
| INSCRICAO → PROGRESSO | 1:1 |
| INSCRICAO → EVIDENCIA | 1:N |
| INSCRICAO → CERTIFICADO | 1:1 |
| CURSO ↔ TRILHA | N:M |
| CURSO ↔ TAG | N:M |
| TRILHA ↔ TAG | N:M |
| CURSO → REGRA_OBRIGATORIA | 1:N |
| TRILHA → REGRA_OBRIGATORIA | 1:N |
| CARGO → REGRA_OBRIGATORIA | 1:N |
| ÁREA → REGRA_OBRIGATORIA | 1:N |

---

**Projeto Aplicado 2 - Grupo 7**  
**Desenvolvedores:** Thiago, Fabricio, Pettrin, Joseph
