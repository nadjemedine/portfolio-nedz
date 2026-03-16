import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'nedjem-portfolio',
  title: 'Nedjem Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Hero / الصفحة الرئيسية').id('hero').child(
              S.document().schemaType('hero').documentId('hero')
            ),
            S.listItem().title('About / حول').id('about').child(
              S.document().schemaType('about').documentId('about')
            ),
            S.listItem().title('Contact / تواصل').id('contact').child(
              S.document().schemaType('contact').documentId('contact')
            ),
            S.listItem().title('Site Settings / الإعدادات').id('siteSettings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.documentTypeListItem('project').title('Projects / المشاريع'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
