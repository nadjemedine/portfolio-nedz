# Dev Online — Portfolio

موقع بورتفوليو احترافي مبني بـ **Next.js 14** و **Sanity CMS**.

## 🚀 تشغيل المشروع

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل بيئة التطوير
npm run dev

# 3. افتح المتصفح على
http://localhost:3000
```

## 🎛️ لوحة تحكم Sanity

```
http://localhost:3000/studio
```

## 📁 هيكل الملفات

```
nedjem-portfolio/
├── app/
│   ├── page.tsx              ← الصفحة الرئيسية
│   ├── about/page.tsx        ← صفحة حول
│   ├── projects/page.tsx     ← قائمة المشاريع
│   ├── projects/[slug]/      ← تفاصيل مشروع
│   ├── contact/page.tsx      ← صفحة التواصل
│   └── studio/               ← Sanity Studio
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── sanity.ts             ← إعداد العميل
│   └── queries.ts            ← استعلامات GROQ
└── sanity/schemas/           ← كل مخططات Sanity
```

## 🔐 متغيرات البيئة

ملف `.env.local` يحتوي على المعلومات السرية ولا يُرفع لـ Git أبداً.
انظر `.env.example` للقالب.

## 🛠️ التقنيات

- **Next.js 14** (App Router)
- **Sanity v3** (CMS)
- **Tailwind CSS**
- **TypeScript**

## 📝 إضافة المحتوى

1. افتح `/studio`
2. أضف Hero → About → Contact → المشاريع
3. ستظهر البيانات تلقائياً في الموقع
