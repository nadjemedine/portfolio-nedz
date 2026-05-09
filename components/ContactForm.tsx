'use client';
import { useState } from 'react';
import { dictionary } from '@/lib/dictionary';

type Lang = 'ar' | 'fr' | 'en';

export default function ContactForm({ lang }: { lang: Lang }) {
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
    
    // Basic validation for all fields
    if (!formData.fullName || !formData.phone || !formData.email || !formData.description) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الخانات' : 'Please fill all fields');
      return;
    }

    // Phone validation: starts with 05, 06, or 07 and is 10 digits
    const phoneRegex = /^(05|06|07)\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert(lang === 'ar' 
        ? 'يجب أن يبدأ رقم الهاتف بـ 05، 06، أو 07 وأن يتكون من 10 أرقام' 
        : 'Phone must start with 05, 06, or 07 and be 10 digits');
      return;
    }

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
        const errorData = await res.json();
        console.error('Submission error:', errorData);
        alert(lang === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert(lang === 'ar' ? 'حدث خطأ في الشبكة.' : 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-6">✅</div>
        <h3 className="font-display text-3xl font-bold mb-4">{t.thankYouTitle[lang]}</h3>
        <p className="text-black/60 mb-8 leading-relaxed">
          {t.thankYouMessage[lang]}
        </p>
        <button
          onClick={() => setIsSent(false)}
          className="bg-black text-white px-10 py-3 rounded-full font-semibold hover:bg-black/80 transition-colors"
        >
          {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-start">
      <div className="md:col-span-1">
        <label className="block text-sm font-medium mb-2 text-black/60">{t.name[lang]}</label>
        <input
          required
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors"
          placeholder="John Doe"
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-medium mb-2 text-black/60">{t.phoneLabel[lang]}</label>
        <input
          required
          type="tel"
          maxLength={10}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors"
          placeholder="05..."
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-medium mb-1 text-black/60">{t.email[lang]}</label>
        <input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors"
          placeholder="example@mail.com"
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-medium mb-1 text-black/60">{t.serviceType[lang]}</label>
        <div className="relative">
          <select 
            value={formData.serviceType}
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors appearance-none"
          >
            <option>{t.websiteDesign[lang]}</option>
            <option>{t.webappDev[lang]}</option>
            <option>{t.mobileApp[lang]}</option>
            <option>{t.other[lang]}</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black/40">
            ▼
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 text-black/60">{t.shortDescription[lang]}</label>
        <textarea
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#bfac8e] transition-colors resize-none"
        />
      </div>

      <div className="md:col-span-2">
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-black/90 transition-all disabled:opacity-50 mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? t.sending[lang] : t.send[lang]}
        </button>
      </div>
    </form>
  );
}
