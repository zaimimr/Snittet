import '@/public/globals.css';
import '@radix-ui/themes/styles.css';
import { Analytics } from '@vercel/analytics/react';
import { config } from '../../val.config';
import { Container, Theme } from '@radix-ui/themes';
import { fetchVal } from '@/val/val.rsc';
import { Inter } from 'next/font/google';
import { ValProvider } from '@valbuild/next';
import Image from 'next/image';
import IndexVal from '@/content/pages/index.val';
import React from 'react';
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });
import Bilde from '@/public/bilde.png';

export async function generateMetadata(): Promise<Metadata> {
  const { metadataDescription, metadataTitle } = await fetchVal(IndexVal);
  return {
    title: metadataTitle,
    description: metadataDescription,
    icons: [{ rel: 'icon', url: Bilde.src }]
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = await fetchVal(IndexVal);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ValProvider config={config}>
          <Theme appearance={theme} radius="small">
            <Container align="center" className="px-4 py-20" size="3">
              <Image alt="Snittkalkulator" className="absolute left-4 top-4" height="40" src={Bilde} width="40" />
              {children}
            </Container>
          </Theme>
        </ValProvider>
        <Analytics />
      </body>
    </html>
  );
}
