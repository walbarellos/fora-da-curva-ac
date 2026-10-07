# 07. UX / UI & Design System Editorial

## 1. Identidade e Filosofia Visual
O design do **Fora da Curva** se distancia propositalmente da estética burocrática tradicional de portais governamentais (azul-marinho desbotado, tabelas cinzas de baixa legibilidade) e do sensacionalismo tabloide (vermelho vivo gritante, caixas-altas, emojis).

Adotamos uma estética **Editorial Sóbria de Alto Contraste**:
- Fundo muito escuro (`#0B0D10` a `#181D23`);
- Tipografia em alto contraste com números tabulares alinhados;
- O dado fala por si; a interface é minimalista, elegante e precisa.

## 2. Paleta de Cores

```css
:root {
  /* Cores de Fundo (Superfícies) */
  --bg-primary: #0B0D10;    /* Fundo principal / hero */
  --bg-card: #11151A;       /* Superfície de cards e painéis */
  --bg-subtle: #181D23;     /* Bordas sutis, hover e divisores */
  
  /* Cores de Texto */
  --text-high: #F4F5F7;     /* Títulos, números tabulares principais */
  --text-medium: #A8AFB8;   /* Rótulos, explicações, metadados */
  --text-muted: #6C7480;    /* Disclaimers, notas de rodapé */
  
  /* Cores Semânticas Editoriais */
  --accent-amber: #F5B942;  /* Destaque principal: atenção / valores anômalos / dinheiro */
  --status-exceptional: #E45757; /* Picos atípicos / retroativos gigantescos */
  --status-regular: #58C4A3;     /* Salário-base recorrente / dentro do teto */
}
```

## 3. Tipografia e Numerais Tabulares
- **Família tipográfica:** `Inter`, `Manrope` ou fonte sans-serif limpa de alta legibilidade.
- **Números Tabulares:** Regra mandatória em toda exibição monetária:
  ```css
  .tabular-nums {
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
  }
  ```
  Isso garante que dígitos decimais e de milhares fiquem perfeitamente alinhados verticalmente em rankings e tabelas comparativas.

## 4. As 10 Heurísticas de Nielsen Aplicadas ao Produto

1. **Visibilidade do estado do sistema:** Indicadores visíveis de competência ativa, data de atualização dos dados e carregamento de filtros.
2. **Correspondência com o mundo real:** Nomenclaturas humanas e transparentes (*"Salário-base"*, *"Retroativo"*, *"Indenizações"*, *"Anos de trabalho"*) em vez de jargões herméticos de folha.
3. **Controle e liberdade:** Filtros com botão claro de reset ("Limpar filtros") e histórico do navegador em sincronia com os filtros na URL.
4. **Consistência e padrões:** Formatação de moeda brasileira idêntica em todas as páginas (`R$ 1.024.381,72`).
5. **Prevenção de erros:** Nunca misturar valores brutos e líquidos em um mesmo gráfico sem segregação visual clara.
6. **Reconhecimento em vez de memorização:** Tags e badges de filtros ativos visíveis acima da tabela de resultados.
7. **Flexibilidade e eficiência:** Atalhos para faixas monetárias frequentes e busca instantânea por órgão ou cargo.
8. **Design estético e minimalista:** Informação essencial em primeiro plano; detalhes técnicos e decomposições acessíveis com um clique.
9. **Auxílio aos usuários diante de erros:** Mensagens claras caso um tribunal não tenha publicado sua folha ou haja inconsistência nos dados da fonte.
10. **Ajuda e documentação:** Links contextuais em cada gráfico e card direcionando para a página `/metodologia`.
