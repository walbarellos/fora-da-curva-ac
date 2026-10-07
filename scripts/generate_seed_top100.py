#!/usr/bin/env python3
"""
Gera o dataset de semente dos 100 maiores pagamentos do setor público brasileiro
com decomposição realista de rubricas, histórico de 12 meses e auditoria de fontes.
"""

import json
import hashlib
import random

random.seed(42)

SALARIO_MINIMO = 1518.00  # Referência nacional estimada
RENDA_MEDIA = 3200.00     # PNAD Contínua habitual de referência

ORGAOS_DATA = [
    {"sigla": "TJSP", "nome": "Tribunal de Justiça de São Paulo", "poder": "Judiciário", "esfera": "Estadual", "uf": "SP", "portal": "Portal da Transparência TJSP"},
    {"sigla": "TJMG", "nome": "Tribunal de Justiça de Minas Gerais", "poder": "Judiciário", "esfera": "Estadual", "uf": "MG", "portal": "Painel de Remuneração TJMG"},
    {"sigla": "TJRJ", "nome": "Tribunal de Justiça do Rio de Janeiro", "poder": "Judiciário", "esfera": "Estadual", "uf": "RJ", "portal": "Transparência TJRJ"},
    {"sigla": "TJMT", "nome": "Tribunal de Justiça de Mato Grosso", "poder": "Judiciário", "esfera": "Estadual", "uf": "MT", "portal": "Portal Transparência TJMT"},
    {"sigla": "TJRO", "nome": "Tribunal de Justiça de Rondônia", "poder": "Judiciário", "esfera": "Estadual", "uf": "RO", "portal": "Transparência TJRO"},
    {"sigla": "TJGO", "nome": "Tribunal de Justiça de Goiás", "poder": "Judiciário", "esfera": "Estadual", "uf": "GO", "portal": "Transparência TJGO"},
    {"sigla": "TJPR", "nome": "Tribunal de Justiça do Paraná", "poder": "Judiciário", "esfera": "Estadual", "uf": "PR", "portal": "Portal da Transparência TJPR"},
    {"sigla": "TJPA", "nome": "Tribunal de Justiça do Pará", "poder": "Judiciário", "esfera": "Estadual", "uf": "PA", "portal": "Transparência TJPA"},
    {"sigla": "TJRS", "nome": "Tribunal de Justiça do Rio Grande do Sul", "poder": "Judiciário", "esfera": "Estadual", "uf": "RS", "portal": "Transparência TJRS"},
    {"sigla": "TJAC", "nome": "Tribunal de Justiça do Acre", "poder": "Judiciário", "esfera": "Estadual", "uf": "AC", "portal": "Transparência TJAC"},
    {"sigla": "TRF1", "nome": "Tribunal Regional Federal da 1ª Região", "poder": "Judiciário", "esfera": "Federal", "uf": "DF", "portal": "Transparência TRF1"},
    {"sigla": "TRF3", "nome": "Tribunal Regional Federal da 3ª Região", "poder": "Judiciário", "esfera": "Federal", "uf": "SP", "portal": "Transparência TRF3"},
    {"sigla": "TRT2", "nome": "Tribunal Regional do Trabalho da 2ª Região", "poder": "Judiciário", "esfera": "Federal", "uf": "SP", "portal": "Transparência TRT2"},
    {"sigla": "MPSP", "nome": "Ministério Público de São Paulo", "poder": "Ministério Público", "esfera": "Estadual", "uf": "SP", "portal": "Transparência MPSP"},
    {"sigla": "MPMG", "nome": "Ministério Público de Minas Gerais", "poder": "Ministério Público", "esfera": "Estadual", "uf": "MG", "portal": "Transparência MPMG"},
    {"sigla": "MPRJ", "nome": "Ministério Público do Rio de Janeiro", "poder": "Ministério Público", "esfera": "Estadual", "uf": "RJ", "portal": "Transparência MPRJ"},
    {"sigla": "MPF", "nome": "Ministério Público Federal", "poder": "Ministério Público", "esfera": "Federal", "uf": "DF", "portal": "Portal Transparência MPF"},
    {"sigla": "TCU", "nome": "Tribunal de Contas da União", "poder": "Legislativo", "esfera": "Federal", "uf": "DF", "portal": "Transparência TCU"},
    {"sigla": "TCE-SP", "nome": "Tribunal de Contas do Estado de São Paulo", "poder": "Legislativo", "esfera": "Estadual", "uf": "SP", "portal": "Transparência TCE-SP"},
    {"sigla": "SEFAZ-SP", "nome": "Secretaria da Fazenda de São Paulo", "poder": "Executivo", "esfera": "Estadual", "uf": "SP", "portal": "Transparência SP Governamental"},
    {"sigla": "PGE-RJ", "nome": "Procuradoria Geral do Estado do Rio de Janeiro", "poder": "Executivo", "esfera": "Estadual", "uf": "RJ", "portal": "Transparência PGE-RJ"},
]

CARGOS = [
    "Desembargador",
    "Juiz de Direito (Entrância Final)",
    "Procurador de Justiça",
    "Promotor de Justiça (Entrância Final)",
    "Juiz Federal Substituto",
    "Desembargador Federal",
    "Auditor Fiscal da Receita Estadual",
    "Conselheiro do Tribunal de Contas",
    "Procurador do Estado (Nível Superior)"
]

# Casos âncora destacados
TOP_CASES = [
    {
        "valorBruto": 1024381.72,
        "cargo": "Desembargador",
        "orgaoSigla": "TJMT",
        "remuneracaoBasica": 39293.32,
        "vantagensPessoais": 18442.10,
        "indenizacoes": 320000.00,
        "retroativos": 640000.00,
        "outrasVerbas": 6646.30,
        "abateTeto": 0.00,
        "fator": "Retroativo",
        "motivo": "Acúmulo de decisões administrativas referentes a passivos pretéritos de Parcela Autônoma de Equivalência (PAE) e venda indenizada de licença-prêmio."
    },
    {
        "valorBruto": 893442.15,
        "cargo": "Procurador de Justiça",
        "orgaoSigla": "MPMG",
        "remuneracaoBasica": 41845.48,
        "vantagensPessoais": 12553.64,
        "indenizacoes": 410000.00,
        "retroativos": 425000.00,
        "outrasVerbas": 4043.03,
        "abateTeto": 0.00,
        "fator": "Indenização",
        "motivo": "Conversão de 10 períodos de férias não gozadas em indenização pecuniária somada a diferenças retroativas de gratificação de acervo."
    },
    {
        "valorBruto": 847321.45,
        "cargo": "Desembargador",
        "orgaoSigla": "TJSP",
        "remuneracaoBasica": 39293.32,
        "vantagensPessoais": 21450.00,
        "indenizacoes": 286578.13,
        "retroativos": 500000.00,
        "outrasVerbas": 0.00,
        "abateTeto": 0.00,
        "fator": "Retroativo",
        "motivo": "Quitação em parcela única de atrasados de reposição inflacionária e licenças compensatórias acumuladas ao longo de 8 anos."
    },
    {
        "valorBruto": 761221.80,
        "cargo": "Desembargador",
        "orgaoSigla": "TJRO",
        "remuneracaoBasica": 39293.32,
        "vantagensPessoais": 15420.00,
        "indenizacoes": 356508.48,
        "retroativos": 350000.00,
        "outrasVerbas": 0.00,
        "abateTeto": 0.00,
        "fator": "Indenização",
        "motivo": "Indenização por acúmulo de jurisdição extraordinária e conversão pecuniária de licença especial."
    },
    {
        "valorBruto": 712950.60,
        "cargo": "Juiz de Direito (Entrância Final)",
        "orgaoSigla": "TJGO",
        "remuneracaoBasica": 37731.80,
        "vantagensPessoais": 9500.00,
        "indenizacoes": 315718.80,
        "retroativos": 350000.00,
        "outrasVerbas": 0.00,
        "abateTeto": 0.00,
        "fator": "Retroativo",
        "motivo": "Repasse retroativo de verbas rescisórias e equiparação salarial concedida via resolução administrativa."
    }
]

def generate_record(rank):
    if rank <= len(TOP_CASES):
        spec = TOP_CASES[rank - 1]
        bruto = spec["valorBruto"]
        cargo = spec["cargo"]
        orgao_info = next(o for o in ORGAOS_DATA if o["sigla"] == spec["orgaoSigla"])
        base = spec["remuneracaoBasica"]
        pessoal = spec["vantagensPessoais"]
        indeniz = spec["indenizacoes"]
        retro = spec["retroativos"]
        outras = spec["outrasVerbas"]
        fator = spec["fator"]
        resumo = spec["motivo"]
    else:
        # Gerar valores decrescentes entre 700k e 195k
        factor = (100 - rank) / 95.0
        bruto = round(195000.00 + (505000.00 * (factor ** 1.35)) + random.uniform(-1500, 1500), 2)
        
        orgao_info = random.choice(ORGAOS_DATA)
        cargo = random.choice(CARGOS)
        
        base = round(random.uniform(37000.00, 44000.00), 2)
        pessoal = round(random.uniform(4000.00, 18000.00), 2)
        
        sobra = bruto - (base + pessoal)
        if random.random() > 0.45:
            retro = round(sobra * random.uniform(0.55, 0.85), 2)
            indeniz = round(sobra - retro, 2)
            fator = "Retroativo"
            resumo = "Pagamento acumulado de diferenças remuneratórias reconhecidas administrativamente (passivos de ATS ou PAE)."
        else:
            indeniz = round(sobra * random.uniform(0.60, 0.90), 2)
            retro = round(sobra - indeniz, 2)
            fator = "Indenização"
            resumo = "Indenização de períodos de férias ou licenças acumuladas sem incidência do teto constitucional."
        outras = 0.00

    # Descontos previstos
    previdencia = round(base * 0.14, 2)
    # Verbas indenizatórias são isentas de IR. Retroativos pagam RRA (tributação exclusiva na fonte com alíquota média de ~15-20%)
    imposto_renda = round(((base + pessoal - previdencia) * 0.275) + (retro * 0.16), 2)
    descontos_legais = round(previdencia + imposto_renda, 2)
    liquido = round(bruto - descontos_legais, 2)
    
    # Comparações sociais
    anos_renda_media = round(bruto / (RENDA_MEDIA * 12), 1)
    meses_renda_media = round(bruto / RENDA_MEDIA)
    multiplo_minimo = round(bruto / SALARIO_MINIMO)

    # Histórico de 12 meses
    # Nos outros meses, o servidor recebe valor padrão entre 38k e 44k
    historico = []
    meses_nomes = ["Out/25", "Nov/25", "Dez/25", "Jan/26", "Fev/26", "Mar/26", "Abr/26", "Mai/26", "Jun/26", "Jul/26", "Ago/26", "Set/26"]
    for i, m in enumerate(meses_nomes):
        if i == 11:  # Competência analisada (Setembro/2026)
            historico.append({
                "competencia": m,
                "mesNumero": 9,
                "valorBruto": bruto,
                "valorLiquido": liquido,
                "isCompetenciaAtual": True
            })
        elif i == 2:  # Dezembro (13º)
            hist_b = round(base * 2 + pessoal + random.uniform(1000, 4000), 2)
            historico.append({
                "competencia": m,
                "mesNumero": 12,
                "valorBruto": hist_b,
                "valorLiquido": round(hist_b * 0.68, 2),
                "isCompetenciaAtual": False
            })
        else:
            hist_b = round(base + pessoal + random.uniform(-1000, 3000), 2)
            historico.append({
                "competencia": m,
                "mesNumero": (i - 2) if (i - 2) > 0 else (i + 10),
                "valorBruto": hist_b,
                "valorLiquido": round(hist_b * 0.71, 2),
                "isCompetenciaAtual": False
            })

    media_normal = base + pessoal
    multiplo_historico = round(bruto / media_normal, 1)

    # Verbas decompostas
    verbas = [
        {"id": f"v1-{rank}", "categoria": "Remuneração Básica", "descricao": "Subsídio / Vencimento Básico do Cargo", "valor": base},
        {"id": f"v2-{rank}", "categoria": "Vantagens Pessoais", "descricao": "Adicional de Tempo de Serviço (ATS) / Quinquênios", "valor": pessoal},
    ]
    if indeniz > 0:
        verbas.append({"id": f"v3-{rank}", "categoria": "Indenizações", "descricao": "Verba Indenizatória (Licença-prêmio convertida em pecúnia e auxílios isentos)", "valor": indeniz})
    if retro > 0:
        verbas.append({"id": f"v4-{rank}", "categoria": "Retroativos", "descricao": "Passivos e Diferenças Administrativas Pretéritas (PAE / ATS atrasados)", "valor": retro})
    if outras > 0:
        verbas.append({"id": f"v5-{rank}", "categoria": "Vantagens Eventuais", "descricao": "Gratificação por Cumulação de Jurisdição / Acervo", "valor": outras})
    
    verbas.append({"id": f"v6-{rank}", "categoria": "Descontos Oficiais", "descricao": "Previdência Oficial (RPPS/RGPS) + IRPF Retido na Fonte", "valor": -descontos_legais})

    slug_id = f"folha-2026-09-{orgao_info['sigla'].lower()}-{rank:03d}"
    hash_audit = hashlib.sha256(f"{slug_id}-{bruto}-{liquido}".encode()).hexdigest()[:16]

    return {
        "id": slug_id,
        "posicaoRanking": rank,
        "cargo": cargo,
        "orgao": orgao_info["nome"],
        "orgaoSigla": orgao_info["sigla"],
        "poder": orgao_info["poder"],
        "esfera": orgao_info["esfera"],
        "uf": orgao_info["uf"],
        "competencia": "Setembro/2026",
        "competenciaCodigo": "2026-09",
        "ano": 2026,
        "mes": 9,
        "valorBruto": bruto,
        "remuneracaoBasica": base,
        "vantagensPessoais": pessoal,
        "vantagensEventuais": outras,
        "indenizacoes": indeniz,
        "retroativos": retro,
        "outrasVerbas": outras,
        "abateTeto": 0.00,
        "previdencia": previdencia,
        "impostoRenda": imposto_renda,
        "descontosLegais": descontos_legais,
        "valorLiquido": liquido,
        "fatorPredominante": fator,
        "isExcepcional": True,
        "multiploMediaHistorica": multiplo_historico,
        "resumoExplicativo": resumo,
        "comparativos": {
            "anosRendaMedia": anos_renda_media,
            "mesesRendaMedia": meses_renda_media,
            "multiploSalarioMinimo": multiplo_minimo,
            "salarioMinimoReferencia": SALARIO_MINIMO,
            "rendaMediaReferencia": RENDA_MEDIA
        },
        "verbas": verbas,
        "historico": historico,
        "fonteOficial": {
            "portalNome": orgao_info["portal"],
            "orgaoExpedidor": orgao_info["nome"],
            "urlOriginal": f"https://transparencia.{orgao_info['sigla'].lower()}.jus.br/folha/2026-09",
            "dataAtualizacao": "2026-10-01T10:00:00Z",
            "hashAuditoria": hash_audit,
            "documentoTipo": "Folha de Pagamento Sintética Individualizada"
        }
    }

records = [generate_record(r) for r in range(1, 101)]

# Estatísticas gerais do lote
estatisticas = {
    "periodoReferencia": "Setembro/2026",
    "maiorPagamento": records[0]["valorBruto"],
    "mediaTop100": round(sum(r["valorBruto"] for r in records) / len(records), 2),
    "medianaTop100": records[49]["valorBruto"],
    "totalOrgaosAnalisados": len(set(r["orgaoSigla"] for r in records)),
    "totalPagamentosAnalisados": 2840912,
    "percentualComRetroativo": round((sum(1 for r in records if r["retroativos"] > 0) / len(records)) * 100, 1),
    "maiorOrgaoOcorrencias": {
        "sigla": "TJSP",
        "nome": "Tribunal de Justiça de São Paulo",
        "quantidade": sum(1 for r in records if r["orgaoSigla"] == "TJSP")
    }
}

output = {
    "estatisticas": estatisticas,
    "registros": records
}

with open("/home/walbarellos/Projects/fora-da-curva/data/seed-top100.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Sucesso: {len(records)} registros gerados em data/seed-top100.json")
