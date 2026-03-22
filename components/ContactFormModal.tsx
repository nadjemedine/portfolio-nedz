'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dictionary } from '@/lib/dictionary';

type Lang = 'ar' | 'fr' | 'en';

export default function ContactFormModal({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = dictionary;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: t.websiteDesign[lang],
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSent(true);
      } else {
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.');
      }
    } catch (error) {
      console.error(error);
      alert('حدث خطأ في الشبكة.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSent(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        serviceType: t.websiteDesign[lang],
        description: ''
      });
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-10 py-3.5 rounded-full font-semibold hover:bg-black/80 transition-colors inline-block"
      >
        {t.sendEmail[lang]}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors text-2xl"
              >
                ✕
              </button>

              {!isSent ? (
                <>
                  <h3 className="font-display text-3xl font-bold mb-2">
                    {t.contactHeaderTitle[lang]}
                  </h3>
                  <p className="text-black/60 mb-8">
                    {t.contactCardSubtitle[lang]}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5 text-start">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-black/60">{t.name[lang]}</label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-black/60">{t.phoneLabel[lang]}</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors"
                        placeholder="+213..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-black/60">{t.email[lang]}</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors"
                        placeholder="example@mail.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-black/60">{t.serviceType[lang]}</label>
                      <select 
                        value={formData.serviceType}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors appearance-none"
                      >
                        <option>{t.websiteDesign[lang]}</option>
                        <option>{t.webappDev[lang]}</option>
                        <option>{t.mobileApp[lang]}</option>
                        <option>{t.other[lang]}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-black/60">{t.shortDescription[lang]}</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors resize-none"
                      />
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-black/90 transition-all disabled:opacity-50 mt-4"
                    >
                      {loading ? t.sending[lang] : t.send[lang]}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="text-6xl mb-6">✅</div>
                  <h3 className="font-display text-3xl font-bold mb-4">{t.thankYouTitle[lang]}</h3>
                  <p className="text-black/60 mb-8 leading-relaxed">
                    {t.thankYouMessage[lang]}
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-[#bfac8e] text-black px-10 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors"
                  >
                    {t.close[lang]}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
