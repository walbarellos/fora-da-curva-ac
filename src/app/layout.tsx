import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FORA DA CURVA — Os maiores pagamentos do setor público brasileiro',
  description: 'Os maiores pagamentos do setor público brasileiro, explicados sem burocracia e com rigor editorial.',
  keywords: ['transparência pública', 'remuneração juiz', 'salário servidor', 'CNJ', 'dados abertos', 'teto constitucional'],
  openGraph: {
    title: 'FORA DA CURVA — Transparência Pública Explicada',
    description: 'Entenda os maiores pagamentos do setor público com decomposição de verbas, histórico e comparações com a renda brasileira.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full bg-[#0B0D10] text-[#F4F5F7] antialiased">
      <body className="min-h-full flex flex-col bg-[#0B0D10] text-[#F4F5F7] selection:bg-[#F5B942]/20 selection:text-[#F5B942]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
