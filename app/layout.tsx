import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-mode";
import { HelpLink } from "@/components/HelpLink";
import { LogoutButton } from "@/components/logout-button";
import { AppIcon } from "@/components/app-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PublicEnvScript } from "next-runtime-env";
import { Toaster } from "@/components/ui/sonner";
import { getUserIdFromSession } from "@/lib/sessions";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Self-Service DB",
  description: "Self-service databases",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserIdFromSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <Link
              href="/"
              className="mr-auto flex items-center gap-2 text-base font-semibold"
            >
              <AppIcon className="size-5 shrink-0" />
              Self-Service DB
            </Link>
            <ModeToggle />
            <HelpLink />
            {userId != null && <LogoutButton />}
          </header>
          <main className="mx-auto w-full max-w-3xl flex-1 p-4">{children}</main>
          <footer className="border-t p-4 text-center text-sm">
            Self-Service DB | JTEKT Corporation
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
