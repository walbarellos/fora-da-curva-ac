import seedData from '../../data/seed-top100.json';
import { PagamentoRegistro, EstatisticasGerais } from '../../data/schema';

export function getEstatisticas(): EstatisticasGerais {
  return seedData.estatisticas as EstatisticasGerais;
}

export function getAllPagamentos(): PagamentoRegistro[] {
  return seedData.registros as PagamentoRegistro[];
}

export function getPagamentoById(id: string): PagamentoRegistro | undefined {
  const all = getAllPagamentos();
  return all.find((p) => p.id === id);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} mi`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} mil`;
  }
  return formatCurrency(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}
