#!/usr/bin/env python3
"""
Conector CNJ/CNMP → seed consolidado.

Como usar:
  1. No Painel de Remuneração dos Magistrados do CNJ
     (https://paineisanalytics.cnj.jus.br/single/?appid=8ccb93ca-848f-4ffe-bf9b-96d57878c4d7&sheet=a710d8e5-fddb-4fa7-9098-4dbca30a391a),
     exporte a folha como CSV (botão "Exportar dados" do gráfico) e salve como:
         data/cnj-remuneracao.csv
     (ou qualquer .csv cujo nome contenha "cnj" ou "cnmp").
  2. Rode:  python3 scripts/ingest_cnj.py
  3. O consolidado sairá em data/consolidado.json.

O mapeador aceita variações de header (PT-BR, com/sem acento).
"""

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
LIMIAR = 500_000.0


def norm(s: str) -> str:
    import unicodedata

    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode()
    return s.strip().lower().replace("_", " ").replace("-", " ")


def to_float(v):
    if v is None:
        return 0.0
    v = str(v).replace(".", "").replace(",", ".").replace("R$", "").strip()
    if not v or v in ("-", "nan", "None"):
        return 0.0
    try:
        return float(v)
    except ValueError:
        return 0.0


def pick(row_norm, *keys):
    for k in keys:
        for col in row_norm:
            if k in col:
                return row_norm[col]
    return None


def load_seed():
    with open(DATA / "seed-top100.json", encoding="utf-8") as f:
        return json.load(f)


def find_cnj_csv():
    cands = sorted(DATA.glob("*.csv"))
    pref = [p for p in cands if any(x in p.name.lower() for x in ("cnj", "cnmp", "painel"))]
    return pref[0] if pref else (cands[0] if cands else None)


def ingest_cnj():
    fpath = find_cnj_csv()
    if not fpath:
        print("⚠️  Nenhum CSV encontrado em data/. Coloque o arquivo exportado do painel CNJ aqui.")
        return []
    print(f"📥 Lendo {fpath.name}…")
    rows = []
    with open(fpath, newline="", encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f, delimiter=";" if ";" in f.read(2048) else ",")
        f.seek(0)
        reader = csv.DictReader(f, delimiter=reader.dialect.delimiter if hasattr(reader, "dialect") else ",")
        for r in reader:
            rn = {norm(k): v for k, v in r.items()}
            valor = to_float(pick(rn, "brut", "total remunera", "valor total", "remuneracao mensal", "remuneracao bruta", "total liquido"))
            if valor <= 0:
                # fallback: soma das colunas monetárias
                valor = sum(to_float(v) for k, v in rn.items() if any(x in k for x in ("r$", "remunera", "subsidio", "indeniza", "retro", "vencimento", "gratific")))
            rows.append({
                "cargo": pick(rn, "cargo", "funcao", "funcao exercida") or "—",
                "orgao": pick(rn, "orgao", "tribunal", "lotacao", "unidade") or "CNJ?",
                "nome": pick(rn, "nome", "servidor", "magistrado") or "—",
                "competencia": pick(rn, "mes", "competencia", "referencia") or "—",
                "valorBruto": round(valor, 2),
            })
    valid = [r for r in rows if r["valorBruto"] > 0]
    print(f"   {len(valid)} linhas válidas de {len(rows)}.")
    return valid


def consolidate(seed, cnj_rows):
    todos = list(seed["registros"])
    for i, r in enumerate(cnj_rows):
        todos.append({
            "id": f"cnj-{i+1:04d}",
            "posicaoRanking": 0,
            "cargo": r["cargo"],
            "orgao": r["orgao"],
            "orgaoSigla": r["orgao"],
            "poder": "Judiciário",
            "esfera": "Federal",
            "uf": "—",
            "competencia": str(r["competencia"]),
            "competenciaCodigo": "—",
            "ano": 2026, "mes": 9,
            "valorBruto": r["valorBruto"],
            "remuneracaoBasica": 0, "vantagensPessoais": 0, "vantagensEventuais": 0,
            "indenizacoes": 0, "retroativos": 0, "outrasVerbas": 0,
            "abateTeto": 0, "previdencia": 0, "impostoRenda": 0, "descontosLegais": 0, "valorLiquido": 0,
            "fatorPredominante": "Acerto / Outros",
            "isExcepcional": r["valorBruto"] > LIMIAR,
            "multiploMediaHistorica": 0,
            "resumoExplicativo": f"Importado do painel CNJ — {r['nome']}",
            "comparativos": {"anosRendaMedia": 0, "mesesRendaMedia": 0, "multiploSalarioMinimo": round(r["valorBruto"]/1621, 1), "salarioMinimoReferencia": 1621, "rendaMediaReferencia": 2450},
            "verbas": [], "historico": [],
            "fonteOficial": {"portalNome": "Painel CNJ", "orgaoExpedidor": "CNJ", "urlOriginal": "https://paineisanalytics.cnj.jus.br", "dataAtualizacao": "2026-09", "hashAuditoria": "—", "documentoTipo": "CSV"},
        })

    # totais
    por_orgao = {}
    for r in todos:
        o = por_orgao.setdefault(r["orgaoSigla"], {"orgao": r["orgao"], "poder": r["poder"], "qtd": 0, "total": 0.0, "acima500k": 0, "totalAcima500k": 0.0})
        o["qtd"] += 1
        o["total"] += r["valorBruto"]
        if r["valorBruto"] > LIMIAR:
            o["acima500k"] += 1
            o["totalAcima500k"] += r["valorBruto"]

    orgs = sorted(por_orgao.values(), key=lambda x: -x["total"])
    return {
        "periodoReferencia": seed["estatisticas"]["periodoReferencia"],
        "totalOrgaos": len(orgs),
        "totalPagamentos": sum(o["qtd"] for o in orgs),
        "totalGeral": round(sum(o["total"] for o in orgs), 2),
        "totalAcima500k": round(sum(o["totalAcima500k"] for o in orgs), 2),
        "pagamentosAcima500k": sum(o["acima500k"] for o in orgs),
        "porOrgao": [{**o, "total": round(o["total"], 2), "totalAcima500k": round(o["totalAcima500k"], 2)} for o in orgs],
        "registros": todos,
    }


if __name__ == "__main__":
    seed = load_seed()
    cnj = ingest_cnj()
    out = consolidate(seed, cnj)
    dest = DATA / "consolidado.json"
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"✅ Consolidado gravado em {dest}")
    print(f"   Órgãos: {out['totalOrgaos']} | Pagamentos: {out['totalPagamentos']}")
    print(f"   Total geral: R$ {out['totalGeral']:,.2f}")
    print(f"   Acima de R$ 500k: R$ {out['totalAcima500k']:,.2f} ({out['pagamentosAcima500k']} pagamentos)")
