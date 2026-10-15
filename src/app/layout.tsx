import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nextjs Boilerplate",
  description: "Boilerplate Next.js dengan clean architecture (feature-based + layers).",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="max-w-xl mx-auto mt-4 px-4 flex items-center gap-4 text-sm">
          <Link
            className="rounded-md text-muted-foreground hover:underline"
            href="/"
          >
            Beranda
          </Link>
          <Link
            className="rounded-md text-foreground hover:underline"
            href="/todos"
          >
            Todo
          </Link>
        </nav>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
          {children}
        </div>
      </body>
    </html>
  );
}
