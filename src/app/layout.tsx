import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'FORA DA CURVA — Os maiores pagamentos do setor público brasileiro',
  description:
    'Os maiores pagamentos do setor público brasileiro, explicados sem burocracia e com rigor editorial.',
  keywords: [
    'transparência pública',
    'remuneração juiz',
    'salário servidor',
    'CNJ',
    'dados abertos',
    'teto constitucional',
    'TJMT',
    'STJ',
  ],
  openGraph: {
    title: 'FORA DA CURVA — Transparência Pública Explicada',
    description:
      'Entenda os maiores pagamentos do setor público com decomposição de verbas, histórico e comparações com a renda brasileira.',
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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-page)] text-[var(--text-high)] font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
