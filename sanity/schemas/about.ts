import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About / حول',
  type: 'document',
  fields: [
    defineField({ name: 'bioAr', title: 'Full Bio (Arabic)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'bioFr', title: 'Full Bio (French)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'bioEn', title: 'Full Bio (English)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'About Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'whyMeAr', title: 'Why Choose Me (Arabic)', type: 'text', rows: 5 }),
    defineField({ name: 'whyMeFr', title: 'Why Choose Me (French)', type: 'text', rows: 5 }),
    defineField({ name: 'whyMeEn', title: 'Why Choose Me (English)', type: 'text', rows: 5 }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'category', title: 'Category', type: 'string' },
          { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
        ],
      }],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'iconName', title: 'Icon Name (react-icons)', type: 'string' },
          { name: 'titleAr', title: 'Title AR', type: 'string' },
          { name: 'titleFr', title: 'Title FR', type: 'string' },
          { name: 'titleEn', title: 'Title EN', type: 'string' },
          { name: 'descriptionAr', title: 'Description AR', type: 'text' },
          { name: 'descriptionFr', title: 'Description FR', type: 'text' },
          { name: 'descriptionEn', title: 'Description EN', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'experiences',
      title: 'Work Experience',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'company', title: 'Company', type: 'string' },
          { name: 'roleAr', title: 'Role AR', type: 'string' },
          { name: 'roleFr', title: 'Role FR', type: 'string' },
          { name: 'roleEn', title: 'Role EN', type: 'string' },
          { name: 'startDate', title: 'Start Date', type: 'date' },
          { name: 'endDate', title: 'End Date (leave empty if current)', type: 'date' },
          { name: 'descriptionAr', title: 'Description AR', type: 'text' },
          { name: 'descriptionFr', title: 'Description FR', type: 'text' },
          { name: 'descriptionEn', title: 'Description EN', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'institution', title: 'Institution', type: 'string' },
          { name: 'degreeAr', title: 'Degree AR', type: 'string' },
          { name: 'degreeFr', title: 'Degree FR', type: 'string' },
          { name: 'degreeEn', title: 'Degree EN', type: 'string' },
          { name: 'year', title: 'Year', type: 'string' },
        ],
      }],
    }),
  ],
  preview: { select: { title: 'whyMeEn' }, prepare: () => ({ title: 'About Page Content' }) },
});
