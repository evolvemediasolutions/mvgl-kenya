import type { Core } from '@strapi/strapi';

function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Automatically generate slug from title / jobTitle if missing or placeholder
    if (strapi.documents && typeof strapi.documents.use === 'function') {
      strapi.documents.use(async (context: any, next: () => Promise<any>) => {
        const supportedModels = [
          'api::event.event',
          'api::career.career',
          'api::insight.insight',
          'api::product.product'
        ];

        if (supportedModels.includes(context.uid) && ['create', 'update'].includes(context.action)) {
          const data = context.params?.data;
          if (data) {
            const sourceTitle = data.title || data.jobTitle;
            if (data.jobTitle && !data.title) data.title = data.jobTitle;
            if (data.title && !data.jobTitle) data.jobTitle = data.title;

            // If slug is empty or looks like default 'event-1' / 'event', auto-generate from title
            if (sourceTitle && (!data.slug || /^(event|career|product|insight)(-\d+)?$/i.test(data.slug))) {
              data.slug = slugify(sourceTitle);
            }
          }
        }
        return next();
      });
    }
  },
};
