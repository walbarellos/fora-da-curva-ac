import { ItemVerba } from '../../data/schema';
import { formatCurrency } from '@/lib/data';
import { HelpCircle, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface BreakdownVerbasProps {
  verbas: ItemVerba[];
  valorBruto: number;
  remuneracaoBasica: number;
  vantagensPessoais: number;
  indenizacoes: number;
  retroativos: number;
  outrasVerbas: number;
  descontosLegais: number;
  valorLiquido: number;
}

export default function BreakdownVerbas({
  verbas,
  valorBruto,
  remuneracaoBasica,
  vantagensPessoais,
  indenizacoes,
  retroativos,
  outrasVerbas,
  descontosLegais,
  valorLiquido,
}: BreakdownVerbasProps) {
  // Proporções percentuais
  const pctBasica = ((remuneracaoBasica / valorBruto) * 100).toFixed(1);
  const pctPessoais = ((vantagensPessoais / valorBruto) * 100).toFixed(1);
  const pctIndeniz = ((indenizacoes / valorBruto) * 100).toFixed(1);
  const pctRetro = ((retroativos / valorBruto) * 100).toFixed(1);
  const pctOutras = ((outrasVerbas / valorBruto) * 100).toFixed(1);

  return (
    <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#181D23] pb-4">
        <h3 className="text-xl font-bold text-[#F4F5F7] tracking-tight">
          Decomposição das Rubricas
        </h3>
        <p className="text-sm text-[#A8AFB8] mt-1">
          Entenda exatamente de onde veio cada centavo deste pagamento. A distinção entre verbas permanentes e transitórias evita conclusões equivocadas.
        </p>
      </div>

      {/* Barra de Distribuição Proporcional */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#A8AFB8] font-mono">
          <span>Distribuição percentual da folha bruta</span>
          <span>100%</span>
        </div>

        <div className="h-5 w-full bg-[#181D23] rounded-lg overflow-hidden flex">
          {remuneracaoBasica > 0 && (
            <div
              style={{ width: `${pctBasica}%` }}
              title={`Remuneração Básica: ${pctBasica}%`}
              className="bg-[#58C4A3] h-full"
            />
          )}
          {vantagensPessoais > 0 && (
            <div
              style={{ width: `${pctPessoais}%` }}
              title={`Vantagens Pessoais: ${pctPessoais}%`}
              className="bg-[#3B82F6] h-full"
            />
          )}
          {indenizacoes > 0 && (
            <div
              style={{ width: `${pctIndeniz}%` }}
              title={`Indenizações: ${pctIndeniz}%`}
              className="bg-[#E45757] h-full"
            />
          )}
          {retroativos > 0 && (
            <div
              style={{ width: `${pctRetro}%` }}
              title={`Retroativos: ${pctRetro}%`}
              className="bg-[#F5B942] h-full"
            />
          )}
          {outrasVerbas > 0 && (
            <div
              style={{ width: `${pctOutras}%` }}
              title={`Outras Verbas: ${pctOutras}%`}
              className="bg-[#A855F7] h-full"
            />
          )}
        </div>

        {/* Legenda da barra */}
        <div className="flex flex-wrap gap-4 pt-1 text-xs text-[#A8AFB8]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#58C4A3]"></span>
            Básica ({pctBasica}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span>
            Pessoais ({pctPessoais}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#E45757]"></span>
            Indenizações ({pctIndeniz}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F5B942]"></span>
            Retroativos ({pctRetro}%)
          </span>
        </div>
      </div>

      {/* Tabela Estruturada de Verbas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#1B2129] text-xs font-mono uppercase text-[#6C7480]">
              <th className="py-2.5 px-3">Rubrica / Natureza</th>
              <th className="py-2.5 px-3">Enquadramento Legal</th>
              <th className="py-2.5 px-3 text-right">Valor Registrado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181D23] font-mono text-xs">
            <tr className="hover:bg-[#181D23]/40">
              <td className="py-3 px-3">
                <span className="font-semibold text-[#F4F5F7] block">Remuneração Básica</span>
                <span className="text-[#6C7480] text-[11px]">Subsídio ou vencimento permanente do cargo</span>
              </td>
              <td className="py-3 px-3 text-[#58C4A3]">
                Sujeito ao Teto Constitucional
              </td>
              <td className="py-3 px-3 text-right text-[#F4F5F7] tabular-nums font-bold">
                {formatCurrency(remuneracaoBasica)}
              </td>
            </tr>

            {vantagensPessoais > 0 && (
              <tr className="hover:bg-[#181D23]/40">
                <td className="py-3 px-3">
                  <span className="font-semibold text-[#F4F5F7] block">Vantagens Pessoais</span>
                  <span className="text-[#6C7480] text-[11px]">Adicional de Tempo de Serviço (ATS) e incorporações</span>
                </td>
                <td className="py-3 px-3 text-[#3B82F6]">
                  Sujeito ao Teto Constitucional
                </td>
                <td className="py-3 px-3 text-right text-[#F4F5F7] tabular-nums">
                  {formatCurrency(vantagensPessoais)}
                </td>
              </tr>
            )}

            {indenizacoes > 0 && (
              <tr className="hover:bg-[#181D23]/40 bg-[#E45757]/5">
                <td className="py-3 px-3">
                  <span className="font-semibold text-[#E45757] block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#E45757]" />
                    Verbas Indenizatórias
                  </span>
                  <span className="text-[#A8AFB8] text-[11px]">Conversão de licença-prêmio em pecúnia / auxílios</span>
                </td>
                <td className="py-3 px-3 text-[#E45757]">
                  Isento de Teto e Isento de IRPF
                </td>
                <td className="py-3 px-3 text-right text-[#E45757] tabular-nums font-bold">
                  {formatCurrency(indenizacoes)}
                </td>
              </tr>
            )}

            {retroativos > 0 && (
              <tr className="hover:bg-[#181D23]/40 bg-[#F5B942]/5">
                <td className="py-3 px-3">
                  <span className="font-semibold text-[#F5B942] block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F5B942]" />
                    Pagamentos Retroativos
                  </span>
                  <span className="text-[#A8AFB8] text-[11px]">Passivos pretéritos (PAE / ATS atrasados / URV)</span>
                </td>
                <td className="py-3 px-3 text-[#F5B942]">
                  Decisão Administrativa ou Judicial
                </td>
                <td className="py-3 px-3 text-right text-[#F5B942] tabular-nums font-bold">
                  {formatCurrency(retroativos)}
                </td>
              </tr>
            )}

            {outrasVerbas > 0 && (
              <tr className="hover:bg-[#181D23]/40">
                <td className="py-3 px-3">
                  <span className="font-semibold text-[#F4F5F7] block">Vantagens Eventuais</span>
                  <span className="text-[#6C7480] text-[11px]">Gratificações por cumulação de acervo</span>
                </td>
                <td className="py-3 px-3 text-[#A8AFB8]">
                  Eventual
                </td>
                <td className="py-3 px-3 text-right text-[#F4F5F7] tabular-nums">
                  {formatCurrency(outrasVerbas)}
                </td>
              </tr>
            )}

            {/* Total Bruto */}
            <tr className="bg-[#181D23] font-bold text-sm">
              <td className="py-3 px-3 text-[#F4F5F7]" colSpan={2}>
                Total Remuneração Bruta
              </td>
              <td className="py-3 px-3 text-right text-[#F5B942] tabular-nums">
                {formatCurrency(valorBruto)}
              </td>
            </tr>

            {/* Descontos */}
            <tr className="hover:bg-[#181D23]/40 text-[#6C7480]">
              <td className="py-2.5 px-3" colSpan={2}>
                (-) Descontos Obrigatórios (Previdência Oficial + IRPF Retido)
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums text-[#E45757]">
                -{formatCurrency(descontosLegais)}
              </td>
            </tr>

            {/* Valor Líquido */}
            <tr className="bg-[#11151A] font-bold text-sm border-t-2 border-[#232B35]">
              <td className="py-3 px-3 text-[#58C4A3]" colSpan={2}>
                (=) Valor Líquido Efetivamente Creditado
              </td>
              <td className="py-3 px-3 text-right text-[#58C4A3] tabular-nums">
                {formatCurrency(valorLiquido)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
