# 10. SEO & Indexação Semântica

A transparência deve ser facilmente descoberta nos mecanismos de busca por jornalistas, acadêmicos e cidadãos que pesquisam gastos específicos.

## 1. Estrutura de URLs Amigáveis e Canônicas
- `/ranking` — O ranking geral atualizado dos maiores pagamentos.
- `/ranking/[ano]/[mes]` — Visão histórica de competências fechadas.
- `/pagamento/[id]` — Ficha auditável individual de um pagamento (ex: `/pagamento/br-tj-2026-09-001`).
- `/metodologia` — Manifesto e explicações conceituais sobre cálculo e fontes.

## 2. Meta Tags Dinâmicas & Open Graph (Social Cards)
Cada página individual de pagamento gera dinamicamente meta tags Open Graph e Twitter Cards sóbrios:
- **Title:** `R$ 1.024.381,72 — Desembargador (Tribunal X) · Setembro/2026 | Fora da Curva`
- **Description:** `Composição da folha: R$ 39 mil de salário-base e R$ 960 mil em indenizações e retroativos. Entenda a metodologia e os dados oficiais.`
- **OG Image:** Cartão gerado dinamicamente com as proporções da verba em barras, sem fotos de pessoas e com visual editorial.

## 3. Marcação Estruturada (JSON-LD)
Implementação de schemas do Schema.org adequados:
- `Dataset`: Especificando licença de dados públicos, órgão de referência e data de modificação.
- `GovernmentService` ou `Article`: Informando autoria técnica e metodologia.
