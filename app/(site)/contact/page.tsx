import { getContactData } from "@/lib/queries";

export const revalidate = 60;

import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";
import ContactFormModal from "@/components/ContactFormModal";

export default async function ContactPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const contact = (await getContactData().catch(() => null)) as any;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">{t.contactHeaderTitle[lang]}</h1>
          <p className="text-black/60 text-lg max-w-xl mx-auto">
            {t.contactHeaderSubtitle[lang]}
          </p>
        </div>

        {/* Availability Badge */}
        {contact?.availability === "available" && (
          <div className="flex justify-center mb-12">
            <div className="bg-green-50 border border-green-200 rounded-full px-6 py-3 flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 font-medium text-sm">
                {t.availableForNewProjects[lang]}
              </span>
            </div>
          </div>
        )}

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className="bg-[#bfac8e] p-8 rounded-2xl border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1 text-center group text-black"
            >
              <div className="text-4xl mb-5">✉️</div>
              <div className="font-semibold text-lg mb-2">{t.email[lang]}</div>
              <div className="text-black/70 text-sm group-hover:underline break-all">
                {contact.email}
              </div>
            </a>
          )}

          {contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="bg-[#bfac8e] p-8 rounded-2xl border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1 text-center group text-black"
            >
              <div className="text-4xl mb-5">📞</div>
              <div className="font-semibold text-lg mb-2">{lang === 'ar' ? 'الهاتف' : 'Phone'}</div>
              <div className="text-black/70 text-sm">{contact.phone}</div>
            </a>
          )}

          {contact?.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#bfac8e] p-8 rounded-2xl border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1 text-center group text-black"
            >
              <div className="text-4xl mb-5">💻</div>
              <div className="font-semibold text-lg mb-2">GitHub</div>
              <div className="text-black/70 text-sm group-hover:underline">
                {t.myProjects[lang]}
              </div>
            </a>
          )}

          {contact?.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#bfac8e] p-8 rounded-2xl border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1 text-center group text-black"
            >
              <div className="text-4xl mb-5">💼</div>
              <div className="font-semibold text-lg mb-2">LinkedIn</div>
              <div className="text-black/70 text-sm group-hover:underline">
                {t.socials[lang]}
              </div>
            </a>
          )}
        </div>

        {/* CTA Box */}
        <div className="bg-[#bfac8e] text-black rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {t.contactCardSubtitle[lang]}
          </h2>
          <p className="text-black/60 mb-8 max-w-lg mx-auto">
            {t.translateIdea[lang]}
          </p>
          <ContactFormModal lang={lang} />
        </div>

        {/* Location */}
        {contact?.location && (
          <div className="text-center mt-10 text-black/40 text-sm">
            📍 {contact.location}
          </div>
        )}
      </div>
    </div>
  );
}
