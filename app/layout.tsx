import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import { ContactModalProvider } from "./contexts/contact-modal-context";
import GlobalContactModal from "./components/global-contact-modal";
import { Analytics } from "@vercel/analytics/next";

const outfit = localFont({
  src: "../public/fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});

const orbitron = localFont({
  src: "../public/fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://selenium-studio.com"),
  title: {
    default: "Selenium - Agence web",
    template: "%s | Selenium",
  },
  description:
    "Agence web spécialisée en création de sites vitrines et e-commerce. Nous allions design et développement pour offrir des solutions sur mesure à nos clients.",
  keywords: [
    "Agence web",
    "Création site internet",
    "Développement web",
    "Web design",
    "UI/UX",
    "Site vitrine",
    "E-commerce",
    "SEO",
    "Référencement",
    "Selenium Studio",
  ],
  authors: [{ name: "Selenium Studio" }],
  creator: "Selenium Studio",
  publisher: "Selenium Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Selenium - Agence web",
    description:
      "Agence web spécialisée en création de sites vitrines et e-commerce. Nous allions design et développement pour offrir des solutions sur mesure à nos clients.",
    url: "https://selenium-studio.com",
    siteName: "Selenium Studio",
    images: [
      {
        url: "/logo-full.svg", // Using full logo as fallback OG image
        width: 1200,
        height: 630,
        alt: "Selenium Studio Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selenium - Agence web",
    description:
      "Agence web spécialisée en création de sites vitrines et e-commerce. Nous allions design et développement pour offrir des solutions sur mesure à nos clients.",
    images: ["/logo-full.svg"], // Using full logo as fallback
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} ${orbitron.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Selenium Studio",
              url: "https://selenium-studio.com",
              logo: "https://selenium-studio.com/logo-full.svg",
              description:
                "Agence web spécialisée en création de sites vitrines et e-commerce. Design et développement sur mesure.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
              },
            }),
          }}
        />
        <ContactModalProvider>
          <LenisProvider>
            {children}
            <GlobalContactModal />
            <Analytics />
          </LenisProvider>
        </ContactModalProvider>
      </body>
    </html>
  );
}
