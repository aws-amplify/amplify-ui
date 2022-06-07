import { globby } from 'globby';
import { FRAMEWORKS } from '@/data/frameworks';
import { getContentPaths } from '@/utils/getContentPaths';
import { getPageFromSlug } from '@/utils/getPageFromSlug';
import { getPagesManifest } from '@/utils/getPagesManifest';
import { META_INFO } from '@/data/meta';

export async function getAllPaths() {
  const manifest = await getPagesManifest(
    getContentPaths,
    getPageFromSlug,
    META_INFO
  );

  const pagesWithParam = await globby([
    'src/pages/**/index.page.tsx',
    'src/pages/**/index.page.mdx',
    '!src/pages/_*.tsx',
    '!src/pages/404.page.tsx',
  ]);

  return pagesWithParam
    .slice(1)
    .flatMap((p) => {
      p = p
        .replace('src/pages', '')
        .replace('.page.mdx', '')
        .replace('.page.tsx', '')
        .replace('/index', '');

      return FRAMEWORKS.map((framework) => {
        const filepath = p.replace('[platform]', framework);
        const supportedFrameworks =
          manifest[p].frontmatter.supportedFrameworks === 'all'
            ? FRAMEWORKS
            : manifest[p].frontmatter.supportedFrameworks.split('|');
        if (supportedFrameworks.includes(framework)) {
          return filepath;
        } else {
          console.log(
            `ⓧ ${filepath} does not support ${framework}. Not adding the path.`
          );
          return '';
        }
      });
    })
    .filter((el) => el);
}
