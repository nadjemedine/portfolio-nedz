import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});
const amiriDisplay = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["700"],
  variable: "--font-display",
});

import { getSiteSettings } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const faviconUrl = settings?.favicon ? urlFor(settings.favicon).url() : "/favicon.ico";

  return {
    title: {
      template: '%s | Nedjem Eddine',
      default: settings?.siteNameEn || "Nedjem Eddine — Portfolio",
    },
    description: "Web Developer | مطور مواقع وتطبيقات",
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "ar";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
      <body
        className={`${amiriDisplay.variable} ${amiri.variable} font-body bg-[#3a3d35] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
