export default function DatabasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen ">
      <header className="p-4 border-b flex items-center justify-between">
        <div className="text-2xl">Self-service DB</div>
      </header>
      <main className="w-full max-w-3xl mx-auto p-4 flex-grow">{children}</main>
    </div>
  );
}
