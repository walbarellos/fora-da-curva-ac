import { getAllPagamentos, getEstatisticas, formatCurrency } from '@/lib/data';
import RankingTable from '@/components/RankingTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Ranking dos 100 Maiores Pagamentos — Fora da Curva',
  description:
    'Lista completa e auditável dos 100 maiores pagamentos públicos registrados no período analisado.',
};

export default function RankingPage() {
  const records = getAllPagamentos();
  const stats = getEstatisticas();
  const pontoCorte = records[records.length - 1]?.valorBruto ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-muted)]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
            <Link
              href="/"
              className="hover:text-[var(--text-high)] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Início</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-medium)]">Ranking</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-high)] tracking-tight">
            Os 100 maiores pagamentos
          </h1>
          <p className="text-sm text-[var(--text-medium)] max-w-2xl leading-relaxed">
            Pagamentos registrados na competência de{' '}
            <strong className="text-[var(--text-high)]">{stats.periodoReferencia}</strong>.
            Utilize os filtros para segmentar por poder, órgão ou tipo de verba
            predominante.
          </p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-muted)] px-4 py-2.5 rounded-lg text-right">
          <span className="text-[11px] font-mono text-[var(--text-muted)] block">
            Ponto de corte (100º)
          </span>
          <span className="text-sm font-bold text-[var(--text-high)] font-mono tabular-nums">
            {formatCurrency(pontoCorte)}
          </span>
        </div>
      </div>

      {/* Tabela */}
      <RankingTable initialRecords={records} />

      {/* Nota metodológica */}
      <div className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-muted)] text-xs text-[var(--text-muted)] space-y-1 font-mono">
        <p>
          • Dados extraídos do Painel de Remuneração dos Magistrados (CNJ) e dos
          portais de transparência estaduais e federais.
        </p>
        <p>
          • Valores incluem remuneração ordinária somada a indenizações e
          quitações de retroativos legais.
        </p>
      </div>
    </div>
  );
}
