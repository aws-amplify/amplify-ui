import { customComponents } from "@/components/customComponents";
import { Layout } from "@/components/Layout";
import { getContentPaths } from "@/utils/getContentPaths";
import { getFeatureTestsFromSlug } from "@/utils/getFeatureTestsFromSlug";
import { getPageFromSlug } from "@/utils/getPageFromSlug";
import { theme } from "@aws-amplify/ui-react";
import mdxPrism from "mdx-prism";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { FeatureTests } from "@/components/FeatureTests";
import * as components from "@aws-amplify/ui-react";

export default function Content({
  featureTests = [],
  frontmatter,
  mdxSource,
  componentPages,
  primitivePages,
}) {
  return (
    <Layout
      // TODO instead send a `tree` or `nav` nested list
      componentPages={componentPages}
      primitivePages={primitivePages}
      title={frontmatter.title}
    >
      <MDXRemote
        {...mdxSource}
        components={{
          ...components,
          FeatureTests,
        }}
        scope={{
          featureTests,
          theme,
          customComponents,
        }}
      />
    </Layout>
  );
}

// https://nextjs.org/docs/messages/invalid-getstaticpaths-value
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getContentPaths();

  return {
    paths,
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking for development
    fallback: false,
  };
};

// https://nextjs.org/docs/basic-features/data-fetching
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slugs = [] } = params;
  const slug = [].concat(slugs).join("/");
  const pluckMeta = ({ frontmatter, href, slug }) => ({
    frontmatter,
    href,
    slug,
  });

  const { content, frontmatter } = await getPageFromSlug(slug);
  const featureTests = await getFeatureTestsFromSlug(slug);
  const componentPagePaths = await getContentPaths("components/*/index.mdx");
  const componentPages = await Promise.all(
    componentPagePaths.map(getPageFromSlug).map(page => page.then(pluckMeta))
  );

  const primitivePagePaths = await getContentPaths("primitives/*/index.mdx");
  const primitivePages = await Promise.all(
    primitivePagePaths.map(getPageFromSlug).map(page => page.then(pluckMeta))
  );
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

  return {
    props: {
      frontmatter,
      componentPages,
      featureTests,
      mdxSource,
      primitivePages,
    },
  };
};
