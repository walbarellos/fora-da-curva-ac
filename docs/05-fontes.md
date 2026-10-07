# 05. Fontes Oficiais e Amparo Legal

## 1. Fundamentação Legal
Todas as informações exibidas pelo **Fora da Curva** são dados abertos públicos, acessados sob estrito amparo da legislação brasileira:
- **Constituição Federal de 1988**, Art. 5º, XXXIII e Art. 37 (Princípio da Publicidade);
- **Lei de Acesso à Informação (Lei nº 12.527/2011)**;
- **Resolução nº 102/2009 e nº 215/2015 do Conselho Nacional de Justiça (CNJ)**;
- **Resolução nº 89/2012 do Conselho Nacional do Ministério Público (CNMP)**;
- **Decisão do Supremo Tribunal Federal (STF)** no ARE 652.480 / Tema 483 de Repercussão Geral, que consolidou a legitimidade da publicação do nome de servidores e de suas respectivas remunerações.

## 2. Mapa de Fontes de Dados Primárias

| Órgão / Entidade | Descrição dos Dados | Formato / Acesso | Frequência |
| :--- | :--- | :--- | :--- |
| **CNJ — Painel de Remuneração dos Magistrados** | Folha de pagamento individualizada de todos os tribunais do país (TJ, TRF, TRT, TRE, STM, STJ). | CSV / Dados Abertos API | Mensal |
| **CNMP — Portal da Transparência do MP** | Folhas do Ministério Público Federal e Ministérios Públicos Estaduais. | CSV / Painel Qlik | Mensal |
| **Portal da Transparência do Executivo Federal** | Servidores civis e militares da União, autarquias e fundações. | CSV compactado (Data Lake CGU) | Mensal |
| **Câmara dos Deputados e Senado Federal** | Folhas de pagamento de servidores e parlamentares federais. | Dados Abertos REST API / CSV | Mensal |
| **Tribunais de Contas Estaduais e Municipais** | Servidores dos poderes executivos e legislativos locais. | Portais de dados abertos estaduais | Variável |

## 3. Critérios de Confiabilidade e Auditoria
1. **Link de Origem Preservado:** Toda ficha de pagamento no Fora da Curva contém a URL original para o portal de transparência de onde foi obtida.
2. **Competência Identificada:** Jamais exibir remunerações sem o mês/ano de competência claramente destacado.
3. **Imparcialidade Institucional:** Não priorizar nem omitir nenhum poder ou categoria. O critério de exibição nos rankings é puramente matemático e estatístico com base no montante financeiro da folha.
