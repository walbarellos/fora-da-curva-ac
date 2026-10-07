import { getAllPagamentos, getEstatisticas } from '@/lib/data';
import RankingTable from '@/components/RankingTable';
import { ArrowLeft, Filter, Layers, Download } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Ranking dos 100 Maiores Pagamentos — Fora da Curva',
  description: 'Lista completa e auditável dos 100 maiores pagamentos públicos registrados no Brasil no período analisado.',
};

export default function RankingPage() {
  const records = getAllPagamentos();
  const stats = getEstatisticas();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabeçalho Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#181D23]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#6C7480]">
            <Link href="/" className="hover:text-[#F4F5F7] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Início</span>
            </Link>
            <span>/</span>
            <span className="text-[#A8AFB8]">Ranking Geral</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F5F7] tracking-tight">
            Os 100 Maiores Pagamentos
          </h1>
          <p className="text-sm text-[#A8AFB8] max-w-2xl leading-relaxed">
            Todos os pagamentos registrados acima da mediana nacional para a competência de <strong>{stats.periodoReferencia}</strong>. Utilize os filtros para segmentar por poder, órgão ou tipo de verba predominante.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#11151A] border border-[#1B2129] px-4 py-2.5 rounded-lg text-right">
            <span className="text-[11px] font-mono text-[#6C7480] block">Ponto de Corte (100º)</span>
            <span className="text-sm font-bold text-[#F4F5F7] font-mono tabular-nums">
              R$ 195.420,00
            </span>
          </div>
        </div>
      </div>

      {/* Tabela Interativa de Ranking com Filtros */}
      <RankingTable initialRecords={records} />

      {/* Nota Metodológica de Rodapé */}
      <div className="p-4 rounded-lg bg-[#11151A] border border-[#1B2129] text-xs text-[#6C7480] space-y-1 font-mono">
        <p>• Dados brutos extraídos do Painel de Remuneração dos Magistrados (CNJ), Portais de Transparência Estaduais e Federais.</p>
        <p>• Valores incluem remuneração ordinária somada a indenizações e quitações de retroativos legais.</p>
      </div>
    </div>
  );
}
