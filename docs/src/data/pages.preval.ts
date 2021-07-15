import { getContentPaths } from '@/utils/getContentPaths';
import { getPageFromSlug } from '@/utils/getPageFromSlug';
import preval from 'next-plugin-preval';

function pluckMeta({ frontmatter, href, slug }) {
  return { frontmatter, href, slug };
}

async function getPagesManifest() {
  const paths = await getContentPaths();
  const pages = await Promise.all(
    paths.map(getPageFromSlug).map((page) => page.then(pluckMeta))
  );

  return pages;
}

export default preval(getPagesManifest());
