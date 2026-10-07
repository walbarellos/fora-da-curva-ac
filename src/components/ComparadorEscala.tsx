'use client';

import { useState } from 'react';
import { Clock, Calculator } from 'lucide-react';
import { formatCurrency } from '@/lib/data';

interface ComparadorEscalaProps {
  valorPagamento: number;
  cargoExemplo?: string;
  orgaoExemplo?: string;
}

export default function ComparadorEscala({
  valorPagamento,
  cargoExemplo = 'Desembargador (TJAC)',
  orgaoExemplo = 'Rio Branco · AC',
}: ComparadorEscalaProps) {
  const [rendaReferencia, setRendaReferencia] = useState<number>(2450);

  const mesesNecessarios = Math.max(1, Math.round(valorPagamento / rendaReferencia));
  const anosNecessarios = (valorPagamento / (rendaReferencia * 12)).toFixed(1);

  const presets = [
    { label: 'Renda Média Acre (IBGE)', valor: 2450 },
    { label: 'Salário Mínimo (2026 - PLDO)', valor: 1621 },
    { label: 'Renda Média Brasil (IBGE)', valor: 3200 },
    { label: 'Teto Constitucional STF', valor: 44008 },
  ];

  return (
    <div className="card-elevated p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-muted)]">
        <div>
          <span className="font-label text-[var(--accent)] flex items-center gap-1.5 mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Escala Social & Equivalência
          </span>
          <h3 className="text-xl font-bold text-[var(--text-high)] tracking-tight">
            Quanto vale este pagamento?
          </h3>
          <p className="text-sm text-[var(--text-medium)] mt-1">
            Comparação direta do valor bruto ({formatCurrency(valorPagamento)}) com a renda real
            do trabalhador brasileiro.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-mono text-[var(--text-muted)] block">Equivalente a</span>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] tabular-nums tracking-tight font-mono">
            {anosNecessarios} anos
          </div>
          <span className="text-xs text-[var(--text-medium)]">de trabalho contínuo</span>
        </div>
      </div>

      {/* Seletor de renda */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-[var(--text-medium)] flex items-center justify-between">
          <span>Selecione ou ajuste a renda mensal de comparação:</span>
          <span className="text-sm font-bold text-[var(--text-high)] font-mono tabular-nums">
            {formatCurrency(rendaReferencia)}/mês
          </span>
        </label>

        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setRendaReferencia(preset.valor)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                rendaReferencia === preset.valor
                  ? 'chip-active font-semibold'
                  : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-medium)] hover:text-[var(--text-high)] hover:border-[var(--border-strong)]'
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
          className="w-full accent-[var(--accent)] bg-[var(--bg-subtle)] h-2 rounded-lg cursor-pointer mt-2"
          aria-label="Ajustar renda de referência"
        />
      </div>

      {/* Barras de escala */}
      <div className="space-y-4 pt-2">
        <div className="text-xs text-[var(--text-medium)] font-mono flex items-center justify-between">
          <span>Comparativo de proporção econômica</span>
          <span>1 mês de trabalho</span>
        </div>

        <div className="space-y-3.5">
          {/* Renda selecionada */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[var(--text-medium)]">Renda mensal selecionada</span>
              <span className="font-mono text-[var(--text-high)] tabular-nums">
                {formatCurrency(rendaReferencia)}
              </span>
            </div>
            <div className="bar-track h-2.5">
              <div
                className="bar-fill bar-fill-basic"
                style={{
                  width: `${Math.max(1.5, (rendaReferencia / valorPagamento) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Teto */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[var(--text-medium)]">
                Teto Constitucional Nacional (Subsídio STF)
              </span>
              <span className="font-mono text-[var(--text-high)] tabular-nums">R$ 44.008,52</span>
            </div>
            <div className="bar-track h-2.5">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.min(100, (44008.52 / valorPagamento) * 100)}%`,
                  backgroundColor: 'var(--status-neutral)',
                }}
              />
            </div>
          </div>

          {/* Pagamento analisado */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[var(--accent)] font-medium">
                {cargoExemplo} ({orgaoExemplo})
              </span>
              <span className="font-mono text-[var(--accent)] font-bold tabular-nums">
                {formatCurrency(valorPagamento)}
              </span>
            </div>
            <div className="bar-track h-2.5">
              <div className="bar-fill bar-fill-indenizacao w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Contexto */}
      <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex items-start gap-3 text-xs text-[var(--text-medium)]">
        <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Um cidadão que recebe <strong className="text-[var(--text-high)]">{formatCurrency(rendaReferencia)}</strong>{' '}
          por mês precisaria trabalhar ininterruptamente por{' '}
          <strong className="text-[var(--text-high)]">{mesesNecessarios} meses</strong> (ou{' '}
          <strong className="text-[var(--text-high)]">{anosNecessarios} anos</strong>) sem gastar
          um único centavo para alcançar este único contracheque.
        </p>
      </div>
    </div>
  );
}
