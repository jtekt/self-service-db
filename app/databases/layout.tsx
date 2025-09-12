import { HelpLink } from "@/components/HelpLink";
import { LogoutButton } from "@/components/logoutButton";

export default function DatabasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen ">
      <header className="p-4 border-b flex items-center gap-2">
        <div className="text-2xl ">Self-service DB</div>
        <div className="flex-grow" />
        <LogoutButton />
        <HelpLink />
      </header>
      <main className="w-full max-w-3xl mx-auto p-4 flex-grow">{children}</main>
      <footer className="p-4 text-sm text-center border-t">
        Self service DB | Maxime Moreillon | JTEKT Corporation
      </footer>
    </div>
  );
}
