// This comes from "amplify-docs/src/components/Layout", with tweaks to work

import Head from "next/head";
import { useRouter } from "next/router";
import { traverseHeadings } from "amplify-docs/src/utils/traverseHeadings";
import CodeBlockProvider from "amplify-docs/src/components/CodeBlockProvider";
import TableOfContents from "amplify-docs/src/components/TableOfContents";
import UniversalNav from "amplify-docs/src/components/UniversalNav";
import SecondaryNav from "amplify-docs/src/components/SecondaryNav";
import Footer from "amplify-docs/src/components/Footer";
import {
  ContentStyle,
  LayoutStyle,
} from "amplify-docs/src/components/Layout/styles";
import { Container } from "amplify-docs/src/components/Container";

import "amplify-docs/src/styles/styles.css";

export default function Layout({
  children,
  frontMatter,
}: {
  children: any;
  frontMatter?: any;
}) {
  const router = useRouter();
  const { platform = "js" } = router.query as { platform: string };
  const headers = traverseHeadings(children, platform);

  const basePath = "docs.amplify.aws";
  const meta = frontMatter;

  return (
    <>
      {meta && (
        <Head>
          <meta property="og:title" content={meta.title} key="og:title" />
          <meta
            property="og:description"
            content={meta.description}
            key="og:description"
          />
          <meta
            property="og:url"
            content={basePath + router.pathname}
            key="og:url"
          />
          <meta
            property="og:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="og:image"
          />
          <meta
            property="description"
            content={meta.description}
            key="description"
          />
          <meta property="twitter:card" content="summary" key="twitter:card" />
          <meta
            property="twitter:title"
            content={meta.title}
            key="twitter:title"
          />
          <meta
            property="twitter:description"
            content={meta.description}
            key="twitter:description"
          />
          <meta
            property="twitter:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="twitter:image"
          />
        </Head>
      )}
      <UniversalNav
        heading="Amplify Docs"
        brandIcon="/assets/logo-light.svg"
        blend={false}
      />
      <SecondaryNav platform={platform} pageHasMenu={false} />
      <Container backgroundColor="bg-color-tertiary">
        <LayoutStyle>
          {meta
            ? metaContent({
                title: meta.title,
                headers,
                children,
              })
            : children}
        </LayoutStyle>
      </Container>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}

function metaContent({ title, headers, children }) {
  return (
    <>
      {/* Cannot use Menu until the Directory is dynamic, not from dynamic.ts. Otherwise these pages don't exist! */}
      {/* <Menu
        filters={filters}
        platform={platform}
        pathname={pathname}
        href={href}
      ></Menu> */}

      <ContentStyle>
        <h1>{title}</h1>
        <CodeBlockProvider>{children}</CodeBlockProvider>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
    </>
  );
}
