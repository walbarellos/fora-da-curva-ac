import Link from 'next/link';
import { Scale, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-[var(--border-muted)] bg-[var(--bg-page)]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--border-accent)] transition-colors duration-200">
              <Scale className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-[var(--text-high)] group-hover:text-[var(--accent)] transition-colors duration-200">
                FORA DA CURVA
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono mt-0.5">
                Transparência Pública
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 pl-5 border-l border-[var(--border-muted)]">
            <Link
              href="/ranking"
              className="px-3 py-1.5 text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-high)] hover:bg-[var(--bg-card)] rounded-md transition-colors duration-150"
            >
              Ranking dos Maiores
            </Link>
            <Link
              href="/metodologia"
              className="px-3 py-1.5 text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-high)] hover:bg-[var(--bg-card)] rounded-md transition-colors duration-150"
            >
              Metodologia & Fontes
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-1.5 rounded-full border border-[var(--border-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-regular)]" />
            <span>Setembro/2026 auditado</span>
          </div>

          <Link
            href="/ranking"
            className="btn-primary !py-1.5 !px-3 !text-xs"
          >
            <span>Ver Ranking</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
