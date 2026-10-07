import Link from 'next/link';
import { Scale, ExternalLink, ShieldCheck, FileCheck2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1B2129] bg-[#0B0D10] text-[#A8AFB8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-[#F5B942]" />
              <span className="text-base font-bold text-[#F4F5F7] tracking-tight">
                FORA DA CURVA
              </span>
            </div>
            <p className="text-sm text-[#A8AFB8] max-w-md leading-relaxed">
              Plataforma cívica e editorial de transparência pública. Transformamos folhas de pagamento burocráticas em dados compreensíveis, sem sensacionalismo e com rigor metodológico.
            </p>
            <div className="text-xs text-[#6C7480] space-y-1">
              <p>• Quanto mais chocante o número, mais rigorosa deve ser a explicação.</p>
              <p>• Dados oficiais obtidos sob a Lei de Acesso à Informação (Lei nº 12.527/2011).</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F4F5F7] mb-3">
              Exploração
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#F5B942] transition-colors">
                  Início (Maior Pagamento)
                </Link>
              </li>
              <li>
                <Link href="/ranking" className="hover:text-[#F5B942] transition-colors">
                  Ranking dos 100 Maiores
                </Link>
              </li>
              <li>
                <Link href="/metodologia" className="hover:text-[#F5B942] transition-colors">
                  Metodologia e Fórmulas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F4F5F7] mb-3">
              Fontes Primárias
            </h4>
            <ul className="space-y-2 text-sm text-[#6C7480]">
              <li className="flex items-center space-x-1.5 hover:text-[#A8AFB8]">
                <span>Painel de Remuneração CNJ</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#A8AFB8]">
                <span>Transparência CNMP</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#A8AFB8]">
                <span>Portais Oficiais de Tribunais</span>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-[#A8AFB8]">
                <span>Portal da Transparência CGU</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bloco Acadêmico de Autoria & Co-autoria */}
        <div className="py-6 border-t border-[#181D23] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#A8AFB8]">
            <span className="font-semibold text-[#F4F5F7]">
              Autoria & Pesquisa:
            </span>
            <span>
              <strong className="text-[#F4F5F7]">Willian Albarello</strong>{' '}
              <a
                href="https://instagram.com/walbarellos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5B942] hover:underline font-mono"
              >
                @walbarellos
              </a>{' '}
              <span className="text-[#6C7480]">(Engenharia & Arquitetura)</span>
            </span>
            <span className="hidden sm:inline text-[#6C7480]">•</span>
            <span>
              <strong className="text-[#F4F5F7]">Wenrrison Nogueira</strong>{' '}
              <a
                href="https://instagram.com/nswenrrisonchris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5B942] hover:underline font-mono"
              >
                @nswenrrisonchris
              </a>{' '}
              <span className="text-[#6C7480]">(Co-autor & Concepção)</span>
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#6C7480]">
            Pesquisa & Engenharia de Dados Abertos
          </div>
        </div>

        <div className="pt-6 border-t border-[#181D23] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6C7480] gap-4">
          <p>© 2026 Fora da Curva. Dados abertos de domínio público para fins de transparência e pesquisa.</p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1">
              <FileCheck2 className="w-3.5 h-3.5 text-[#58C4A3]" /> WCAG 2.2 AA Conforme
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5B942]" /> Auditoria Criptográfica
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
