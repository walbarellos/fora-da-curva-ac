import { getServentias, formatCurrency, formatCompactCurrency } from '@/lib/data';
import { ArrowLeft, FileText, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Cartórios & Serventias Extrajudiciais — Fora da Curva',
  description: 'Arrecadação anual das serventias extrajudiciais do Acre, com os valores pagos à casta de agentes notariais.',
};

export default function CartoriosPage() {
  const serv = getServentias();
  const ranking: Array<{ serventia: string; total: number }> = serv.ranking;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2 pb-6 border-b border-[#181D23]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#6C7480]">
          <Link href="/" className="hover:text-[#F4F5F7] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="text-[#A8AFB8]">Cartórios</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F5F7] tracking-tight">
          Serventias Extrajudiciais — Acre
        </h1>
        <p className="text-sm text-[#A8AFB8] max-w-2xl leading-relaxed">
          Arrecadação anual das serventias (emolumentos), fiscalização do{' '}
          <strong>{serv.fonte}</strong>. Valores pagos pelos cidadãos em cada ato cartorário.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="card p-5 space-y-1.5">
          <span className="font-label">Total Arrecadado</span>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] tabular-nums font-mono">
            {formatCompactCurrency(serv.totalArrecadado)}
          </div>
          <p className="text-[11px] text-[var(--text-medium)]">Exercício {serv.ano} (jan–ago)</p>
        </div>
        <div className="card p-5 space-y-1.5">
          <span className="font-label">Serventias</span>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono">
            {serv.qtdServentias}
          </div>
          <p className="text-[11px] text-[var(--text-medium)]">Mapeadas pelo TJAC</p>
        </div>
        <div className="card p-5 space-y-1.5">
          <span className="font-label">Acima de R$ 500 mil</span>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--status-regular)] tabular-nums font-mono">
            {serv.serventiasAcima500k}
          </div>
          <p className="text-[11px] text-[var(--text-medium)]">71% do total arrecadado</p>
        </div>
        <div className="card p-5 space-y-1.5">
          <span className="font-label">Concentração</span>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono">
            {formatCompactCurrency(serv.totalAcima500k)}
          </div>
          <p className="text-[11px] text-[var(--text-medium)]">Nas serventias acima de 500k</p>
        </div>
      </div>

      {/* Ranking */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F4F5F7] tracking-tight">Ranking por Arrecadação</h2>
        <div className="overflow-x-auto rounded-lg border border-[#1B2129]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#11151A] text-left text-[11px] font-mono uppercase tracking-wider text-[#6C7480]">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Serventia</th>
                <th className="px-4 py-3 text-right">Total {serv.ano}</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((r, i) => (
                <tr key={r.serventia} className="border-t border-[#181D23] hover:bg-[#11151A]/60">
                  <td className="px-4 py-2.5 font-mono text-[#6C7480]">{i + 1}</td>
                  <td className="px-4 py-2.5 text-[#F4F5F7] font-medium">{r.serventia}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-[#F4F5F7]">
                    {formatCurrency(r.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-[#11151A] border border-[#1B2129] text-xs text-[#6C7480] space-y-1 font-mono flex gap-2">
        <Info className="w-4 h-4 shrink-0 text-[var(--accent)]" />
        <div>
          <p>• Valores referem-se à arrecadação da serventia, já excluídos os Fundos do Poder Judiciário e sem ressarcimentos por atos gratuitos.</p>
          <p>• Agentes notariais não constam da folha pública: são remunerados por emolumentos pagos pelo cidadão em cada ato.</p>
          <p>• Fonte: <a href={serv.url} target="_blank" className="text-[var(--accent)] hover:underline">GEFEX/TJAC – PDF oficial {serv.ano}</a></p>
        </div>
      </div>
    </div>
  );
}
