# 02. Requisitos do Sistema

## Requisitos Funcionais (RF)

### RF01 — Página Inicial (Hero & Visão Panorâmica)
- Exibir o maior pagamento registrado no período analisado com tipografia tabular de alto impacto.
- Apresentar metadados imediatos: competência (mês/ano), órgão de lotação, cargo e UF.
- Exibir card comparativo imediato ("Isso equivale a X anos de trabalho na renda média nacional").
- Seção estatística "O Brasil paga quanto?": Maior pagamento, média dos 100 maiores, total de órgãos e pagamentos analisados.
- CTA claro para exploração: `"Explorar os dados"`.

### RF02 — Ranking dos Maiores Pagamentos
- Tabela paginada e ordenável contendo: Posição, Cargo, Órgão, Poder, UF, Valor Bruto e Classificação da Verba Predominante.
- Destaque visual sutil e sóbrio para valores excepcionais (fora do teto constitucional regular por meio de verbas indenizatórias).
- Pré-visualização rápida da proporção entre salário-base vs. verbas excepcionais.

### RF03 — Filtros Combináveis
- Filtros reativos e com URL persistente (querystrings):
  - Período (Mês/Ano);
  - Poder (Judiciário, Executivo, Legislativo, Ministério Público);
  - Esfera (Federal, Estadual, Municipal);
  - Órgão e UF;
  - Cargo / Categoria profissional;
  - Faixa de Remuneração (ex: > R$ 100k, > R$ 300k, > R$ 500k, > R$ 1 milhão).

### RF04 — Página Individual do Pagamento (`/pagamento/[id]`)
- Exibição de valores canônicos: Remuneração Bruta, Descontos Legais (Previdência e IRPF, Abate-teto) e Valor Líquido.
- Seção explicativa automatizada: **"Por que este valor é tão alto?"**
- Classificação automatizada do fator preponderante: `Retroativo`, `Indenização`, `Férias / 13º`, `Acerto`, `Salário Recorrente`.
- Disclaimer explícito de contextualização quando o valor for anômalo:
  > *"Esse valor é excepcional. Não representa o salário mensal típico do cargo."*

### RF05 — Comparações e Escala Social
- Card interativo com barra de equivalência social:
  - Comparação com a renda média brasileira (PNAD Contínua / IBGE);
  - Comparação com o salário mínimo vigente;
  - Tempo em anos e meses que um trabalhador levaria para auferir tal montante.

### RF06 — Evolução Temporal (Histórico do Cargo/Servidor)
- Gráfico de barras verticais cobrindo 12 competências anteriores daquele cargo/matrícula.
- Permite evidenciar contrastes entre a remuneração ordinária (ex: R$ 39 mil a R$ 44 mil) e o mês de pico atípico (ex: R$ 1 milhão).

### RF07 — Auditoria e Fonte Oficial
- Bloco obrigatório em cada registro contendo:
  - Nome do órgão expedidor e portal de origem;
  - Data e hora da última extração/atualização;
  - Código identificador / hash de auditoria do registro original (`source_records`);
  - Link direto (`URL original`) para o portal de transparência oficial de origem.

### RF08 — Metodologia Aberta (`/metodologia`)
- Página canônica detalhando o dicionário de dados, tratamento de homônimos, critérios de normalização e limitações da informação pública.

---

## Requisitos Não Funcionais (RNF)

| Categoria | Meta / Padrão | Detalhes |
| :--- | :--- | :--- |
| **Performance** | Lighthouse ≥ 90 em todas as métricas | SSR/SSG com cache eficiente, zero overhead desnecessário de scripts externos. |
| **Responsividade** | Mobile-First | Interface adaptada para smartphones, tablets e telas ultrawide com foco em usabilidade táctil. |
| **Acessibilidade** | WCAG 2.2 Nível AA | Contraste mínimo de 4.5:1, suporte total a navegação por teclado, leitor de tela e `prefers-reduced-motion`. |
| **Segurança** | OWASP Top 10 + Privacy-by-design | CSP estrito, sanitização, ausência de credenciais em bundles clientes, sem exposição abusiva de CPF ou dados sensíveis. |
| **SEO & Indexação** | Open Graph + URLs Semânticas | Rotas como `/pagamento/[id]` e `/ranking` com meta tags dinâmicas para compartilhamento orgânico em redes e portais de notícias. |
