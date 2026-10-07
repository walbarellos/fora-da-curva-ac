import Link from 'next/link';
import { getEstatisticas, getAllPagamentos, formatCurrency, formatCompactCurrency } from '@/lib/data';
import ComparadorEscala from '@/components/ComparadorEscala';
import { ArrowUpRight, ShieldCheck, ArrowRight, Layers, BarChart3, Info } from 'lucide-react';

export default function HomePage() {
  const stats = getEstatisticas();
  const todos = getAllPagamentos();
  const topRecord = todos[0];
  const topFive = todos.slice(0, 5);

  return (
    <div className="space-y-20 pb-24">
      {/* 1. HERO */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-[var(--border-muted)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--bg-subtle)_0%,_transparent_60%)] pointer-events-none opacity-60" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          {/* Badge competência */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-medium)] animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>Folhas analisadas · Competência {stats.periodoReferencia}</span>
          </div>

          <div className="space-y-3">
            <span className="font-label block">
              Maior pagamento individual registrado no período
            </span>

            <h1 className="hero-number text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-high)] tabular-nums tracking-tighter font-mono">
              {formatCurrency(stats.maiorPagamento)}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-medium)] font-medium max-w-2xl mx-auto pt-1 animate-fade-up stagger-2">
              {topRecord.cargo} · {topRecord.orgao} ({topRecord.orgaoSigla})
            </p>

            <p className="text-xs font-mono text-[var(--text-muted)] animate-fade-up stagger-3">
              Inclui {formatCurrency(topRecord.retroativos + topRecord.indenizacoes)} em verbas
              indenizatórias e retroativos pretéritos
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 animate-fade-up stagger-4">
            <Link href="/ranking" className="btn-primary w-full sm:w-auto">
              <span>Explorar os Maiores Pagamentos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/pagamento/${topRecord.id}`}
              className="btn-secondary w-full sm:w-auto"
            >
              <span>Ver Decomposição deste Registro</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="pt-2 text-xs text-[var(--text-muted)] max-w-lg mx-auto flex items-center justify-center gap-2 animate-fade-up stagger-5">
            <Info className="w-3.5 h-3.5 text-[var(--text-medium)] shrink-0" />
            <span>
              Esse valor é excepcional. Não representa o salário mensal típico do cargo.
            </span>
          </div>
        </div>
      </section>

      {/* 2. ESTATÍSTICAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-high)] tracking-tight">
              O Brasil Paga Quanto?
            </h2>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Análise sintética dos casos de fronteira salarial
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="card p-5 space-y-1.5 animate-fade-up stagger-1">
              <span className="font-label">Maior Pagamento</span>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] tabular-nums font-mono">
                {formatCompactCurrency(stats.maiorPagamento)}
              </div>
              <p className="text-[11px] text-[var(--text-medium)]">
                {topRecord.orgaoSigla} · {topRecord.competencia}
              </p>
            </div>

            <div className="card p-5 space-y-1.5 animate-fade-up stagger-2">
              <span className="font-label">Média dos 100 Maiores</span>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono">
                {formatCompactCurrency(stats.mediaTop100)}
              </div>
              <p className="text-[11px] text-[var(--text-medium)]">Remuneração bruta média</p>
            </div>

            <div className="card p-5 space-y-1.5 animate-fade-up stagger-3">
              <span className="font-label">Órgãos Representados</span>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--status-regular)] tabular-nums font-mono">
                {stats.totalOrgaosAnalisados}
              </div>
              <p className="text-[11px] text-[var(--text-medium)]">Tribunais, MPs e Secretarias</p>
            </div>

            <div className="card p-5 space-y-1.5 animate-fade-up stagger-4">
              <span className="font-label">Folhas Coletadas</span>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono">
                2,8 mi
              </div>
              <p className="text-[11px] text-[var(--text-medium)]">Contracheques processados</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARADOR DE ESCALA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComparadorEscala
          valorPagamento={stats.maiorPagamento}
          cargoExemplo={topRecord.cargo}
          orgaoExemplo={topRecord.orgaoSigla}
        />
      </section>

      {/* 4. TOP 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-high)] tracking-tight">
              Os 5 Casos Mais Atípicos do Mês
            </h3>
            <p className="text-sm text-[var(--text-medium)] mt-1">
              Valores impulsionados majoritariamente por indenizações e quitações pretéritas.
            </p>
          </div>
          <Link
            href="/ranking"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            <span>Ver todos os 100</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {topFive.map((item, idx) => (
            <Link
              key={item.id}
              href={`/pagamento/${item.id}`}
              className={`card hover-lift p-4 flex flex-col justify-between group space-y-3 animate-fade-up stagger-${idx + 1}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                  <span>#{item.posicaoRanking}</span>
                  <span className="chip !py-0.5 !px-1.5 !text-[10px]">
                    {item.orgaoSigla}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[var(--text-high)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                  {item.cargo}
                </h4>
                <p className="text-[11px] text-[var(--text-medium)] mt-0.5">
                  {item.uf} · {item.poder}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border-muted)]">
                <div className="text-sm font-bold text-[var(--text-high)] tabular-nums font-mono">
                  {formatCurrency(item.valorBruto)}
                </div>
                <span className="text-[10px] font-mono text-[var(--accent)]">
                  {item.fatorPredominante}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. COMPROMISSO EDITORIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-elevated p-7 sm:p-9 space-y-7">
          <div className="max-w-3xl space-y-3">
            <span className="font-label text-[var(--status-regular)]">
              Compromisso Institucional
            </span>
            <h3 className="text-2xl font-bold text-[var(--text-high)] tracking-tight">
              Transparência pública com contexto, e não indignação vazia.
            </h3>
            <p className="text-sm text-[var(--text-medium)] leading-relaxed">
              O objetivo do <strong className="text-[var(--text-high)]">Fora da Curva</strong> não
              é transformar o portal em linchamento público ou simplificar folhas complexas com
              manchetes distorcidas. O foco central é mostrar por que aquele montante foi atingido:
              remuneração básica dentro do teto, com adições de indenizações legais e passivos
              retroativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-[var(--border-muted)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-high)]">
                <Layers className="w-4 h-4 text-[var(--accent)]" />
                <span>Decomposição Real</span>
              </div>
              <p className="text-xs text-[var(--text-medium)] leading-relaxed">
                Mostramos cada rubrica detalhadamente: o que é salário permanente e o que são
                indenizações e retroativos eventuais.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-high)]">
                <BarChart3 className="w-4 h-4 text-[var(--status-regular)]" />
                <span>Histórico Temporal</span>
              </div>
              <p className="text-xs text-[var(--text-medium)] leading-relaxed">
                Exibimos os 12 meses anteriores para responder se o servidor realmente recebe aquele
                valor todo mês ou se foi um pico isolado.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-high)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span>Fonte Auditável</span>
              </div>
              <p className="text-xs text-[var(--text-medium)] leading-relaxed">
                Cada registro possui link para o portal de transparência oficial de origem, data de
                coleta e hash de integridade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
