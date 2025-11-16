import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import { ContactModalProvider } from "./contexts/contact-modal-context";
import GlobalContactModal from "./components/global-contact-modal";

const orbitron = localFont({
  src: "../public/fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Selenium - Agence web",
  description:
    "Agence web spécialisée en création de sites vitrines et e-commerce. Nous allions design et développement pour offrir des solutions sur mesure à nos clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${orbitron.variable} antialiased`}>
        <ContactModalProvider>
          <LenisProvider>
            {children}
            <GlobalContactModal />
          </LenisProvider>
        </ContactModalProvider>
      </body>
    </html>
  );
}
