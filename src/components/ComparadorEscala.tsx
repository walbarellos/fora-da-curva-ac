'use client';

import { useState } from 'react';
import { Clock, Calculator, ArrowRight, UserCheck } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/data';

interface ComparadorEscalaProps {
  valorPagamento: number;
  cargoExemplo?: string;
  orgaoExemplo?: string;
}

export default function ComparadorEscala({
  valorPagamento,
  cargoExemplo = 'Desembargador (TJMT)',
  orgaoExemplo = 'Setembro/2026',
}: ComparadorEscalaProps) {
  const [rendaReferencia, setRendaReferencia] = useState<number>(3200);

  const mesesNecessarios = Math.max(1, Math.round(valorPagamento / rendaReferencia));
  const anosNecessarios = (valorPagamento / (rendaReferencia * 12)).toFixed(1);

  const presets = [
    { label: 'Salário Mínimo', valor: 1518 },
    { label: 'Renda Média Brasil (IBGE)', valor: 3200 },
    { label: 'Renda Média Superior', valor: 7500 },
    { label: 'Teto Constitucional', valor: 44008 },
  ];

  return (
    <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#181D23]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#F5B942] flex items-center gap-1.5 mb-1">
            <Calculator className="w-3.5 h-3.5" />
            Escala Social & Equivalência
          </span>
          <h3 className="text-xl font-bold text-[#F4F5F7]">
            Quanto vale este pagamento?
          </h3>
          <p className="text-sm text-[#A8AFB8] mt-1">
            Comparação direta do valor bruto ({formatCurrency(valorPagamento)}) com a renda real do trabalhador brasileiro.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-mono text-[#6C7480] block">Equivalente a</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F5B942] tabular-nums tracking-tight">
            {anosNecessarios} anos
          </div>
          <span className="text-xs text-[#A8AFB8]">de trabalho contínuo</span>
        </div>
      </div>

      {/* Seletor Interativo de Renda */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-[#A8AFB8] flex items-center justify-between">
          <span>Selecione ou ajuste a renda mensal de comparação:</span>
          <span className="text-sm font-bold text-[#F4F5F7] font-mono">
            {formatCurrency(rendaReferencia)}/mês
          </span>
        </label>

        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setRendaReferencia(preset.valor)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                rendaReferencia === preset.valor
                  ? 'bg-[#F5B942]/15 border-[#F5B942] text-[#F5B942] font-semibold'
                  : 'bg-[#181D23] border-[#232B35] text-[#A8AFB8] hover:text-[#F4F5F7]'
              }`}
            >
              {preset.label} ({formatCurrency(preset.valor)})
            </button>
          ))}
        </div>

        <input
          type="range"
          min="1412"
          max="50000"
          step="200"
          value={rendaReferencia}
          onChange={(e) => setRendaReferencia(Number(e.target.value))}
          className="w-full accent-[#F5B942] bg-[#181D23] h-2 rounded-lg cursor-pointer mt-2"
        />
      </div>

      {/* Visualizador de Barras de Escala */}
      <div className="space-y-4 pt-2">
        <div className="text-xs text-[#A8AFB8] font-mono flex items-center justify-between">
          <span>Comparativo de proporção econômica:</span>
          <span>1 mês de trabalho</span>
        </div>

        <div className="space-y-3">
          {/* Barra Trabalhador Médio */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A8AFB8]">Renda mensal selecionada</span>
              <span className="font-mono text-[#F4F5F7] tabular-nums">{formatCurrency(rendaReferencia)}</span>
            </div>
            <div className="w-full bg-[#181D23] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#58C4A3] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(1, (rendaReferencia / valorPagamento) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Barra Teto Constitucional */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A8AFB8]">Teto Constitucional Nacional (Subsídio STF)</span>
              <span className="font-mono text-[#F4F5F7] tabular-nums">R$ 44.008,52</span>
            </div>
            <div className="w-full bg-[#181D23] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#3B82F6] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (44008.52 / valorPagamento) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Barra do Pagamento Analisado */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#F5B942] font-medium">{cargoExemplo} ({orgaoExemplo})</span>
              <span className="font-mono text-[#F5B942] font-bold tabular-nums">{formatCurrency(valorPagamento)}</span>
            </div>
            <div className="w-full bg-[#181D23] rounded-full h-3 overflow-hidden">
              <div className="bg-[#F5B942] h-full rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Explicação contextual */}
      <div className="p-4 rounded-lg bg-[#181D23]/60 border border-[#232B35] flex items-start space-x-3 text-xs text-[#A8AFB8]">
        <Clock className="w-4 h-4 text-[#F5B942] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Um cidadão que recebe <strong>{formatCurrency(rendaReferencia)}</strong> por mês precisaria trabalhar ininterruptamente por <strong>{mesesNecessarios} meses</strong> (ou <strong>{anosNecessarios} anos</strong>) sem gastar um único centavo para alcançar este único contracheque.
        </p>
      </div>
    </div>
  );
}
