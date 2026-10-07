# 06. Modelo de Dados

O modelo de dados do **Fora da Curva** foi desenhado para ser relacional, normalizado e com rastreabilidade completa até o registro original.

## Diagrama Entidade-Relacionamento

```mermaid
erDiagram
    ORGAO ||--o{ CARGO : "possui"
    ORGAO ||--o{ PESSOA : "emprega"
    CARGO ||--o{ PAGAMENTO : "classifica"
    PESSOA ||--o{ PAGAMENTO : "recebe"
    PAGAMENTO ||--o{ VERBA : "composto_por"
    PAGAMENTO ||--|| SOURCE_RECORD : "auditado_por"

    ORGAO {
        string id PK
        string nome
        string sigla
        string poder "Judiciario | Executivo | Legislativo | MP"
        string esfera "Federal | Estadual | Municipal"
        string uf
    }

    PESSOA {
        string id PK
        string nome_anonimizado_ou_publico
        string orgao_id FK
        string matricula_hash
    }

    CARGO {
        string id PK
        string nome
        string categoria "Magistratura | Ministerio Publico | Auditoria | Outro"
    }

    PAGAMENTO {
        string id PK
        string pessoa_id FK
        string orgao_id FK
        string cargo_id FK
        string competencia "YYYY-MM"
        decimal valor_bruto
        decimal total_descontos
        decimal abate_teto
        decimal valor_liquido
        string fator_excepcional "Retroativo | Indenizacao | Ferias | Recorrente"
        boolean is_outlier
    }

    VERBA {
        string id PK
        string pagamento_id FK
        string categoria "Basica | VantagemPessoal | Eventual | Indenizatoria | Retroativa | Desconto"
        string descricao
        decimal valor
    }

    SOURCE_RECORD {
        string id PK
        string pagamento_id FK
        string url_origem
        string orgao_fonte
        timestamp data_extracao
        string hash_sha256
        jsonb raw_payload
    }
```

## TypeScript Interfaces (TypeScript Data Layer)

```typescript
export type Poder = 'Judiciário' | 'Executivo' | 'Legislativo' | 'Ministério Público';
export type Esfera = 'Federal' | 'Estadual' | 'Municipal';

export type CategoriaVerba = 
  | 'Remuneração Básica'
  | 'Vantagens Pessoais'
  | 'Vantagens Eventuais'
  | 'Indenizações'
  | 'Retroativos'
  | 'Descontos Oficiais';

export interface ItemVerba {
  id: string;
  categoria: CategoriaVerba;
  descricao: string;
  valor: number;
}

export interface HistoricoMensal {
  competencia: string; // "Jan", "Fev", "2026-01", etc.
  valorBruto: number;
  valorLiquido: number;
}

export interface PagamentoRegistro {
  id: string;
  posicaoRanking: number;
  orgao: string;
  orgaoSigla: string;
  poder: Poder;
  esfera: Esfera;
  uf: string;
  cargo: string;
  competencia: string; // "09/2026"
  ano: number;
  mes: number;
  valorBruto: number;
  abateTeto: number;
  descontosLegais: number;
  valorLiquido: number;
  fatorPredominante: 'Retroativo' | 'Indenização' | 'Férias / 13º' | 'Salário Recorrente' | 'Outros';
  resumoExplicativo: string;
  verbas: ItemVerba[];
  historico: HistoricoMensal[];
  fonteOficial: {
    nomePortal: string;
    urlOriginal: string;
    dataAtualizacao: string;
    hashAuditoria: string;
  };
  comparativos: {
    anosRendaMedia: number; // Ex: 26.7
    mesesRendaMedia: number; // Ex: 320
    multiploSalarioMinimo: number; // Ex: 720
  };
}
```
