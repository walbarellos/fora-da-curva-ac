# 04. Metodologia de Dados

## 1. Princípio da Imutabilidade
O dado original coletado nos órgãos é sagrado.
- O diretório `data/raw/` guarda os arquivos na exata formatação e integridade fornecidas pelo órgão governamental.
- Qualquer conversão de tipo, saneamento de nomes de campos ou cálculo de totais ocorre estritamente na etapa de **Normalização**, gerando trilha auditável.

## 2. O Ciclo de Vida dos Dados

1. **RAW (Bruto):**
   - Download de dados abertos (CSV, XML, JSON) de portais oficiais.
   - Registro de metadados: data/hora da requisição, URL original e checksum (SHA-256).

2. **NORMALIZED (Normalizado):**
   - Mapeamento das colunas peculiares de cada tribunal/órgão para o modelo canônico de dados.
   - Decomposição das rubricas em categorias padronizadas.

3. **VALIDATED (Validado):**
   - Checagem aritmética: $\text{Bruto} - \text{Descontos} \stackrel{?}{=} \text{Líquido}$.
   - Verificação de anomalias estatísticas e consistência temporal da matrícula.
   - Aplicação de regras de auditoria do abate-teto constitucional.

4. **PUBLISHED (Publicado):**
   - Carga na base de consulta ou no dataset do produto.

## 3. Classificação das Verbas Remuneratórias
Para evitar simplificações distorcidas, a plataforma categoriza qualquer lançamento de folha em 6 grupos estritos:

| Grupo de Verba | Descrição | Exemplo | Sujeito ao Teto? |
| :--- | :--- | :--- | :--- |
| **Remuneração Básica** | Vencimento do cargo efetivo, subsídio, gratificação de atividade. | Vencimento-base de Desembargador | Sim |
| **Vantagens Pessoais** | Adicional por tempo de serviço (ATS), quintos/décimos incorporados. | Adicional de Tempo de Serviço (ATS) | Sim |
| **Vantagens Eventuais** | Gratificação natalina (13º), 1/3 de férias constitucionais, substituição. | Terço de férias, antecipação 13º | Sim (com regras próprias) |
| **Indenizações** | Auxílio-alimentação, auxílio-moradia, diárias, transporte, ajuda de custo. | Venda de licença-prêmio em pecúnia | **Não (isentas de teto e IRPF)** |
| **Retroativos** | Pagamento acumulado de decisões administrativas ou judiciais pretéritas. | Parcelas atrasadas de PAE / URV | Depende da verba originária |
| **Descontos Obrigatórios** | Previdência própria/RGPS, Imposto de Renda e Retenção por Teto Constitucional. | Abate-teto, IRPF, Previdência | - |

## 4. Métricas e Fórmulas de Comparação Social

### A. Renda Média Mensal de Referência
Utiliza a renda média real habitual do trabalhador brasileiro segundo a **PNAD Contínua (IBGE)**:
$$\text{Renda Média Mensal (Ref.)} = \text{R\$\ } 3.200,00$$

$$\text{Tempo Equivalente (Anos)} = \frac{\text{Valor Bruto Pago}}{\text{Renda Média Mensal} \times 12}$$

### B. Salário Mínimo Vigente
Utiliza o salário mínimo nacional oficial:
$$\text{Múltiplo de Salários Mínimos} = \frac{\text{Valor Bruto Pago}}{\text{Salário Mínimo Nacional}}$$

## 5. Regra de Rotulagem de Excepcionalidade
Se o valor bruto da competência ultrapassar **3 vezes o valor mediano histórico** do servidor nos últimos 12 meses, o sistema emite o rótulo:
> `Pico Excepcional de Remuneração` acompanhado da identificação automática da rubrica causadora (ex: *"74% deste valor decorre de verbas indenizatórias e retroativas"*).
