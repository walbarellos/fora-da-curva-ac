import Link from 'next/link';
import {
  getEstatisticas,
  getAllPagamentos,
  getServentias,
  formatCurrency,
  formatCompactCurrency,
  formatNumber,
} from '@/lib/data';
import { ArrowRight, Info, FileText } from 'lucide-react';

export default function HomePage() {
  const stats = getEstatisticas();
  const todos = getAllPagamentos();
  const topRecord = todos[0];
  const topFive = todos.slice(0, 5);
  const serv = getServentias();
  const topServ = (serv.ranking as Array<{ serventia: string; total: number }>).slice(0, 5);

  const basica = topRecord.remuneracaoBasica;
  const retroativos = topRecord.retroativos;
  const indenizacoes = topRecord.indenizacoes;
  const restanteEventual = topRecord.valorBruto - basica;
  const pctBasica = ((basica / topRecord.valorBruto) * 100).toFixed(1);
  const pctRetro = ((retroativos / topRecord.valorBruto) * 100).toFixed(1);
  const pctInden = ((indenizacoes / topRecord.valorBruto) * 100).toFixed(1);

  const multiploSM =
    topRecord.comparativos?.multiploSalarioMinimo ??
    Math.round(topRecord.valorBruto / 1621);
  const anosRenda =
    topRecord.comparativos?.anosRendaMedia ??
    Number((topRecord.valorBruto / (2450 * 12)).toFixed(1));
  const smRef = topRecord.comparativos?.salarioMinimoReferencia ?? 1621;
  const qtdAC = todos.filter((r) => r.uf === 'AC').length;

  return (
    <div className="pb-20">
      {/* 1. FATO — maior pagamento documentado */}
      <section className="border-b border-[var(--border-muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 space-y-6">
          <p className="text-xs font-mono text-[var(--text-muted)] tracking-wide uppercase">
            Competência {stats.periodoReferencia} · Fonte oficial
          </p>

          <div className="space-y-3">
            <h1 className="text-sm font-medium text-[var(--text-medium)] leading-snug">
              Maior pagamento individual registrado nesta edição
            </h1>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-high)] tabular-nums tracking-tighter font-mono leading-none">
              {formatCurrency(topRecord.valorBruto)}
            </p>
            <p className="text-base text-[var(--text-high)]">
              {topRecord.cargo} · {topRecord.orgao} ({topRecord.orgaoSigla})
            </p>
          </div>

          <div className="border border-[var(--border-muted)] rounded-lg divide-y divide-[var(--border-muted)] text-sm">
            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-[var(--text-medium)]">Remuneração básica (subsídio)</span>
              <span className="font-mono tabular-nums text-[var(--text-high)] shrink-0">
                {formatCurrency(basica)}
                <span className="text-[var(--text-muted)] ml-2 text-xs">{pctBasica}%</span>
              </span>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-[var(--text-medium)]">Retroativos</span>
              <span className="font-mono tabular-nums text-[var(--text-high)] shrink-0">
                {formatCurrency(retroativos)}
                <span className="text-[var(--text-muted)] ml-2 text-xs">{pctRetro}%</span>
              </span>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-[var(--text-medium)]">Indenizações</span>
              <span className="font-mono tabular-nums text-[var(--text-high)] shrink-0">
                {formatCurrency(indenizacoes)}
                <span className="text-[var(--text-muted)] ml-2 text-xs">{pctInden}%</span>
              </span>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3 bg-[var(--bg-subtle)]/50">
              <span className="text-[var(--text-medium)]">
                Após descontos obrigatórios → líquido
              </span>
              <span className="font-mono tabular-nums text-[var(--text-high)] shrink-0">
                {formatCurrency(topRecord.valorLiquido)}
              </span>
            </div>
          </div>

          <p className="text-sm text-[var(--text-medium)] leading-relaxed">
            A remuneração básica do cargo é {formatCurrency(basica)}. O restante —{' '}
            {formatCurrency(restanteEventual)} — corresponde a retroativos e indenizações
            quitados nesta competência, não ao vencimento mensal recorrente.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={`/pagamento/${topRecord.id}`} className="btn-primary">
              <span>Ver decomposição completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ranking" className="btn-secondary">
              <span>Os 100 maiores</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ESCALA */}
      <section className="border-b border-[var(--border-muted)] bg-[var(--bg-elevated)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <h2 className="text-lg font-bold text-[var(--text-high)] tracking-tight">
            Em escala
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-[var(--accent)] tabular-nums font-mono tracking-tight">
                {formatNumber(multiploSM)}
              </p>
              <p className="text-sm text-[var(--text-medium)] leading-relaxed">
                salários mínimos nacionais (R$&nbsp;{formatNumber(smRef)}) cabem neste
                único contracheque.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-[var(--text-high)] tabular-nums font-mono tracking-tight">
                {anosRenda} anos
              </p>
              <p className="text-sm text-[var(--text-medium)] leading-relaxed">
                de renda média no Acre (R$&nbsp;2.450/mês) seriam necessários para
                igualar o mesmo valor — sem gastar nada.
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-medium)] leading-relaxed border-l-2 border-[var(--border-strong)] pl-4">
            Enquanto isso, milhões de brasileiros dependem de um salário mínimo para
            moradia, alimentação, saúde e educação. O contraste não é opinião: é
            aritmética sobre dados oficiais de transparência.
          </p>
        </div>
      </section>

      {/* 3. ESCOPO */}
      <section className="border-b border-[var(--border-muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-3 text-sm text-[var(--text-medium)] leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[var(--text-muted)]" />
            <div className="space-y-2">
              <p>
                <strong className="text-[var(--text-high)]">Escopo desta edição.</strong>{' '}
                A folha reúne os 100 maiores pagamentos identificados em órgãos
                selecionados (competência {stats.periodoReferencia}). O Acre está
                sobrerrepresentado na amostra ({qtdAC} dos {todos.length} registros).
                Não é o total nacional do setor público.
              </p>
              <p>
                As serventias extrajudiciais cobrem as {serv.qtdServentias} unidades do
                Acre (emolumentos, jan–ago/{serv.ano}), fiscalizadas pelo TJAC. Cartórios
                não integram a folha de servidores: a arrecadação vem do cidadão, ato a ato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVENTIAS */}
      <section className="border-b border-[var(--border-muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[var(--text-high)] tracking-tight">
              Serventias extrajudiciais — Acre
            </h2>
            <p className="text-sm text-[var(--text-medium)] leading-relaxed">
              Em oito meses de {serv.ano}, as {serv.qtdServentias} serventias do estado
              arrecadaram{' '}
              <strong className="text-[var(--text-high)] tabular-nums">
                {formatCurrency(serv.totalArrecadado)}
              </strong>{' '}
              em emolumentos. {serv.serventiasAcima500k} delas ultrapassaram R$&nbsp;500&nbsp;mil.
            </p>
          </div>

          <ol className="border border-[var(--border-muted)] rounded-lg divide-y divide-[var(--border-muted)]">
            {topServ.map((item, idx) => (
              <li
                key={item.serventia}
                className="flex items-baseline justify-between gap-4 px-4 py-3 text-sm"
              >
                <span className="text-[var(--text-muted)] font-mono text-xs w-5 shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[var(--text-high)] flex-1 min-w-0 truncate">
                  {item.serventia}
                </span>
                <span className="font-mono tabular-nums text-[var(--text-high)] shrink-0">
                  {formatCurrency(item.total)}
                </span>
              </li>
            ))}
          </ol>

          <Link
            href="/cartorios"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Ranking completo das {serv.qtdServentias} serventias
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. CINCO CASOS DA FOLHA */}
      <section className="border-b border-[var(--border-muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[var(--text-high)] tracking-tight">
              Cinco maiores da folha nesta competência
            </h2>
            <p className="text-sm text-[var(--text-medium)]">
              Valores brutos. O fator predominante indica a rubrica que mais pesou
              no total.
            </p>
          </div>

          <ol className="border border-[var(--border-muted)] rounded-lg divide-y divide-[var(--border-muted)]">
            {topFive.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/pagamento/${item.id}`}
                  className="flex items-baseline justify-between gap-4 px-4 py-3 text-sm group hover:bg-[var(--bg-subtle)]/40 transition-colors"
                >
                  <span className="text-[var(--text-muted)] font-mono text-xs w-5 shrink-0">
                    {item.posicaoRanking}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="text-[var(--text-high)] group-hover:text-[var(--accent)] transition-colors">
                      {item.cargo}
                    </span>
                    <span className="text-[var(--text-muted)] text-xs font-mono ml-2">
                      {item.orgaoSigla} · {item.fatorPredominante}
                    </span>
                  </span>
                  <span className="font-mono tabular-nums text-[var(--text-high)] shrink-0">
                    {formatCurrency(item.valorBruto)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <Link
            href="/ranking"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Ver os 100 maiores pagamentos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. INDICADORES + MÉTODO */}
      <section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <p className="text-xl font-bold tabular-nums font-mono text-[var(--text-high)]">
                {formatCompactCurrency(stats.mediaTop100)}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Média dos 100 maiores</p>
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums font-mono text-[var(--text-high)]">
                {stats.totalOrgaosAnalisados}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Órgãos nesta amostra</p>
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums font-mono text-[var(--text-high)]">
                {formatNumber(stats.totalPagamentosAnalisados)}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Contracheques processados</p>
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums font-mono text-[var(--text-high)]">
                {serv.qtdServentias}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Serventias (AC)</p>
            </div>
          </div>

          <div className="border-t border-[var(--border-muted)] pt-8 space-y-3">
            <p className="text-sm text-[var(--text-medium)] leading-relaxed">
              Cada registro decompõe remuneração básica, vantagens, indenizações e
              retroativos; a série de 12 meses mostra se o valor é pico ou padrão.
              Fontes: portais oficiais de transparência e LAI.
            </p>
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
            >
              <FileText className="w-4 h-4" />
              Metodologia, fontes e limitações
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
