import { getContentPaths } from '@/utils/getContentPaths';
import { getPageFromSlug } from '@/utils/getPageFromSlug';
import preval from 'next-plugin-preval';
import { META_INFO } from './meta';

function pluckMeta({ frontmatter, href, slug }) {
  return { frontmatter, href, slug };
}

async function getPagesManifest() {
  const paths = await getContentPaths();
  const pages = await Promise.all(
    paths.map(getPageFromSlug).map((page) => page.then(pluckMeta))
  );

  return {
    ...pages.reduce(
      (acc, { href, ...rest }) => ({ ...acc, [href]: { ...rest } }),
      {}
    ),
    ...META_INFO,
  };
}

export default preval(getPagesManifest());
