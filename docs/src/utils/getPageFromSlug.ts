import matter from 'gray-matter';
import path from 'path';
import { readFile } from 'fs/promises';

export type GetPageFromSlug = (slug: string) => Promise<{
  content: string;
  frontmatter: Record<string, string>;
  href: string;
  slug: string;
}>;
export const getPageFromSlug: GetPageFromSlug = async (slug: string) => {
  if (slug.startsWith('/')) {
    slug = slug.slice(1);
  }

  const href = `/${slug}`;

  const contentPath = path.join(
    process.cwd(),
    'src',
    'pages',
    slug,
    'index.page.mdx'
  );

  const source = await readFile(contentPath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter: Record<string, string> = {
    ...data,
    slug,
  };

  return { content, frontmatter, href, slug };
};
