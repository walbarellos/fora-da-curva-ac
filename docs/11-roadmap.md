# 11. Roadmap do Projeto

## Marcos de Desenvolvimento

```mermaid
flowchart TD
    M0["M0 — Fundação & Design System\n• Docs consolidados\n• Paleta editorial & tokens\n• Modelo conceitual"]
    M1["M1 — Protótipo Funcional MVP\n• Top 100 pagamentos representativos\n• Hero com número tabular e comparador social\n• Decomposição de verbas + Histórico 12m\n• Página /metodologia"]
    M2["M2 — Validação e Primeira Fonte Real\n• Ingestão direta dos dados do Painel CNJ\n• Auditoria aritmética de abate-teto"]
    M3["M3 — Pipeline Automatizado\n• Jobs de extração periódica em Python\n• Banco PostgreSQL com Drizzle ORM"]
    M4["M4 — Publicação e Lançamento Beta\n• Deploy na Vercel com CDN edge caching\n• Testes de acessibilidade (Lighthouse 90+)"]
    M5["M5 — Expansão Nacional\n• Inclusão de Tribunais de Contas, MPs e Executivo\n• Comparador entre carreiras e unidades da federação"]

    M0 --> M1 --> M2 --> M3 --> M4 --> M5
```

### Detalhamento das Fases

### M0 — Fundação (Concluído)
- [x] Conceituação do produto e diretrizes editoriais.
- [x] Especificação funcional e não-funcional.
- [x] Definição de design system, tipografia e regras de acessibilidade.
- [x] Documentação técnica completa em 11 volumes.

### M1 — MVP: "Os 100 Maiores Pagamentos" (Em Execução)
- [ ] Scaffold do Next.js com Tailwind CSS e TypeScript.
- [ ] Criação do dataset semente estruturado com 100 casos reais e decomposição de rubricas.
- [ ] Implementação da Homepage (Hero dramático, estatísticas, comparador de renda de referência).
- [ ] Implementação da Tabela Ranking com filtros reativos.
- [ ] Implementação da tela individual `/pagamento/[id]` com histórico temporal e breakdown.
- [ ] Implementação de `/metodologia`.

### M2 — Integração da Primeira Fonte Real
- [ ] Conector para extração de microdados do CNJ.
- [ ] Mapeamento automatizado de rubricas para as 6 categorias canônicas.

### M3 — Infraestrutura de Dados Persistente
- [ ] Migração do dataset para PostgreSQL gerenciado.
- [ ] Rotinas de validação de integridade por hash SHA-256.

### M4 — Lançamento e Divulgação
- [ ] Lançamento público para jornalistas de dados e pesquisadores.
- [ ] Auditoria independente de dados abertos.
