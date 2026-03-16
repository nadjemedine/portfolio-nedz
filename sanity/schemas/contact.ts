import { defineField, defineType } from 'sanity';

export const contactSchema = defineType({
  name: 'contact',
  title: 'Contact Info / التواصل',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available for work', value: 'available' },
          { title: 'Busy', value: 'busy' },
          { title: 'Open to opportunities', value: 'open' },
        ],
      },
      initialValue: 'available',
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Information' }) },
});

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings / إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({ name: 'siteNameAr', title: 'Site Name (Arabic)', type: 'string' }),
    defineField({ name: 'siteNameFr', title: 'Site Name (French)', type: 'string' }),
    defineField({ name: 'siteNameEn', title: 'Site Name (English)', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
