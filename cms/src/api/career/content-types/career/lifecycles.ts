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
      const title = data.jobTitle || data.title;
      if (title && (!data.slug || data.slug.trim() === '' || /^(career)(-\d+)?$/i.test(data.slug))) {
        data.slug = slugify(title);
      }
      if (data.title && !data.jobTitle) {
        data.jobTitle = data.title;
      }
      if (data.jobTitle && !data.title) {
        data.title = data.jobTitle;
      }
    }
  },
  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data) {
      const title = data.jobTitle || data.title;
      if (title && (!data.slug || data.slug.trim() === '' || /^(career)(-\d+)?$/i.test(data.slug))) {
        data.slug = slugify(title);
      }
      if (data.title && !data.jobTitle) {
        data.jobTitle = data.title;
      }
      if (data.jobTitle && !data.title) {
        data.title = data.jobTitle;
      }
    }
  }
};
