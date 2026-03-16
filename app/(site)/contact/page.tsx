import { getContactData } from "@/lib/queries";

export const revalidate = 60;

export default async function ContactPage() {
  const contact = (await getContactData().catch(() => null)) as any;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">تواصل معي</h1>
          <p className="text-[#666] text-lg max-w-xl mx-auto">
            أنا متاح للمشاريع الجديدة، الاستشارات التقنية، والفرص المهنية
          </p>
        </div>

        {/* Availability Badge */}
        {contact?.availability === "available" && (
          <div className="flex justify-center mb-12">
            <div className="bg-green-50 border border-green-200 rounded-full px-6 py-3 flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 font-medium text-sm">
                متاح حالياً للمشاريع الجديدة
              </span>
            </div>
          </div>
        )}

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className="bg-white p-8 rounded-2xl border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="text-4xl mb-5">✉️</div>
              <div className="font-semibold text-lg mb-2">البريد الإلكتروني</div>
              <div className="text-[#c8883a] text-sm group-hover:underline break-all">
                {contact.email}
              </div>
            </a>
          )}

          {contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="bg-white p-8 rounded-2xl border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="text-4xl mb-5">📞</div>
              <div className="font-semibold text-lg mb-2">الهاتف</div>
              <div className="text-[#c8883a] text-sm">{contact.phone}</div>
            </a>
          )}

          {contact?.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-2xl border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="text-4xl mb-5">💻</div>
              <div className="font-semibold text-lg mb-2">GitHub</div>
              <div className="text-[#c8883a] text-sm group-hover:underline">
                عرض مشاريعي البرمجية
              </div>
            </a>
          )}

          {contact?.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-2xl border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="text-4xl mb-5">💼</div>
              <div className="font-semibold text-lg mb-2">LinkedIn</div>
              <div className="text-[#c8883a] text-sm group-hover:underline">
                تواصل مهني
              </div>
            </a>
          )}

          {/* Fallbacks if no Sanity data */}
          {!contact?.email && !contact?.phone && !contact?.github && !contact?.linkedin && (
            <>
              <div className="bg-white p-8 rounded-2xl border border-[#f2d9ac] text-center">
                <div className="text-4xl mb-5">✉️</div>
                <div className="font-semibold text-lg mb-2">البريد الإلكتروني</div>
                <div className="text-[#aaa] text-sm">أضف بريدك عبر لوحة التحكم</div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#f2d9ac] text-center">
                <div className="text-4xl mb-5">💻</div>
                <div className="font-semibold text-lg mb-2">GitHub</div>
                <div className="text-[#aaa] text-sm">أضف رابط GitHub عبر لوحة التحكم</div>
              </div>
            </>
          )}
        </div>

        {/* CTA Box */}
        <div className="bg-[#0a0a0a] text-[#fdf8f0] rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            لديك مشروع تريد تنفيذه؟
          </h2>
          <p className="text-[#aaa] mb-8 max-w-lg mx-auto">
            أرسل لي رسالة عبر البريد الإلكتروني وسأرد عليك في أقرب وقت ممكن.
          </p>
          {contact?.email ? (
            <a
              href={`mailto:${contact.email}?subject=طلب مشروع جديد`}
              className="bg-[#c8883a] text-white px-10 py-3.5 rounded-full font-semibold hover:bg-[#b5762e] transition-colors inline-block"
            >
              أرسل رسالة الآن
            </a>
          ) : (
            <span className="bg-[#c8883a] text-white px-10 py-3.5 rounded-full font-semibold">
              أرسل رسالة الآن
            </span>
          )}
        </div>

        {/* Location */}
        {contact?.location && (
          <div className="text-center mt-10 text-[#999] text-sm">
            📍 {contact.location}
          </div>
        )}
      </div>
    </div>
  );
}
