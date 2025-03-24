import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { PublicEnvScript } from "next-runtime-env";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Self DB",
  description: "Self service databases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen ">
            <header className="p-4 text-2xl border-b">Self service DB</header>
            <main className="w-full max-w-3xl mx-auto p-4 flex-grow">
              {children}
            </main>
            <footer className="p-4 text-sm text-center border-t">
              Self service DB | Maxime Moreillon | JTEKT Corporation
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
