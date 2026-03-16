import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects / المشاريع',
  type: 'document',
  fields: [
    defineField({ name: 'titleAr', title: 'Title (Arabic)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'titleFr', title: 'Title (French)', type: 'string' }),
    defineField({ name: 'titleEn', title: 'Title (English)', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titleEn', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'descriptionAr', title: 'Short Description (Arabic)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionFr', title: 'Short Description (French)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionEn', title: 'Short Description (English)', type: 'text', rows: 3 }),
    defineField({ name: 'longDescriptionAr', title: 'Long Description (Arabic)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'longDescriptionFr', title: 'Long Description (French)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'longDescriptionEn', title: 'Long Description (English)', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (Card Cover)',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Web App', value: 'webapp' },
          { title: 'Desktop App (Electron)', value: 'electron' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'client', title: 'Client Name', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'orderRank', title: 'Order Rank', type: 'number' }),
  ],
  orderings: [
    { title: 'Manual Order', name: 'orderRank', by: [{ field: 'orderRank', direction: 'asc' }] },
    { title: 'Year (Newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'titleEn', media: 'mainImage', subtitle: 'category' },
    prepare({ title, media, subtitle }) {
      return {
        title: title || 'مشروع جديد (بدون عنوان)',
        media,
        subtitle,
      };
    },
  },
});
