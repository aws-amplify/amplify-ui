import { customComponents } from "@/components/customComponents";
import { Layout } from "@/components/Layout";
import { getContentPaths } from "@/utils/getContentPaths";
import { getPageFromSlug } from "@/utils/getPageFromSlug";
import { theme } from "@aws-amplify/ui-react";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";

export default function Content({ frontmatter, mdxSource }) {
  return (
    <Layout title={frontmatter.title}>
      <MDXRemote
        {...mdxSource}
        scope={{
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

  const { frontmatter, mdxSource } = await getPageFromSlug(slug);

  return {
    props: {
      frontmatter,
      mdxSource,
    },
  };
};
