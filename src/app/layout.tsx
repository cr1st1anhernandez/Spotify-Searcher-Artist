import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Searcher",
  description: "Buscador de artistas en Spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/spotify.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <main className="flex min-h-screen justify-center bg-zinc-100 px-8 py-20 dark:bg-black lg:items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
