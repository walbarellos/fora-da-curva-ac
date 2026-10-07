# FORA DA CURVA

> **Os maiores pagamentos do setor público brasileiro, explicados sem burocracia.**

Plataforma cívica e editorial de transparência pública dedicada a destrinchar e contextualizar remunerações atípicas no serviço público brasileiro. Em vez de manchetes sensacionalistas, a plataforma adota o princípio de que **quanto mais chocante o número, mais rigorosa deve ser a explicação**.

---

## 🎯 Conceito e Princípios

1. **Mostrar o dado com contexto, não "pegar servidor":**
   O foco central é a decomposição institucional do gasto (salário-base vs. indenizações vs. pagamentos retroativos) e o histórico temporal do cargo/matrícula, e não o linchamento de pessoas.

2. **Dramatismo no dado, sobriedade na interface:**
   Tipografia editorial escura (`#0B0D10`), números tabulares de alta precisão, contrastes calibrados e ausência de ruído sensacionalista (sem botões de "Denuncie", sem emojis ou caixas altas histéricas).

3. **Comparabilidade com o Brasil Real:**
   Métricas claras que traduzem cifras de seis e sete dígitos em anos de trabalho da renda média brasileira e do salário mínimo, com fontes e metodologias abertas.

---

## 📚 Documentação do Projeto

A documentação detalhada está organizada no diretório [`docs/`](./docs/):

- [01. Visão do Produto](./docs/01-visao-produto.md) — Filosofia, público-alvo e posicionamento.
- [02. Requisitos](./docs/02-requisitos.md) — Requisitos funcionais (RF01 a RF08) e não funcionais (RNF).
- [03. Arquitetura](./docs/03-arquitetura.md) — Arquitetura incremental, stack e pipeline de dados.
- [04. Metodologia de Dados](./docs/04-metodologia-dados.md) — Ciclo RAW → NORMALIZED → VALIDATED → PUBLISHED.
- [05. Fontes Oficiais](./docs/05-fontes.md) — Mapeamento de fontes (CNJ, CNMP, Portal da Transparência, Tribunais).
- [06. Modelo de Dados](./docs/06-modelo-dados.md) — Esquema relacional e auditoria por `source_records`.
- [07. UX / UI & Design System](./docs/07-ux-ui.md) — Paleta editorial, tipografia tabular e heurísticas de Nielsen.
- [08. Acessibilidade](./docs/08-acessibilidade.md) — Diretrizes WCAG 2.2 AA e motion design responsável.
- [09. Segurança & Privacidade](./docs/09-seguranca.md) — Proteção, conformidade com a LAI/LGPD e integridade do dado.
- [10. SEO & Indexação](./docs/10-seo.md) — Estratégia de busca orgânica para páginas canônicas.
- [11. Roadmap de Lançamento](./docs/11-roadmap.md) — Marcos M0 a M5, do MVP Top 100 à cobertura nacional.

---

## 🛠️ Stack Tecnológica

- **Frontend & SSR:** Next.js (App Router), TypeScript, React.
- **Estilização & UI:** Tailwind CSS, Lucide Icons, Shadcn UI patterns.
- **Visualização de Dados:** Recharts / D3.js.
- **Banco de Dados (Fase Pipeline):** PostgreSQL + Drizzle ORM.
- **Pipeline de Ingestão:** Python (scripts modulares de extração e validação).

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm ou pnpm

### Instalação
```bash
# Clone e entre no diretório
git clone <repo-url>
cd fora-da-curva

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## ⚖️ Licença e Metodologia

Consulte a página [`/metodologia`](./docs/04-metodologia-dados.md) para detalhes sobre as regras de coleta, agregações e fórmulas de equivalência social. Dados públicos coletados sob a égide da **Lei de Acesso à Informação (Lei nº 12.527/2011)**.

---

## 👥 Créditos & Concepção

- **Engenharia & Arquitetura de Software:** **Willian Albarello**
- **Inspiração e Concepção Original:** Dedicatória e honra ao **meu primo**, cujo olhar atento e reflexão sobre essas distorções trouxeram a centelha inicial para transformar essa discussão em uma plataforma pública, aberta e rigorosa.

