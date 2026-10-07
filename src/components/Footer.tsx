import Link from 'next/link';
import { Scale, ExternalLink, ShieldCheck, FileCheck2, BookOpen, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-muted)] bg-[var(--bg-page)] text-[var(--text-medium)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Identidade + princípio */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center">
                <Scale className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <span className="text-base font-bold text-[var(--text-high)] tracking-tight block leading-none">
                  FORA DA CURVA
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Transparência Pública
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-medium)] leading-relaxed max-w-md">
              Plataforma cívica e editorial de transparência pública. Transformamos folhas de pagamento
              burocráticas em dados compreensíveis, sem sensacionalismo e com rigor metodológico.
            </p>

            <div className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <p className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-0.5">•</span>
                Quanto mais chocante o número, mais rigorosa deve ser a explicação.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-0.5">•</span>
                Dados oficiais obtidos sob a Lei de Acesso à Informação (Lei nº 12.527/2011).
              </p>
            </div>
          </div>

          {/* Navegação */}
          <div className="md:col-span-2">
            <h4 className="font-label mb-4 text-[var(--text-high)]">Exploração</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[var(--text-medium)] hover:text-[var(--accent)] transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/ranking"
                  className="text-[var(--text-medium)] hover:text-[var(--accent)] transition-colors"
                >
                  Ranking dos 100
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologia"
                  className="text-[var(--text-medium)] hover:text-[var(--accent)] transition-colors"
                >
                  Metodologia
                </Link>
              </li>
            </ul>
          </div>

          {/* Fontes */}
          <div className="md:col-span-2">
            <h4 className="font-label mb-4 text-[var(--text-high)]">Fontes Primárias</h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
              <li className="hover:text-[var(--text-medium)] transition-colors">Painel CNJ</li>
              <li className="hover:text-[var(--text-medium)] transition-colors">Transparência CNMP</li>
              <li className="hover:text-[var(--text-medium)] transition-colors">Tribunais Oficiais</li>
              <li className="hover:text-[var(--text-medium)] transition-colors">Portal CGU</li>
            </ul>
          </div>

          {/* Localização / Projeto */}
          <div className="md:col-span-3">
            <h4 className="font-label mb-4 text-[var(--text-high)]">Projeto</h4>
            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                Rio Branco · Acre
              </p>
              <p className="text-xs leading-relaxed">
                Iniciativa independente de pesquisa e engenharia de dados abertos. Sem vínculo institucional
                com órgãos públicos.
              </p>
            </div>
          </div>
        </div>

        {/* Bloco acadêmico de autoria */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-muted)] bg-[var(--bg-card)] p-6 sm:p-7 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-label text-[var(--accent)]">Autoria & Pesquisa</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Willian */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[var(--text-high)]">
                    Willian Albarello
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Engenharia, Arquitetura de Software e Modelagem de Dados
                  </p>
                  <a
                    href="https://instagram.com/walbarellos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:underline mt-1"
                  >
                    @walbarellos
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Wenrrison */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[var(--text-high)]">
                    Wenrrison Nogueira
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Concepção Conceitual e Formulação da Problemática
                  </p>
                  <a
                    href="https://instagram.com/nswenrrisonchris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:underline mt-1"
                  >
                    @nswenrrisonchris
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Como citar */}
            <div className="lg:w-80 shrink-0 space-y-2">
              <p className="font-label text-[var(--text-high)]">Como citar (ABNT)</p>
              <div className="rounded-[var(--radius-md)] bg-[var(--bg-inset)] border border-[var(--border-muted)] p-3.5">
                <p className="text-[11px] font-mono text-[var(--text-medium)] leading-relaxed">
                  ALBARELLO, Willian; NOGUEIRA, Wenrrison. <em>Fora da Curva</em>: Plataforma de
                  Transparência e Análise de Remunerações Atípicas no Setor Público Brasileiro. Rio
                  Branco, 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé legal */}
        <div className="pt-6 border-t border-[var(--border-muted)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            © 2026 Fora da Curva. Dados abertos de domínio público para fins de transparência e
            pesquisa.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-[var(--status-regular)]" />
              WCAG 2.2 AA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
              Dados sob LAI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
