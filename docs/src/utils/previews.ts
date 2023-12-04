// import slugify from 'slugify';

import { PREVIEW_VERSION } from '../data/preview';

// For now dynamic social images are disabled
// hard-coding a preview image based on platform until resolved
export const getImagePath = (name: string) => {
  // const slug = slugify(name.replace(/\W+/g, ' '));
  // return `/previews/${slug.length > 0 ? slug : 'react'}-${PREVIEW_VERSION}.png`;
  return `/previews/${name}-${PREVIEW_VERSION}.png`;
};
