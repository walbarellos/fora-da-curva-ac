import Link from 'next/link';
import { ArrowLeft, BookOpen, Scale, HelpCircle, Layers, CheckCircle2, ShieldAlert, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Metodologia e Critérios Técnicos — Fora da Curva',
  description: 'Entenda como os dados de transparência são coletados, normalizados, validados e classificados na plataforma Fora da Curva.',
};

export default function MetodologiaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Cabeçalho */}
      <div className="space-y-3 border-b border-[#181D23] pb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#A8AFB8] hover:text-[#F4F5F7] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à página inicial</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F5F7] tracking-tight">
          Metodologia e Critérios de Análise
        </h1>
        <p className="text-base text-[#A8AFB8] leading-relaxed">
          O <strong>Fora da Curva</strong> é regido pelo princípio de que quanto mais atípico for o número, mais rigorosa e didática deve ser a sua explicação. Abaixo detalhamos as fontes, critérios de cálculo e limitações dos dados.
        </p>
      </div>

      {/* 1. O Princípio Editorial */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#F4F5F7] flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#F5B942]" />
          1. O Princípio Editorial: Mostrar o Dado, Não Pegar Servidor
        </h2>
        <div className="text-sm text-[#A8AFB8] space-y-3 leading-relaxed">
          <p>
            Remunerações excepcionais que ultrapassam centenas de milhares de reais não ocorrem por mero arbítrio, mas quase invariavelmente por acúmulo de verbas indenizatórias ou decisões financeiras com efeito retroativo.
          </p>
          <p>
            Afirmar sumariamente que <em>"um juiz ganha R$ 1 milhão por mês"</em> é factualmente incorreto se esse valor resultou de passivos de anos anteriores quitados em uma única competência. Por isso, nossa plataforma sempre apresenta a <strong>composição da verba</strong> e a <strong>série temporal histórica</strong>.
          </p>
        </div>
      </section>

      {/* 2. Dicionário de Conceitos e Rubricas */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#F4F5F7] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#58C4A3]" />
          2. Dicionário de Conceitos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#11151A] border border-[#1B2129] space-y-2">
            <h3 className="text-sm font-semibold text-[#F4F5F7]">Remuneração Básica (Subsídio)</h3>
            <p className="text-xs text-[#A8AFB8] leading-relaxed">
              O vencimento fixo mensal do cargo. Para magistrados e membros do Ministério Público, obedece estritamente ao teto constitucional nacional (fixado no subsídio dos Ministros do STF).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#11151A] border border-[#1B2129] space-y-2">
            <h3 className="text-sm font-semibold text-[#E45757]">Verbas Indenizatórias</h3>
            <p className="text-xs text-[#A8AFB8] leading-relaxed">
              Auxílios (alimentação, saúde, moradia, transporte) e a conversão de licenças-prêmio ou férias não usufruídas em dinheiro. <strong>Não sofrem incidência do teto constitucional e não pagam Imposto de Renda.</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#11151A] border border-[#1B2129] space-y-2">
            <h3 className="text-sm font-semibold text-[#F5B942]">Pagamentos Retroativos</h3>
            <p className="text-xs text-[#A8AFB8] leading-relaxed">
              Passivos financeiros decorrentes de decisões judiciais ou resoluções administrativas (ex: diferenças de ATS, Parcela Autônoma de Equivalência — PAE, URV) que foram acumulados durante anos e são pagos em folha extraordinária.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#11151A] border border-[#1B2129] space-y-2">
            <h3 className="text-sm font-semibold text-[#3B82F6]">Remuneração Bruta vs. Líquida</h3>
            <p className="text-xs text-[#A8AFB8] leading-relaxed">
              O <strong>valor bruto</strong> é a soma total de todas as rubricas creditadas. O <strong>valor líquido</strong> é o saldo final que efetivamente entra na conta do beneficiário após o desconto da previdência e do Imposto de Renda.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Fontes de Dados e Coleta */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#F4F5F7] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#3B82F6]" />
          3. Fontes Oficiais e Amparo Legal
        </h2>
        <div className="text-sm text-[#A8AFB8] space-y-3 leading-relaxed">
          <p>
            Os dados compilados pela plataforma são oriundos exclusivamente de repositórios governamentais de dados abertos e portais da transparência mantidos sob mandamento da <strong>Lei nº 12.527/2011 (LAI)</strong> e regulamentações do <strong>Conselho Nacional de Justiça (Resoluções 102/2009 e 215/2015)</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs font-mono text-[#A8AFB8]">
            <li>Painel de Remuneração dos Magistrados do CNJ;</li>
            <li>Portais de Transparência dos Tribunais de Justiça Estaduais (TJs);</li>
            <li>Portais dos Tribunais Regionais Federais (TRFs) e do Trabalho (TRTs);</li>
            <li>Portal da Transparência do Ministério Público da União e Estaduais;</li>
            <li>Portal da Transparência do Poder Executivo Federal (CGU).</li>
          </ul>
        </div>
      </section>

      {/* 4. Limitações Metodológicas */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#F4F5F7] flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#E45757]" />
          4. Limitações dos Dados e Respeito à Privacidade
        </h2>
        <div className="text-sm text-[#A8AFB8] space-y-3 leading-relaxed">
          <p>
            Para resguardar a privacidade e prevenir assédio ou perseguição pessoal, a plataforma prioriza a hierarquia <strong>Cargo → Órgão → Composição da Verba → Histórico</strong>. Não são divulgados números de CPF, fotos ou endereços dos servidores.
          </p>
          <p>
            Caso um tribunal retifique uma folha de pagamento posteriormente, nossos pipelines incorporam a versão atualizada na extração seguinte, mantendo um histórico auditável do arquivo original.
          </p>
        </div>
      </section>

      {/* 5. Autoria & Concepção do Projeto */}
      <section className="space-y-4 pt-6 border-t border-[#181D23]">
        <h2 className="text-xl font-bold text-[#F4F5F7] flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#F5B942]" />
          5. Concepção & Engenharia
        </h2>
        <div className="p-6 rounded-xl bg-[#11151A] border border-[#1B2129] space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F4F5F7]">
              Willian Albarello
            </h3>
            <p className="text-xs font-mono text-[#F5B942]">
              Engenharia & Arquitetura de Software
            </p>
          </div>
          <p className="text-sm text-[#A8AFB8] leading-relaxed">
            Plataforma idealizada e desenvolvida com foco em inteligência cívica, rigor metodológico e visualização acessível de dados públicos.
          </p>
          <div className="p-4 rounded-lg bg-[#181D23] border border-[#232B35] text-xs text-[#A8AFB8] space-y-1">
            <span className="font-semibold text-[#F4F5F7] block">
              Dedicatória e Reconhecimento Especial
            </span>
            <p className="leading-relaxed">
              O projeto nasceu a partir de um diálogo direto com meu primo, que compartilhou o caso das disparidades nas folhas salariais e apontou a ausência de um instrumento que explicasse a realidade por trás dos números. A ele, minha gratidão e honra pela centelha que originou o <strong>Fora da Curva</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
