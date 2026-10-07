export type Poder = 'Judiciário' | 'Executivo' | 'Legislativo' | 'Ministério Público';
export type Esfera = 'Federal' | 'Estadual' | 'Municipal';

export type CategoriaVerba = 
  | 'Remuneração Básica'
  | 'Vantagens Pessoais'
  | 'Vantagens Eventuais'
  | 'Indenizações'
  | 'Retroativos'
  | 'Descontos Oficiais';

export type FatorPredominante = 
  | 'Retroativo'
  | 'Indenização'
  | 'Férias / 13º'
  | 'Salário Recorrente'
  | 'Acerto / Outros';

export interface ItemVerba {
  id: string;
  categoria: CategoriaVerba;
  descricao: string;
  valor: number;
}

export interface HistoricoMensal {
  competencia: string; // "Jan/26", "Fev/26", etc.
  mesNumero: number;
  valorBruto: number;
  valorLiquido: number;
  isCompetenciaAtual?: boolean;
}

export interface PagamentoRegistro {
  id: string;
  posicaoRanking: number;
  cargo: string;
  orgao: string;
  orgaoSigla: string;
  poder: Poder;
  esfera: Esfera;
  uf: string;
  competencia: string; // "Setembro/2026"
  competenciaCodigo: string; // "2026-09"
  ano: number;
  mes: number;
  
  // Valores monetários
  valorBruto: number;
  remuneracaoBasica: number;
  vantagensPessoais: number;
  vantagensEventuais: number;
  indenizacoes: number;
  retroativos: number;
  outrasVerbas: number;
  
  // Descontos
  abateTeto: number;
  previdencia: number;
  impostoRenda: number;
  descontosLegais: number;
  valorLiquido: number;
  
  // Classificação editorial e inteligência
  fatorPredominante: FatorPredominante;
  isExcepcional: boolean;
  multiploMediaHistorica: number;
  resumoExplicativo: string;
  
  // Comparações de escala social
  comparativos: {
    anosRendaMedia: number; // Ex: 26.7 anos da renda de referência (R$ 3.200)
    mesesRendaMedia: number; // Ex: 320 meses
    multiploSalarioMinimo: number; // Ex: 720 salários mínimos
    salarioMinimoReferencia: number;
    rendaMediaReferencia: number;
  };
  
  // Decomposição detalhada e auditoria
  verbas: ItemVerba[];
  historico: HistoricoMensal[];
  fonteOficial: {
    portalNome: string;
    orgaoExpedidor: string;
    urlOriginal: string;
    dataAtualizacao: string;
    hashAuditoria: string;
    documentoTipo: string;
  };
}

export interface EstatisticasGerais {
  periodoReferencia: string;
  maiorPagamento: number;
  mediaTop100: number;
  medianaTop100: number;
  totalOrgaosAnalisados: number;
  totalPagamentosAnalisados: number;
  percentualComRetroativo: number;
  maiorOrgaoOcorrencias: {
    sigla: string;
    nome: string;
    quantidade: number;
  };
}
