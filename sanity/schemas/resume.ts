import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resume',
  title: 'Resume / CV / السيرة الذاتية',
  type: 'document',
  fields: [
    defineField({
      name: 'titleAr',
      title: 'Job Title (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'titleFr',
      title: 'Job Title (French)',
      type: 'string',
    }),
    defineField({
      name: 'titleEn',
      title: 'Job Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'summaryAr',
      title: 'Professional Summary (Arabic)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'summaryFr',
      title: 'Professional Summary (French)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'summaryEn',
      title: 'Professional Summary (English)',
      type: 'text',
      rows: 5,
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
          { name: 'startDate', title: 'Start Date', type: 'string' },
          { name: 'endDate', title: 'End Date (leave empty if current)', type: 'string' },
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
      name: 'resumeFile',
      title: 'Resume PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
    },
    prepare({ title }) {
      return {
        title: title || 'Resume / CV',
      };
    },
  },
});
