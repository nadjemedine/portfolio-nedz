import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nedjem Eddine — Portfolio",
  description: "Web & Electron Developer | مطور مواقع وتطبيقات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${playfair.variable} ${ibmPlexArabic.variable} bg-[#fdf8f0] text-[#0a0a0a] font-body`}
      >
        {children}
      </body>
    </html>
  );
}
