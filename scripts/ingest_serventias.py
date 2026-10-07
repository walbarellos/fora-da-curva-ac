#!/usr/bin/env python3
"""Extrai arrecadação de serventias extrajudiciais (TJAC) e injeta no consolidado."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TXT = Path("/tmp/cartorios_2026.txt")
LIMIAR = 500_000.0

NUM = re.compile(r"\d{1,3}(?:\.\d{3})*,\d{2}")

rows = []
pending_name = ""
# Linhas de cabeçalho (topo do documento). A legenda de siglas vem depois de
# "TOTALIZADOR GERAL" e é descartada pelo break abaixo.
HEADER = ("TRIBUNAL", "CORREGEDORIA", "JUSTIÇA", "ARRECADAÇÃO", "SERVENTIA")

for raw in TXT.read_text(encoding="utf-8", errors="replace").splitlines():
    line = raw.strip()
    if not line:
        continue
    if "TOTALIZADOR" in line:
        break
    nums = NUM.findall(line)
    if not nums:
        # Cabeçalho do documento ou nome de serventia quebrado em duas linhas.
        # Acumula até encontrar a linha que traz os valores.
        if any(k in line for k in HEADER):
            continue
        if pending_name:
            pending_name += " " + line
        else:
            pending_name = line
        continue
    first_num_idx = line.index(nums[0])
    name = line[:first_num_idx].strip()
    if pending_name:
        name = (pending_name + " " + name).strip()
        pending_name = ""
    if not name or name in ("TOTAL",):
        continue
    try:
        total = float(nums[-1].replace(".", "").replace(",", "."))
    except ValueError:
        continue
    # ignora linhas de meses individuais soltas
    if total < 1000:
        continue
    rows.append({"serventia": re.sub(r"\s+", " ", name), "total": round(total, 2)})

rows.sort(key=lambda r: -r["total"])
total_geral = round(sum(r["total"] for r in rows), 2)

bloco = {
    "fonte": "TJAC/GEFEX – Arrecadação das Serventias Extrajudiciais (Emolumentos), Exercício 2026 (jan–ago)",
    "url": "https://www.tjac.jus.br/wp-content/uploads/2026/09/Arrecadao-das-Serventias-Extrajudiciais-08.26.pdf",
    "ano": 2026,
    "qtdServentias": len(rows),
    "totalArrecadado": total_geral,
    "serventiasAcima500k": sum(1 for r in rows if r["total"] > LIMIAR),
    "totalAcima500k": round(sum(r["total"] for r in rows if r["total"] > LIMIAR), 2),
    "ranking": rows,
}

out = ROOT / "data" / "consolidado.json"
data = json.loads(out.read_text(encoding="utf-8"))
data["serventiasExtrajudiciais"] = bloco
out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"{len(rows)} serventias | total R$ {total_geral:,.2f}")
print(f"acima de 500k: {bloco['serventiasAcima500k']} serventias, R$ {bloco['totalAcima500k']:,.2f}")
for r in rows[:10]:
    print(f"  {r['serventia'][:55]:55} R$ {r['total']:>15,.2f}")
