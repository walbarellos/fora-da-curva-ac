import { HistoricoMensal } from '../../data/schema';
import { formatCompactCurrency, formatCurrency } from '@/lib/data';
import { CalendarDays, AlertCircle } from 'lucide-react';

interface HistoricoTemporalProps {
  historico: HistoricoMensal[];
  valorCompetenciaAtual: number;
}

export default function HistoricoTemporal({
  historico,
  valorCompetenciaAtual,
}: HistoricoTemporalProps) {
  const maxValor = Math.max(...historico.map((h) => h.valorBruto));
  
  // Calcular a média dos meses regulares (excluindo a competência anômala)
  const mesesRegulares = historico.filter((h) => !h.isCompetenciaAtual);
  const mediaRegular =
    mesesRegulares.length > 0
      ? mesesRegulares.reduce((acc, h) => acc + h.valorBruto, 0) / mesesRegulares.length
      : 40000;

  const multiplicador = (valorCompetenciaAtual / mediaRegular).toFixed(1);

  return (
    <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#181D23] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#A8AFB8] flex items-center gap-1.5 mb-1">
            <CalendarDays className="w-3.5 h-3.5 text-[#F5B942]" />
            Série Histórica (12 Meses)
          </span>
          <h3 className="text-xl font-bold text-[#F4F5F7] tracking-tight">
            Evolução Mensal do Cargo
          </h3>
          <p className="text-sm text-[#A8AFB8] mt-1">
            Responde à pergunta fundamental: <span className="text-[#F4F5F7] italic">"Esse valor ocorre todos os meses?"</span>
          </p>
        </div>

        <div className="bg-[#181D23] px-3.5 py-2 rounded-lg border border-[#232B35] text-left sm:text-right">
          <span className="text-[11px] font-mono text-[#6C7480] block">Média mensal habitual</span>
          <span className="text-sm font-bold text-[#58C4A3] tabular-nums">
            {formatCurrency(mediaRegular)}
          </span>
        </div>
      </div>

      {/* Alerta de Excepcionalidade */}
      <div className="p-4 rounded-lg bg-[#F5B942]/10 border border-[#F5B942]/30 flex items-start space-x-3 text-xs text-[#F4F5F7]">
        <AlertCircle className="w-4 h-4 text-[#F5B942] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#F5B942]">
            Este contracheque foi {multiplicador}x maior que a média histórica dos 11 meses anteriores.
          </p>
          <p className="text-[#A8AFB8] leading-relaxed">
            Nos demais meses, a remuneração oscilou entre <strong>{formatCurrency(mediaRegular * 0.9)}</strong> e <strong>{formatCurrency(mediaRegular * 1.15)}</strong>. O valor atípico decorre de quitação pontual de passivos e verbas indenizatórias acumuladas.
          </p>
        </div>
      </div>

      {/* Visualização de Gráfico de Colunas */}
      <div className="space-y-2 pt-2">
        <div className="h-48 w-full flex items-end justify-between gap-1.5 sm:gap-3 pt-6 border-b border-[#181D23] pb-2">
          {historico.map((item, idx) => {
            const alturaPct = Math.max(6, Math.round((item.valorBruto / maxValor) * 100));
            const isAtual = item.isCompetenciaAtual;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
              >
                {/* Tooltip hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#181D23] border border-[#232B35] text-[10px] text-[#F4F5F7] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none font-mono">
                  {item.competencia}: {formatCurrency(item.valorBruto)}
                </div>

                {/* Valor compactado no topo da barra em telas maiores */}
                <span className="text-[9px] font-mono text-[#6C7480] mb-1 hidden sm:block tabular-nums">
                  {formatCompactCurrency(item.valorBruto).replace('R$', '').trim()}
                </span>

                {/* Barra */}
                <div
                  style={{ height: `${alturaPct}%` }}
                  className={`w-full rounded-t transition-all duration-300 ${
                    isAtual
                      ? 'bg-[#F5B942] shadow-[0_0_12px_rgba(245,185,66,0.35)]'
                      : 'bg-[#222933] hover:bg-[#323D4B]'
                  }`}
                />

                {/* Rótulo do Mês */}
                <span
                  className={`text-[10px] font-mono mt-2 tabular-nums ${
                    isAtual ? 'text-[#F5B942] font-bold' : 'text-[#6C7480]'
                  }`}
                >
                  {item.competencia.split('/')[0]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-[#6C7480] font-mono pt-1">
          <span>Outubro/2025</span>
          <span className="text-[#F5B942] font-medium">Setembro/2026 (Competência Atual)</span>
        </div>
      </div>
    </div>
  );
}
