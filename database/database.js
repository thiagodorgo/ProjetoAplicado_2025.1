const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- 1. Tabelas Auxiliares ---

const AreaSchema = new Schema({
  nome: { type: String, required: true },
  departamento: String,
  localizacao: String
});

const CargoSchema = new Schema({
  nome: { type: String, required: true },
  descricao: String,
  requer_nr31: { type: Boolean, default: false }
});

const PerfilSchema = new Schema({
  nome: { type: String, required: true },
  permissoes: [String]
});

// --- 2. Usuários ---

const ColaboradorSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, unique: true },
  senha_hash: { type: String, select: false },
  ativo: { type: Boolean, default: true },
  data_admissao: Date,
  
  cargo: { type: Schema.Types.ObjectId, ref: 'Cargo' },
  area: { type: Schema.Types.ObjectId, ref: 'Area' },
  perfil: { type: Schema.Types.ObjectId, ref: 'Perfil' },
  gestor: { type: Schema.Types.ObjectId, ref: 'Colaborador' }
}, { timestamps: true });

// --- 3. Conteúdo (Cursos e Trilhas) ---

const CursoSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: String,
  slug: { type: String, index: true },
  carga_horaria: Number,
  conteudo_programatico: String,
  instrutores: [String],
  modalidade: { type: String, enum: ['EAD', 'Presencial', 'Hibrido'] },
  norma_referencia: String,
  publico_alvo: String,
  permite_auto_inscricao: Boolean,
  tipo_treinamento: String,
  tags: [String],
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

const TrilhaSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: String,
  obrigatoria: Boolean,
  tags: [String],
  cursos: [{
    curso: { type: Schema.Types.ObjectId, ref: 'Curso' },
    obrigatorio: { type: Boolean, default: true },
    ordem: Number
  }]
}, { timestamps: true });

// --- 4. Execução (Inscrições e Progresso) ---

const InscricaoSchema = new Schema({
  colaborador: { type: Schema.Types.ObjectId, ref: 'Colaborador', required: true },
  curso: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
  
  status: { 
    type: String, 
    enum: ['Inscrito', 'Em Andamento', 'Concluido', 'Cancelado'],
    default: 'Inscrito' 
  },
  aprovado: Boolean,
  nota: Number,
  tipo_inscricao: String,
  
  data_inscricao: { type: Date, default: Date.now },
  data_prevista: Date,
  data_conclusao: Date,
  percentual_atual: { type: Number, default: 0 }
}, { timestamps: true });

const ProgressoSchema = new Schema({
  inscricao: { type: Schema.Types.ObjectId, ref: 'Inscricao', required: true },
  percentual: Number,
  status: String,
  observacoes: String,
  data_evento: { type: Date, default: Date.now }
});

// --- 5. Auditoria ---

const AuditoriaSchema = new Schema({
  acao: { type: String, required: true },
  nome_tabela: { type: String, required: true },
  colaborador: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
  documento_afetado_id: Schema.Types.ObjectId,
  dados_anteriores: Object,
  data_hora: { type: Date, default: Date.now }
});

// --- Exportação dos Models ---

module.exports = {
  Area: mongoose.model('Area', AreaSchema),
  Cargo: mongoose.model('Cargo', CargoSchema),
  Perfil: mongoose.model('Perfil', PerfilSchema),
  Colaborador: mongoose.model('Colaborador', ColaboradorSchema),
  Curso: mongoose.model('Curso', CursoSchema),
  Trilha: mongoose.model('Trilha', TrilhaSchema),
  Inscricao: mongoose.model('Inscricao', InscricaoSchema),
  Progresso: mongoose.model('Progresso', ProgressoSchema),
  Auditoria: mongoose.model('Auditoria', AuditoriaSchema)
};