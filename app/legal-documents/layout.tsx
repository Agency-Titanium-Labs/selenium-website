import Button from "@/app/components/ui/button";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-6 py-18 flex flex-col items-center">
      <Button variant="transparent" href="/" className="text-white self-start">
        Retour à l&apos;accueil
      </Button>
      <div className="max-w-4xl prose text-white">{children}</div>
    </div>
  );
}
