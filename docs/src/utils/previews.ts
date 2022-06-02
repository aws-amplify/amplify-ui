import slugify from 'slugify';

import { PREVIEW_VERSION } from '../data/preview';

export const getImagePath = (name: string) => {
  const slug = slugify(name.replace(/\W+/g, ' '));

  return `/previews/${slug.length > 0 ? slug : 'react'}-${PREVIEW_VERSION}.png`;
};
