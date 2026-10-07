# 08. Acessibilidade (WCAG 2.2 Nível AA)

A transparência pública só é efetiva se puder ser consumida por qualquer cidadão, incluindo pessoas com deficiência visual, motora ou cognitiva.

## 1. Contraste de Cores
- Todos os textos principais (`#F4F5F7`) sobre superfícies escuras (`#0B0D10` e `#11151A`) possuem taxa de contraste superior a **14:1** (superando com folga o mínimo de 4.5:1 exigido pela WCAG AA).
- O âmbar de destaque (`#F5B942`) e o texto secundário (`#A8AFB8`) respeitam contraste mínimo de **4.5:1** para elementos de texto e **3:1** para componentes de interface.

## 2. Navegação por Teclado e Foco Visível
- Todo elemento interativo (botões, filtros, linhas da tabela de ranking, links para a fonte oficial) possui anel de foco evidente (`focus-visible:ring-2 focus-visible:ring-amber-400`).
- Teclas `Tab`, `Shift+Tab`, `Enter` e `Espaço` operam 100% dos fluxos de navegação e expansão de detalhes.

## 3. Acessibilidade Textual em Gráficos
- Nenhum gráfico é apresentado como imagem cega ou apenas elemento SVG sem suporte a leitores de tela.
- Gráficos possuem tabelas de dados equivalentes ocultas (`sr-only`) ou atributos `aria-label` e descrições textuais ricas informando os pontos de dados exatos.

## 4. Redução de Movimento (`prefers-reduced-motion`)
- Para usuários com sensibilidade vestibular ou que optaram por reduzir animações no sistema operacional:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- O contador numérico no Hero salta instantaneamente para o valor final em vez de rodar animação de subida quando `prefers-reduced-motion` estiver ativo.
