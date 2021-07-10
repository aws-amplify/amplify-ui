import Head from "next/head";
import { useRouter } from "next/router";
import { traverseHeadings } from "amplify-docs/src/utils/traverseHeadings";
import { gatherFilters } from "amplify-docs/src/utils/gatherFilters";
import CodeBlockProvider from "amplify-docs/src/components/CodeBlockProvider/index";
import Menu from "amplify-docs/src/components/Menu/index";
import TableOfContents from "amplify-docs/src/components/TableOfContents/index";
import UniversalNav from "amplify-docs/src/components/UniversalNav/index";
import SecondaryNav from "amplify-docs/src/components/SecondaryNav/index";
import NextPrevious from "amplify-docs/src/components/NextPrevious/index";
import Footer from "amplify-docs/src/components/Footer/index";
import {
  ContentStyle,
  LayoutStyle,
  ChapterTitleStyle,
} from "amplify-docs/src/components/Layout/styles";
import { Container } from "amplify-docs/src/components/Container";
import { getChapterDirectory } from "amplify-docs/src/utils/getLocalDirectory";

import "amplify-docs/src/styles/styles.css";

export default function Layout({
  children,
  // amplify-docs calls it `meta`, so re-assigning to have fewer changes
  frontmatter: meta,
}: {
  children: any;
  frontmatter?: any;
}) {
  const router = useRouter();
  const { pathname } = router;

  const { platform } = router.query as { platform: string };
  const headers = traverseHeadings(children, platform);
  const filters = gatherFilters(children);

  // ❗️ This causes an infinite loop when rendered outside of the aws-amplify/docs repo
  // if (
  //   !filters.includes(platform) &&
  //   !pathname.includes("start") &&
  //   !pathname.includes("404")
  // ) {
  //   return Custom404();
  // }

  // ❗️ We cannot depend on aws-amplify/docs' static directory, but only the local fs
  // ❗️ UI doesn't need the chapture+title (e.g. "Authentication - Sign Out") distinction
  // const { title: chapterTitle } = getChapterDirectory(pathname) as {
  //   title: string;
  // };

  const chapterTitle = "Components"; // TODO – Remove or use "Primitives" depending on path

  const basePath = "docs.amplify.aws";
  return (
    <>
      {meta && (
        <Head>
          <title>{`${chapterTitle} - ${meta.title} - Amplify Docs`}</title>
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
                chapterTitle,
                headers,
                children,
                filters,
                platform,
                pathname: router.pathname,
                href: router.asPath,
              })
            : children}
        </LayoutStyle>
      </Container>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}

function metaContent({
  title,
  chapterTitle,
  headers,
  children,
  filters,
  platform,
  pathname,
  href,
}) {
  return (
    <>
      {/* ❗️ `Menu` cannot be used as it directly relies on aws-amplify/docs' static directory structure */}
      {/* <Menu
        filters={filters}
        platform={platform}
        pathname={pathname}
        href={href}
      ></Menu> */}
      <ContentStyle>
        <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
        <h1>{title}</h1>
        <CodeBlockProvider>
          {children}

          {/* ❗️ `NextPrevious` cannot be used as it directly relies on aws-amplify/docs' static directory structure */}
          {/* <NextPrevious pathname={pathname} filterKey={platform} /> */}
        </CodeBlockProvider>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
    </>
  );
}
