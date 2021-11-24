import slugify from 'slugify';

export const getImagePath = (name: string) => {
  const slug = slugify(name.replace(/\W+/g, ' '));
  return `/previews/${slug.length > 0 ? slug : 'default'}.png`;
};
