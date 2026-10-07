import Link from 'next/link';
import { Landmark, ArrowUpRight, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-[#1B2129] bg-[#0B0D10]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded bg-[#181D23] border border-[#232B35] flex items-center justify-center text-[#F5B942] group-hover:border-[#F5B942]/50 transition-colors">
              <Scale className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#F4F5F7] group-hover:text-[#F5B942] transition-colors">
                FORA DA CURVA
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#A8AFB8] font-mono">
                Transparência Pública
              </span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-[#1B2129]">
            <Link
              href="/ranking"
              className="px-3 py-1.5 text-sm font-medium text-[#A8AFB8] hover:text-[#F4F5F7] hover:bg-[#11151A] rounded-md transition-colors"
            >
              Ranking dos Maiores
            </Link>
            <Link
              href="/metodologia"
              className="px-3 py-1.5 text-sm font-medium text-[#A8AFB8] hover:text-[#F4F5F7] hover:bg-[#11151A] rounded-md transition-colors"
            >
              Metodologia & Fontes
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#6C7480] bg-[#11151A] px-3 py-1.5 rounded-full border border-[#1B2129]">
            <span className="w-2 h-2 rounded-full bg-[#58C4A3] inline-block"></span>
            <span>Setembro/2026 auditado</span>
          </div>
          
          <Link
            href="/ranking"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#F5B942] text-[#0B0D10] hover:bg-[#e4aa34] transition-colors"
          >
            <span>Ver Ranking</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
