import type { MetaInfo } from '@/data/meta';

function pluckMeta({ frontmatter, href, slug }) {
  return { frontmatter, href, slug };
}

export function getPagesManifest(
  getContentPaths: any,
  getPageFromSlug: any,
  default_meta_info: MetaInfo
): Promise<MetaInfo>;
export async function getPagesManifest(
  getContentPaths,
  getPageFromSlug,
  default_meta_info
) {
  const paths = await getContentPaths();
  const pages = (await Promise.all(
    paths.map(getPageFromSlug).map((page) => page.then(pluckMeta))
  )) as any[];

  return {
    ...pages.reduce(
      (acc, { href, ...rest }) => ({ ...acc, [href]: { ...rest } }),
      {}
    ),
    ...default_meta_info,
  };
}
