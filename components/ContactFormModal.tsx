'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dictionary } from '@/lib/dictionary';

import ContactForm from './ContactForm';

type Lang = 'ar' | 'fr' | 'en';

export default function ContactFormModal({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const t = dictionary;

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSent(false);
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
                  <h3 className="font-display text-3xl font-bold mb-2 text-center">
                    {t.contactHeaderTitle[lang]}
                  </h3>
                  <p className="text-black/60 mb-8 text-center">
                    {t.contactCardSubtitle[lang]}
                  </p>

                  <ContactForm lang={lang} />
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
