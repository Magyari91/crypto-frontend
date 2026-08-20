import type { Metadata, Viewport } from "next";
import ConsentManager from "../src/components/ConsentManager";
import { SITE_NAME, SITE_URL } from "../src/config/site";
import { LanguageProvider } from "../src/i18n/LanguageContext";
import "../src/index.css";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CryptoVision kriptopiaci dashboard",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kriptovaluta árfolyamok, hírsentiment, kockázati jelek és visszamért valószínűségi előrejelzések.",
  applicationName: SITE_NAME,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: SITE_NAME,
    title: "CryptoVision kriptopiaci dashboard",
    description:
      "Piaci adatok és ellenőrizhető, valószínűségi kripto-előrejelzések egy helyen.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "CryptoVision kriptopiaci dashboard",
    description: "Piaci adatok, hírsentiment és visszamért előrejelzések.",
  },
  alternates: { canonical: "/" },
  other: adsenseClient ? { "google-adsense-account": adsenseClient } : undefined,
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0f12" },
    { media: "(prefers-color-scheme: light)", color: "#f2f4f7" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <ConsentManager>{children}</ConsentManager>
        </LanguageProvider>
      </body>
    </html>
  );
}
