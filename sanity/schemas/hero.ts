import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero / الرئيسية',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'titleAr', title: 'Title (Arabic)', type: 'string' }),
    defineField({ name: 'titleFr', title: 'Title (French)', type: 'string' }),
    defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
    defineField({ name: 'subtitleAr', title: 'Subtitle (Arabic)', type: 'string' }),
    defineField({ name: 'subtitleFr', title: 'Subtitle (French)', type: 'string' }),
    defineField({ name: 'subtitleEn', title: 'Subtitle (English)', type: 'string' }),
    defineField({ name: 'bioAr', title: 'Short Bio (Arabic)', type: 'text', rows: 4 }),
    defineField({ name: 'bioFr', title: 'Short Bio (French)', type: 'text', rows: 4 }),
    defineField({ name: 'bioEn', title: 'Short Bio (English)', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Profile Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'cvUrl', title: 'CV Download URL', type: 'url' }),
    defineField({ name: 'skills', title: 'Top Skills', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'yearsOfExperience', title: 'Years of Experience', type: 'number' }),
    defineField({ name: 'projectsCount', title: 'Projects Completed', type: 'number' }),
    defineField({ name: 'clientsCount', title: 'Happy Clients', type: 'number' }),
  ],
  preview: {
    select: { title: 'name' },
    prepare({ title }) {
      return {
        title: title || 'Hero / الصفحة الرئيسية (فارغ)',
      };
    },
  },
});
