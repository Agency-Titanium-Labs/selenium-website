import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex gap-6 justify-between flex-wrap px-8 py-2">
      <p>Selenium Studio © 2026 - Tous droits réservés</p>
      <div className="flex gap-6 ml-auto">
        <Link
          href="/legal-documents/legal-notices"
          data-page-title="Mentions Légales"
          className="text-sm text-grey-lighter hover:text-grey-light"
        >
          Mentions Légales
        </Link>
        <Link
          href="/legal-documents/privacy-policy"
          data-page-title="Politique de Confidentialité"
          className="text-sm text-grey-lighter hover:text-grey-light"
        >
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
