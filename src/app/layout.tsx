import '@/public/globals.css';
import '@radix-ui/themes/styles.css';
import { config } from '../../val.config';
import { Container, Theme } from '@radix-ui/themes';
import { fetchVal } from '@/val/val.rsc';
import { Inter } from 'next/font/google';
import { ValProvider } from '@valbuild/next';
import IndexVal from '@/content/pages/index.val';
import React from 'react';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const { metadataDescription, metadataTitle } = await fetchVal(IndexVal);
  return {
    title: metadataTitle,
    description: metadataDescription
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
        <ValProvider config={config} disableRefresh>
          <Theme appearance={theme}>
            <Container align="center">{children}</Container>
            {/* {isDevelopment() && <ThemePanel />} */}
          </Theme>
        </ValProvider>
      </body>
    </html>
  );
}
