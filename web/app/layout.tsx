import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ania Rozgotuje — Testujemy przepisy zamiast was",
  description:
    "Recenzje przepisów kulinarnych z internetu. Sprawdzamy czas, trudność, smak i poziom stresu — zamiast was.",
  metadataBase: new URL("https://aniarozgotuje.pl"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1.5rem",
              height: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Ania Rozgotuje
            </Link>

            <NavLinks />
          </div>
        </header>

        <main className="flex flex-col flex-1">{children}</main>

        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "2rem 1.5rem",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.8125rem",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            © {new Date().getFullYear()} Ania Rozgotuje &mdash; testujemy
            przepisy zamiast was
          </div>
        </footer>
      </body>
    </html>
  );
}
