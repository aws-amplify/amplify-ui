import { readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

export async function getPageFromSlug(slug: string) {
  if (slug.startsWith("/")) {
    slug = slug.slice(1);
  }

  const href = `/${slug}`;

  const contentPath = path.join(
    process.cwd(),
    "src",
    "content",
    slug,
    "index.mdx"
  );

  const source = await readFile(contentPath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = {
    ...data,
    slug,
  };

  return { content, frontmatter, href, slug };
}
