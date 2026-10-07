import Link from 'next/link';
import {
  getEstatisticas,
  getAllPagamentos,
  getServentias,
  getRankingUnificado,
  formatCurrency,
  formatCompactCurrency,
  formatNumber,
} from '@/lib/data';
import ComparadorEscala from '@/components/ComparadorEscala';
import { ArrowUpRight, ArrowRight, ShieldCheck, Layers, BarChart3, Info, FileText } from 'lucide-react';

export default function HomePage() {
  const stats = getEstatisticas();
  const todos = getAllPagamentos();
  const topRecord = todos[0];
  const topFive = todos.slice(0, 5);
  const serv = getServentias();
  const unificado = getRankingUnificado();

  // Totais do ranking unificado (≥ R$ 500 mil)
  const totalUnificado = unificado.reduce((s, r) => s + r.valor, 0);
  const totalFolhaAcima500k = unificado
    .filter((r) => r.tipo === 'Folha pública')
    .reduce((s, r) => s + r.valor, 0);
  const qtdFolhaAcima500k = unificado.filter((r) => r.tipo === 'Folha pública').length;
  const totalServentiasAcima500k = unificado
    .filter((r) => r.tipo === 'Serventia extrajudicial')
    .reduce((s, r) => s + r.valor, 0);
  const qtdServentiasAcima500k = unificado.filter(
    (r) => r.tipo === 'Serventia extrajudicial'
  ).length;

  // Mini-rankings para os dois trilhos
  const topFolha = todos.filter((p) => p.valorBruto >= 500_000).slice(0, 3);
  const topServ = (serv.ranking as Array<{ serventia: string; total: number }>).slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* ─────────────────────────────────────────────
          1. HERO — total agregado acima de R$ 500 mil
          ───────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 border-b border-[var(--border-muted)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-medium)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>
              Competência {stats.periodoReferencia} · Fontes oficiais auditadas
            </span>
          </div>

          <div className="space-y-2">
            <p className="font-label">
              Soma dos pagamentos e arrecadações acima de R$&nbsp;500&nbsp;mil
            </p>
            <h1 className="hero-number text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-high)] tabular-nums tracking-tighter font-mono">
              {formatCurrency(totalUnificado)}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-medium)] max-w-2xl mx-auto leading-relaxed">
              Valores registrados em tribunais, Ministérios Públicos, cartórios e
              demais órgãos analisados no período — folha pública e emolumentos
              de serventias extrajudiciais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/ranking" className="btn-primary w-full sm:w-auto">
              <span>Ranking da folha pública</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/cartorios" className="btn-secondary w-full sm:w-auto">
              <span>Serventias extrajudiciais</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto flex items-start justify-center gap-2 pt-1">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              O total agrega apenas registros ≥ R$&nbsp;500&nbsp;mil. Não representa
              a remuneração mensal típica de qualquer cargo.
            </span>
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          2. COMPARADOR DE ESCALA (imediato)
          ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComparadorEscala
          valorPagamento={topRecord.valorBruto}
          cargoExemplo={topRecord.cargo}
          orgaoExemplo={topRecord.orgaoSigla}
        />
      </section>

      {/* ─────────────────────────────────────────────
          3. DOIS TRILHOS — Folha Pública × Serventias
          ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-high)] tracking-tight">
              Dois circuitos de recursos públicos
            </h2>
            <p className="text-sm text-[var(--text-medium)] mt-1 max-w-2xl">
              A tese editorial: a folha de pagamento e a arrecadação cartorária
              operam em escalas distintas, ambas com concentrações acima de
              R$&nbsp;500&nbsp;mil.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Trilho Folha */}
          <div className="card p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-label">Folha pública</span>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono mt-1">
                  {formatCompactCurrency(totalFolhaAcima500k)}
                </div>
                <p className="text-xs text-[var(--text-medium)] mt-1">
                  {qtdFolhaAcima500k} pagamentos ≥ R$&nbsp;500&nbsp;mil · competência{' '}
                  {stats.periodoReferencia}
                </p>
              </div>
              <Link
                href="/ranking"
                className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 shrink-0"
              >
                Ranking
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <ul className="space-y-2.5 border-t border-[var(--border-muted)] pt-4">
              {topFolha.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/pagamento/${item.id}`}
                    className="flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text-high)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {item.cargo}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] font-mono">
                        {item.orgaoSigla} · {item.fatorPredominante}
                      </p>
                    </div>
                    <span className="text-sm font-mono tabular-nums text-[var(--text-high)] shrink-0">
                      {formatCompactCurrency(item.valorBruto)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trilho Serventias */}
          <div className="card p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-label">Serventias extrajudiciais</span>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono mt-1">
                  {formatCompactCurrency(serv.totalArrecadado)}
                </div>
                <p className="text-xs text-[var(--text-medium)] mt-1">
                  {serv.qtdServentias} serventias · exercício {serv.ano} (jan–ago) ·{' '}
                  {qtdServentiasAcima500k} acima de R$&nbsp;500&nbsp;mil
                </p>
              </div>
              <Link
                href="/cartorios"
                className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 shrink-0"
              >
                Ranking
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <ul className="space-y-2.5 border-t border-[var(--border-muted)] pt-4">
              {topServ.map((item, idx) => (
                <li key={item.serventia} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--text-high)] truncate">
                      {item.serventia}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] font-mono">
                      #{idx + 1} · emolumentos
                    </p>
                  </div>
                  <span className="text-sm font-mono tabular-nums text-[var(--text-high)] shrink-0">
                    {formatCompactCurrency(item.total)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. INDICADORES SINTÉTICOS
          ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="card p-5 space-y-1.5">
            <span className="font-label">Maior pagamento individual</span>
            <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] tabular-nums font-mono">
              {formatCompactCurrency(stats.maiorPagamento)}
            </div>
            <p className="text-[11px] text-[var(--text-medium)]">
              {topRecord.orgaoSigla} · {topRecord.competencia}
            </p>
          </div>

          <div className="card p-5 space-y-1.5">
            <span className="font-label">Média dos 100 maiores</span>
            <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono">
              {formatCompactCurrency(stats.mediaTop100)}
            </div>
            <p className="text-[11px] text-[var(--text-medium)]">Remuneração bruta média</p>
          </div>

          <div className="card p-5 space-y-1.5">
            <span className="font-label">Órgãos analisados</span>
            <div className="text-2xl sm:text-3xl font-bold text-[var(--status-regular)] tabular-nums font-mono">
              {stats.totalOrgaosAnalisados}
            </div>
            <p className="text-[11px] text-[var(--text-medium)]">
              Tribunais, MPs e secretarias
            </p>
          </div>

          <div className="card p-5 space-y-1.5">
            <span className="font-label">Contracheques processados</span>
            <div className="text-2xl sm:text-3xl font-bold text-[var(--text-high)] tabular-nums font-mono">
              {formatNumber(stats.totalPagamentosAnalisados)}
            </div>
            <p className="text-[11px] text-[var(--text-medium)]">Base consolidada</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. TOP 5 CASOS ATÍPICOS
          ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-high)] tracking-tight">
              Cinco casos mais atípicos do período
            </h2>
            <p className="text-sm text-[var(--text-medium)] mt-1">
              Valores impulsionados predominantemente por indenizações e
              quitações pretéritas, não pela remuneração básica recorrente.
            </p>
          </div>
          <Link
            href="/ranking"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            <span>Ver os 100 maiores</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {topFive.map((item) => (
            <Link
              key={item.id}
              href={`/pagamento/${item.id}`}
              className="card hover-lift p-4 flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                  <span>#{item.posicaoRanking}</span>
                  <span className="chip !py-0.5 !px-1.5 !text-[10px]">
                    {item.orgaoSigla}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-[var(--text-high)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                  {item.cargo}
                </h3>
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

      {/* ─────────────────────────────────────────────
          6. COMPROMISSO METODOLÓGICO
          ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-elevated p-7 sm:p-9 space-y-7">
          <div className="max-w-3xl space-y-3">
            <span className="font-label text-[var(--status-regular)]">
              Compromisso institucional
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-high)] tracking-tight">
              Transparência com contexto, não indignação vazia
            </h2>
            <p className="text-sm text-[var(--text-medium)] leading-relaxed">
              O <strong className="text-[var(--text-high)]">Fora da Curva</strong> não
              transforma folhas de pagamento em manchete. Cada registro é
              decomposto em remuneração básica, vantagens, indenizações e
              retroativos; o histórico de 12 meses permite distinguir pico isolado
              de padrão recorrente. As fontes são portais oficiais de transparência,
              com link e data de coleta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-[var(--border-muted)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-high)]">
                <Layers className="w-4 h-4 text-[var(--accent)]" />
                <span>Decomposição de verbas</span>
              </div>
              <p className="text-xs text-[var(--text-medium)] leading-relaxed">
                Cada rubrica é identificada: o que integra a remuneração permanente
                e o que são verbas indenizatórias ou passivos pretéritos.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-high)]">
                <BarChart3 className="w-4 h-4 text-[var(--status-regular)]" />
                <span>Série temporal</span>
              </div>
              <p className="text-xs text-[var(--text-medium)] leading-relaxed">
                Os 12 meses anteriores ao registro permitem avaliar se o valor é
                excepcional ou recorrente.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-high)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span>Fonte auditável</span>
              </div>
              <p className="text-xs text-[var(--text-medium)] leading-relaxed">
                Cada pagamento traz link ao portal de origem, data de coleta e
                referência metodológica.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
            >
              <FileText className="w-4 h-4" />
              <span>Metodologia, fontes e limitações</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
