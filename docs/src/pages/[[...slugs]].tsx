import Layout from "@/components/Layout";
import { getContentPaths } from "@/utils/getContentPaths";
import { getPageFromSlug } from "@/utils/getPageFromSlug";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { renderToStaticMarkup } from "react-dom/server";

export default function ContentPage({ __html, frontmatter, pages, slug }) {
  const Content = dynamic(() => import(`../content/${slug}/index.mdx`), {
    loading() {
      return <div dangerouslySetInnerHTML={{ __html }} />;
    },
  });

  return (
    <Layout pages={pages} frontmatter={frontmatter}>
      <Content />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getContentPaths();

  return {
    paths,
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking for development
    fallback: false,
  };
}

// https://nextjs.org/docs/basic-features/data-fetching
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get page from `slugs` param
  const slug = [].concat(params.slugs).join("/");
  const { default: Content, frontmatter = {} } = await import(
    `../content/${slug}/index.mdx`
  );

  // Get navigation from all pages
  const paths = await getContentPaths();
  const pages = await Promise.all(
    paths.map(getPageFromSlug).map(page =>
      page.then(({ frontmatter, href, slug }) => ({
        frontmatter,
        href,
        slug,
      }))
    )
  );

  return {
    props: {
      __html: renderToStaticMarkup(<Content />),
      pages,
      frontmatter,
      slug,
    },
  };
};
