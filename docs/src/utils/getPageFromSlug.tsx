import { serialize } from "next-mdx-remote/serialize";

import path from "path";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";

export async function getPageFromSlug(slug) {
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

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        [
          require("remark-autolink-headings"),
          {
            linkProperties: {
              className: ["anchor"],
            },
          },
        ],
        require("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return { content, frontmatter, mdxSource };
}
