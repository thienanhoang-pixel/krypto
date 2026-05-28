import type { Metadata } from 'next';
import { LangProvider } from '@/components/layout/LangProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'CryptoKit — Futures Calculator & Exchange Comparison',
  description: 'Free crypto trading tools: liquidation calculator, PnL calculator, DCA calculator, risk sizing. Compare the best crypto exchanges.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
