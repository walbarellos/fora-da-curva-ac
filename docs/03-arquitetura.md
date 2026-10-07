# 03. Arquitetura do Sistema

## 1. Abordagem Metodológica
Rejeitamos abordagens puramente cascata (lentas e rígidas) ou prototipagem rápida desorganizada (RAD sem documentação).
Adotamos **Desenvolvimento Ágil com Arquitetura Incremental**:

```mermaid
flowchart LR
    F0["Fase 0\nDiscovery & Regras"] --> F1["Fase 1\nDesign & Protótipo"]
    F1 --> F2["Fase 2\nMVP Top 100"]
    F2 --> F3["Fase 3\nPipeline Ingestão"]
    F3 --> F4["Fase 4\nValidação Auditável"]
    F4 --> F5["Fase 5\nDeploy & Produção"]
    F5 --> F6["Fase 6\nExpansão de Fontes"]
```

## 2. Stack Tecnológica Selecionada

### Camada de Apresentação & SSR
- **Framework:** Next.js (App Router) + TypeScript.
  - *Justificativa:* Combina renderização no servidor (SSR) e geração estática (SSG/ISR) para alta performance, SEO e URLs canônicas indexáveis.
- **Estilização:** Tailwind CSS v4 / v3.4 + tokens semânticos de cores editoriais.
- **Componentes:** shadcn/ui patterns (acessíveis via Radix Primitives).
- **Ícones:** Lucide React (apenas traços limpos, zero emojis decorativos na interface).
- **Gráficos e Visualizações:** Recharts (para timelines e barras de verba) com suporte a cores temáticas.

### Camada de Dados & Backend (Evolutiva)
- **Fase MVP (M1/M2):** Conjunto estático curado e tipado (`data/seed-top100.json` + TypeScript data access layer) garantindo velocidade imediata e zero custo de infraestrutura no primeiro lançamento.
- **Fase de Escala (M3+):**
  - **Banco de Dados:** PostgreSQL com índices otimizados para busca temporal e monetária.
  - **ORM:** Drizzle ORM para consultas fortemente tipadas e sem sobrecarga de runtime.
  - **Pipeline de Extração:** Scripts em Python para scraping, download de CSVs/JSONs dos portais e normalização para Parquet/Postgres.

## 3. Pipeline de Dados

```mermaid
flowchart TD
    subgraph Coleta
        F1["Portal da Transparência Federal"]
        F2["Painel de Remuneração CNJ"]
        F3["CNMP / Tribunais Estaduais"]
    end

    subgraph Pipeline
        RAW["1. RAW Data Lake\n(Arquivos brutos imutáveis: CSV/JSON)"]
        NORM["2. NORMALIZED\n(Esquema unificado, verbas tipadas)"]
        VAL["3. VALIDATED\n(Regras de integridade, abate-teto, outliers)"]
    end

    subgraph Publicação
        DB["PostgreSQL / Seed Data"]
        API["Next.js Server Actions / APIs"]
        UI["Interface Pública Fora da Curva"]
    end

    F1 & F2 & F3 --> RAW
    RAW --> NORM --> VAL --> DB --> API --> UI
```

## 4. Estratégia de Deploy
- Hospedagem e CDN: Vercel / Cloudflare Pages.
- Edge Caching para rotas estáticas (`/metodologia`, `/ranking`).
- Revalidação incremental (ISR) configurada para quando novas competências forem extraídas do pipeline.
