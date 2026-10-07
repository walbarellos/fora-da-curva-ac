'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PagamentoRegistro, Poder } from '../../data/schema';
import { formatCurrency, formatCompactCurrency } from '@/lib/data';
import { Search, Filter, ArrowUpRight, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface RankingTableProps {
  initialRecords: PagamentoRegistro[];
}

export default function RankingTable({ initialRecords }: RankingTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [poderFilter, setPoderFilter] = useState<string>('todos');
  const [fatorFilter, setFatorFilter] = useState<string>('todos');
  const [faixaFilter, setFaixaFilter] = useState<string>('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filtragem combinada
  const filteredRecords = useMemo(() => {
    return initialRecords.filter((record) => {
      // Busca textual
      const matchesSearch =
        searchTerm === '' ||
        record.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.orgao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.orgaoSigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.uf.toLowerCase().includes(searchTerm.toLowerCase());

      // Poder
      const matchesPoder =
        poderFilter === 'todos' || record.poder === poderFilter;

      // Fator predominante
      const matchesFator =
        fatorFilter === 'todos' || record.fatorPredominante === fatorFilter;

      // Faixa monetária
      let matchesFaixa = true;
      if (faixaFilter === '1m') matchesFaixa = record.valorBruto >= 1000000;
      else if (faixaFilter === '700k') matchesFaixa = record.valorBruto >= 700000;
      else if (faixaFilter === '500k') matchesFaixa = record.valorBruto >= 500000;
      else if (faixaFilter === '300k') matchesFaixa = record.valorBruto >= 300000;

      return matchesSearch && matchesPoder && matchesFator && matchesFaixa;
    });
  }, [initialRecords, searchTerm, poderFilter, fatorFilter, faixaFilter]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const clearFilters = () => {
    setSearchTerm('');
    setPoderFilter('todos');
    setFatorFilter('todos');
    setFaixaFilter('todos');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    poderFilter !== 'todos' ||
    fatorFilter !== 'todos' ||
    faixaFilter !== 'todos';

  return (
    <div className="space-y-4">
      {/* Barra de Filtros e Busca */}
      <div className="bg-[#11151A] border border-[#1B2129] rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Input de Busca */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6C7480] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cargo, tribunal, órgão ou sigla..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#181D23] border border-[#232B35] rounded-lg text-sm text-[#F4F5F7] placeholder-[#6C7480] focus:outline-none focus:border-[#F5B942]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6C7480] hover:text-[#F4F5F7]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtros Dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            {/* Poder */}
            <select
              value={poderFilter}
              onChange={(e) => {
                setPoderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#181D23] border border-[#232B35] text-xs text-[#A8AFB8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F5B942]"
            >
              <option value="todos">Todos os Poderes</option>
              <option value="Judiciário">Judiciário</option>
              <option value="Ministério Público">Ministério Público</option>
              <option value="Executivo">Executivo</option>
              <option value="Legislativo">Legislativo</option>
            </select>

            {/* Fator Predominante */}
            <select
              value={fatorFilter}
              onChange={(e) => {
                setFatorFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#181D23] border border-[#232B35] text-xs text-[#A8AFB8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F5B942]"
            >
              <option value="todos">Todas as Verbas</option>
              <option value="Retroativo">Retroativos Pretéritos</option>
              <option value="Indenização">Verbas Indenizatórias</option>
            </select>

            {/* Faixa Monetária */}
            <select
              value={faixaFilter}
              onChange={(e) => {
                setFaixaFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#181D23] border border-[#232B35] text-xs text-[#A8AFB8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F5B942]"
            >
              <option value="todos">Qualquer Valor</option>
              <option value="1m">Acima de R$ 1 Milhão</option>
              <option value="700k">Acima de R$ 700 mil</option>
              <option value="500k">Acima de R$ 500 mil</option>
              <option value="300k">Acima de R$ 300 mil</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs text-[#E45757] hover:bg-[#E45757]/10 px-2.5 py-2 rounded-lg border border-[#E45757]/30 transition-colors"
                title="Limpar todos os filtros"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            )}
          </div>
        </div>

        {/* Status de Resultados */}
        <div className="flex items-center justify-between text-xs text-[#6C7480] font-mono pt-1 border-t border-[#181D23]">
          <span>
            Exibindo <strong>{filteredRecords.length}</strong> de {initialRecords.length} pagamentos analisados
          </span>
          <span>Setembro/2026</span>
        </div>
      </div>

      {/* Tabela do Ranking */}
      <div className="bg-[#11151A] border border-[#1B2129] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#1B2129] text-xs font-mono uppercase text-[#6C7480] bg-[#0E1217]">
                <th className="py-3 px-4 w-12 text-center">Pos.</th>
                <th className="py-3 px-4">Cargo & Lotação</th>
                <th className="py-3 px-4 hidden md:table-cell">Composição da Verba</th>
                <th className="py-3 px-4 hidden sm:table-cell">Fator Principal</th>
                <th className="py-3 px-4 text-right">Valor Bruto</th>
                <th className="py-3 px-4 text-center w-28">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181D23]">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6C7480] text-sm">
                    Nenhum pagamento corresponde aos filtros selecionados.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => {
                  const pctBase = Math.round((item.remuneracaoBasica / item.valorBruto) * 100);
                  const pctExtra = 100 - pctBase;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#181D23]/50 transition-colors group"
                    >
                      {/* Posição */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-xs text-[#6C7480] group-hover:text-[#F5B942]">
                        #{item.posicaoRanking}
                      </td>

                      {/* Cargo & Órgão */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-baseline gap-2">
                          <Link
                            href={`/pagamento/${item.id}`}
                            className="font-medium text-[#F4F5F7] hover:text-[#F5B942] transition-colors"
                          >
                            {item.cargo}
                          </Link>
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#181D23] text-[#A8AFB8] border border-[#232B35]">
                            {item.uf}
                          </span>
                        </div>
                        <div className="text-xs text-[#6C7480] mt-0.5 flex items-center gap-2">
                          <span className="text-[#A8AFB8] font-medium">{item.orgaoSigla}</span>
                          <span>•</span>
                          <span>{item.orgao}</span>
                        </div>
                      </td>

                      {/* Mini Barra de Composição */}
                      <td className="py-3.5 px-4 hidden md:table-cell w-56">
                        <div className="space-y-1">
                          <div className="h-2 w-full bg-[#181D23] rounded-full overflow-hidden flex">
                            <div
                              style={{ width: `${pctBase}%` }}
                              title={`Salário-base regular: ${pctBase}%`}
                              className="bg-[#58C4A3] h-full"
                            />
                            <div
                              style={{ width: `${pctExtra}%` }}
                              title={`Indenizações & Retroativos: ${pctExtra}%`}
                              className={item.fatorPredominante === 'Retroativo' ? 'bg-[#F5B942] h-full' : 'bg-[#E45757] h-full'}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-[#6C7480]">
                            <span>Base: {pctBase}%</span>
                            <span className={item.fatorPredominante === 'Retroativo' ? 'text-[#F5B942]' : 'text-[#E45757]'}>
                              Extra: {pctExtra}%
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Fator Predominante */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <span
                          className={`text-[11px] font-mono px-2 py-1 rounded-md border inline-block ${
                            item.fatorPredominante === 'Retroativo'
                              ? 'bg-[#F5B942]/10 border-[#F5B942]/30 text-[#F5B942]'
                              : 'bg-[#E45757]/10 border-[#E45757]/30 text-[#E45757]'
                          }`}
                        >
                          {item.fatorPredominante}
                        </span>
                      </td>

                      {/* Valor Bruto */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-sm sm:text-base font-extrabold text-[#F4F5F7] group-hover:text-[#F5B942] tabular-nums block font-mono">
                          {formatCurrency(item.valorBruto)}
                        </span>
                        <span className="text-[11px] font-mono text-[#6C7480] tabular-nums">
                          Líq: {formatCurrency(item.valorLiquido)}
                        </span>
                      </td>

                      {/* Ação */}
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          href={`/pagamento/${item.id}`}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-[#181D23] text-[#A8AFB8] hover:text-[#0B0D10] hover:bg-[#F5B942] transition-colors"
                          title="Ver composição e histórico oficial"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#181D23] flex items-center justify-between text-xs text-[#A8AFB8]">
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded bg-[#181D23] border border-[#232B35] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#F4F5F7]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded bg-[#181D23] border border-[#232B35] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#F4F5F7]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
