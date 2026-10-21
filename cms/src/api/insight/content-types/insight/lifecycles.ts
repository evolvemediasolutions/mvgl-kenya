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
  beforeCreate(event: any) {
    const { data } = event.params;
    if (data) {
      if (data.title && (!data.slug || data.slug.trim() === '' || /^(insight)(-\d+)?$/i.test(data.slug))) {
        data.slug = slugify(data.title);
      }
    }
  },
  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data) {
      if (data.title && (!data.slug || data.slug.trim() === '' || /^(insight)(-\d+)?$/i.test(data.slug))) {
        data.slug = slugify(data.title);
      }
    }
  }
};
