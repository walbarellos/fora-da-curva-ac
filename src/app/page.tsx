import Link from 'next/link';
import { getEstatisticas, getAllPagamentos, formatCurrency, formatCompactCurrency } from '@/lib/data';
import ComparadorEscala from '@/components/ComparadorEscala';
import { ArrowUpRight, Scale, ShieldCheck, ArrowRight, BookOpen, Layers, BarChart3, Info } from 'lucide-react';

export default function HomePage() {
  const stats = getEstatisticas();
  const todos = getAllPagamentos();
  const topRecord = todos[0];
  const topFive = todos.slice(0, 5);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION DRAMÁTICO & SÓBRIO */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-[#181D23]">
        <div className="absolute inset-0 bg-radial-at-t from-[#181D23]/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181D23] border border-[#232B35] text-xs font-mono text-[#A8AFB8]">
            <span className="w-2 h-2 rounded-full bg-[#F5B942]"></span>
            <span>Folhas analisadas: Competência {stats.periodoReferencia}</span>
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#6C7480] font-mono block">
              Maior pagamento individual registrado no período
            </span>

            {/* Número dramático tabular gigante */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#F4F5F7] tabular-nums tracking-tighter">
              {formatCurrency(stats.maiorPagamento)}
            </h1>

            <p className="text-base sm:text-lg text-[#A8AFB8] font-medium max-w-2xl mx-auto pt-2">
              {topRecord.cargo} · {topRecord.orgao} ({topRecord.orgaoSigla})
            </p>
            
            <p className="text-xs font-mono text-[#6C7480]">
              Inclui {formatCurrency(topRecord.retroativos + topRecord.indenizacoes)} em verbas indenizatórias e retroativos pretéritos
            </p>
          </div>

          {/* CTAs Soberbos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/ranking"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-[#F5B942] text-[#0B0D10] font-bold text-sm hover:bg-[#e2a937] transition-all shadow-lg shadow-[#F5B942]/10"
            >
              <span>Explorar os Maiores Pagamentos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/pagamento/${topRecord.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-[#181D23] border border-[#232B35] text-[#F4F5F7] font-semibold text-sm hover:bg-[#222933] transition-colors"
            >
              <span>Ver Decomposição deste Registro</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Disclaimer de Rigor */}
          <div className="pt-4 text-xs text-[#6C7480] max-w-xl mx-auto flex items-center justify-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#A8AFB8] shrink-0" />
            <span>Esse valor é excepcional. Não representa o salário mensal típico do cargo.</span>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE ESTATÍSTICAS ("O BRASIL PAGA QUANTO?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F4F5F7] tracking-tight">
              O Brasil Paga Quanto?
            </h2>
            <span className="text-xs font-mono text-[#6C7480]">
              Análise sintética dos casos de fronteira salarial
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono uppercase text-[#6C7480] block">
                Maior Pagamento
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5B942] tabular-nums font-mono">
                {formatCompactCurrency(stats.maiorPagamento)}
              </div>
              <p className="text-[11px] text-[#A8AFB8]">{topRecord.orgaoSigla} · {topRecord.competencia}</p>
            </div>

            <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono uppercase text-[#6C7480] block">
                Média dos 100 Maiores
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F5F7] tabular-nums font-mono">
                {formatCompactCurrency(stats.mediaTop100)}
              </div>
              <p className="text-[11px] text-[#A8AFB8]">Remuneração bruta média</p>
            </div>

            <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono uppercase text-[#6C7480] block">
                Órgãos Representados
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#58C4A3] tabular-nums font-mono">
                {stats.totalOrgaosAnalisados}
              </div>
              <p className="text-[11px] text-[#A8AFB8]">Tribunais, MPs e Secretarias</p>
            </div>

            <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-5 space-y-1">
              <span className="text-xs font-mono uppercase text-[#6C7480] block">
                Folhas Coletadas
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F5F7] tabular-nums font-mono">
                2,8 mi
              </div>
              <p className="text-[11px] text-[#A8AFB8]">Contracheques processados</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARADOR DE ESCALA SOCIAL INTERATIVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComparadorEscala
          valorPagamento={stats.maiorPagamento}
          cargoExemplo={topRecord.cargo}
          orgaoExemplo={topRecord.orgaoSigla}
        />
      </section>

      {/* 4. PREVIEW DO TOP 5 CASOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#F4F5F7] tracking-tight">
              Os 5 Casos Mais Atípicos do Mês
            </h3>
            <p className="text-sm text-[#A8AFB8] mt-0.5">
              Valores impulsionados majoritariamente por indenizações e quitações pretéritas.
            </p>
          </div>
          <Link
            href="/ranking"
            className="text-xs font-semibold text-[#F5B942] hover:underline inline-flex items-center gap-1"
          >
            <span>Ver todos os 100</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topFive.map((item) => (
            <Link
              key={item.id}
              href={`/pagamento/${item.id}`}
              className="bg-[#11151A] border border-[#1B2129] hover:border-[#F5B942]/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#6C7480] mb-2">
                  <span>#{item.posicaoRanking}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#181D23] text-[#A8AFB8] text-[10px]">
                    {item.orgaoSigla}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#F4F5F7] group-hover:text-[#F5B942] transition-colors line-clamp-1">
                  {item.cargo}
                </h4>
                <p className="text-[11px] text-[#A8AFB8] mt-0.5">{item.uf} · {item.poder}</p>
              </div>

              <div className="pt-2 border-t border-[#181D23]">
                <div className="text-sm font-extrabold text-[#F4F5F7] tabular-nums font-mono">
                  {formatCurrency(item.valorBruto)}
                </div>
                <span className="text-[10px] font-mono text-[#F5B942]">
                  {item.fatorPredominante}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. PRINCÍPIO EDITORIAL & RIGOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58C4A3]">
              Compromisso Institucional
            </span>
            <h3 className="text-2xl font-bold text-[#F4F5F7]">
              Transparência pública com contexto, e não indignação vazia.
            </h3>
            <p className="text-sm text-[#A8AFB8] leading-relaxed">
              O objetivo do <strong>Fora da Curva</strong> não é transformar o portal em linchamento público ou simplificar folhas complexas com manchetes distorcidas. O foco central é mostrar por que aquele montante foi atingido: remuneração básica dentro do teto, com adições de indenizações legais e passivos retroativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#181D23]">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#F4F5F7]">
                <Layers className="w-4 h-4 text-[#F5B942]" />
                <span>Decomposição Real</span>
              </div>
              <p className="text-xs text-[#A8AFB8] leading-relaxed">
                Mostramos cada rubrica detalhadamente: o que é salário permanente e o que são indenizações e retroativos eventuais.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#F4F5F7]">
                <BarChart3 className="w-4 h-4 text-[#58C4A3]" />
                <span>Histórico Temporal</span>
              </div>
              <p className="text-xs text-[#A8AFB8] leading-relaxed">
                Exibimos os 12 meses anteriores para responder se o servidor realmente recebe aquele valor todo mês ou se foi um pico isolado.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#F4F5F7]">
                <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                <span>Fonte Auditável</span>
              </div>
              <p className="text-xs text-[#A8AFB8] leading-relaxed">
                Cada registro possui link para o portal de transparência oficial de origem, data de coleta e hash de integridade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
