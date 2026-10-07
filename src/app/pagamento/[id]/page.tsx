import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPagamentos, getPagamentoById, formatCurrency } from '@/lib/data';
import BreakdownVerbas from '@/components/BreakdownVerbas';
import HistoricoTemporal from '@/components/HistoricoTemporal';
import ComparadorEscala from '@/components/ComparadorEscala';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Scale, 
  HelpCircle,
  Building,
  Calendar,
  UserCheck
} from 'lucide-react';

interface PagamentoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const all = getAllPagamentos();
  return all.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PagamentoPageProps) {
  const { id } = await params;
  const p = getPagamentoById(id);
  if (!p) return { title: 'Pagamento Não Encontrado — Fora da Curva' };

  return {
    title: `${formatCurrency(p.valorBruto)} — ${p.cargo} (${p.orgaoSigla}) | Fora da Curva`,
    description: `Detalhamento oficial do pagamento de ${formatCurrency(p.valorBruto)} registrado na folha de ${p.competencia}. Fator preponderante: ${p.fatorPredominante}.`,
  };
}

export default async function PagamentoDetailPage({ params }: PagamentoPageProps) {
  const { id } = await params;
  const pagamento = getPagamentoById(id);

  if (!pagamento) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Navegação Superior */}
      <div className="flex items-center justify-between border-b border-[#181D23] pb-4">
        <Link
          href="/ranking"
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#A8AFB8] hover:text-[#F4F5F7] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao ranking geral</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#6C7480]">
          <span>Posição #{pagamento.posicaoRanking} nos maiores registros</span>
        </div>
      </div>

      {/* HEADER DO PAGAMENTO (IMPACTO IMEDIATO COM RIGOR) */}
      <div className="bg-[#11151A] border border-[#1B2129] rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#181D23] text-xs font-mono font-semibold text-[#F5B942] border border-[#232B35]">
              {pagamento.poder}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#181D23] text-xs font-mono text-[#A8AFB8] border border-[#232B35]">
              {pagamento.esfera} · {pagamento.uf}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6C7480]">
            <Calendar className="w-3.5 h-3.5 text-[#A8AFB8]" />
            <span>Competência: {pagamento.competencia}</span>
          </div>
        </div>

        {/* Cargo e Órgão */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F5F7] tracking-tight">
            {pagamento.cargo}
          </h1>
          <p className="text-base text-[#A8AFB8]">
            {pagamento.orgao} ({pagamento.orgaoSigla})
          </p>
        </div>

        {/* Cifra Monumental */}
        <div className="pt-2 pb-4 border-y border-[#181D23] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#6C7480] uppercase tracking-wider block">
              Valor Bruto Total Registrado
            </span>
            <div className="text-4xl sm:text-6xl font-black text-[#F4F5F7] tabular-nums tracking-tight font-mono">
              {formatCurrency(pagamento.valorBruto)}
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-mono text-[#6C7480] uppercase tracking-wider block">
              Valor Líquido Creditado (após descontos)
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-[#58C4A3] tabular-nums font-mono">
              {formatCurrency(pagamento.valorLiquido)}
            </div>
            <span className="text-[11px] text-[#6C7480] font-mono">
              Retenções legais: -{formatCurrency(pagamento.descontosLegais)}
            </span>
          </div>
        </div>

        {/* AVISO MANDATÓRIO DE CONTEXTUALIZAÇÃO */}
        <div className="p-4 rounded-xl bg-[#181D23] border border-[#232B35] flex items-start space-x-3 text-xs text-[#A8AFB8]">
          <AlertTriangle className="w-4 h-4 text-[#F5B942] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#F4F5F7]">
              Esse valor é excepcional. Não representa o salário mensal típico do cargo.
            </p>
            <p className="leading-relaxed">
              A remuneração ordinária do cargo está fixada em conformidade com os tetos constitucionais. O valor total registrado nesta competência resulta de direitos indenizatórios acumulados e passivos financeiros pretéritos.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO "POR QUE ESTE VALOR É TÃO ALTO?" */}
      <div className="bg-[#11151A] border border-[#1B2129] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#F5B942]">
          <HelpCircle className="w-4 h-4" />
          <span>Diagnóstico Editorial</span>
        </div>
        <h2 className="text-xl font-bold text-[#F4F5F7] tracking-tight">
          Por que este valor é tão alto?
        </h2>
        <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#181D23] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F5B942]/15 text-[#F5B942] font-semibold border border-[#F5B942]/30">
              Fator preponderante: {pagamento.fatorPredominante}
            </span>
          </div>
          <p className="text-sm text-[#F4F5F7] leading-relaxed">
            {pagamento.resumoExplicativo}
          </p>
          <p className="text-xs text-[#A8AFB8] leading-relaxed pt-1">
            O montante de <strong>{formatCurrency(pagamento.retroativos + pagamento.indenizacoes)}</strong> corresponde a <strong>{(((pagamento.retroativos + pagamento.indenizacoes) / pagamento.valorBruto) * 100).toFixed(1)}%</strong> de todo o valor bruto registrado.
          </p>
        </div>
      </div>

      {/* DECOMPOSIÇÃO DETALHADA DAS VERBAS */}
      <BreakdownVerbas
        verbas={pagamento.verbas}
        valorBruto={pagamento.valorBruto}
        remuneracaoBasica={pagamento.remuneracaoBasica}
        vantagensPessoais={pagamento.vantagensPessoais}
        indenizacoes={pagamento.indenizacoes}
        retroativos={pagamento.retroativos}
        outrasVerbas={pagamento.outrasVerbas}
        descontosLegais={pagamento.descontosLegais}
        valorLiquido={pagamento.valorLiquido}
      />

      {/* HISTÓRICO TEMPORAL DE 12 MESES */}
      <HistoricoTemporal
        historico={pagamento.historico}
        valorCompetenciaAtual={pagamento.valorBruto}
      />

      {/* COMPARADOR DE ESCALA SOCIAL */}
      <ComparadorEscala
        valorPagamento={pagamento.valorBruto}
        cargoExemplo={pagamento.cargo}
        orgaoExemplo={pagamento.orgaoSigla}
      />

      {/* AUDITORIA E FONTE OFICIAL */}
      <div className="bg-[#11151A] border border-[#1B2129] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#58C4A3]">
          <ShieldCheck className="w-4 h-4" />
          <span>Auditoria e Fonte Primária</span>
        </div>
        <h3 className="text-lg font-bold text-[#F4F5F7]">
          Dados Oficiais de Origem
        </h3>
        <p className="text-xs text-[#A8AFB8]">
          Garantia de conformidade com os dados divulgados pelo órgão no cumprimento da Lei de Acesso à Informação.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-mono">
          <div className="p-3 bg-[#181D23] rounded-lg border border-[#232B35] space-y-1">
            <span className="text-[#6C7480] block text-[11px]">Portal Expedidor:</span>
            <span className="text-[#F4F5F7] font-semibold">{pagamento.fonteOficial.portalNome}</span>
          </div>

          <div className="p-3 bg-[#181D23] rounded-lg border border-[#232B35] space-y-1">
            <span className="text-[#6C7480] block text-[11px]">Última extração realizada:</span>
            <span className="text-[#F4F5F7]">{new Date(pagamento.fonteOficial.dataAtualizacao).toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="p-3 bg-[#181D23] rounded-lg border border-[#232B35] space-y-1">
            <span className="text-[#6C7480] block text-[11px]">Hash SHA-256 de Integridade:</span>
            <span className="text-[#A8AFB8] break-all">{pagamento.fonteOficial.hashAuditoria}</span>
          </div>

          <div className="p-3 bg-[#181D23] rounded-lg border border-[#232B35] flex items-center justify-between">
            <div>
              <span className="text-[#6C7480] block text-[11px]">Acesso ao Portal Oficial:</span>
              <span className="text-[#F5B942]">Ver documento no tribunal</span>
            </div>
            <a
              href={pagamento.fonteOficial.urlOriginal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#222933] text-[#F4F5F7] hover:bg-[#F5B942] hover:text-[#0B0D10] transition-colors"
            >
              <span>Acessar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
