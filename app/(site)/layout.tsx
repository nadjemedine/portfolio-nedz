import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { cookies } from "next/headers";
import { getSiteSettings } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const settings = await getSiteSettings();
  const logoUrl = settings?.logo ? urlFor(settings.logo).url() : "/logo.png";

  return (
    <>
      <Navbar initialLang={lang} logoUrl={logoUrl} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={lang} logoUrl={logoUrl} />
    </>
  );
}
