// This is large copy-pasta from `amplify-docs/src/Layout` & modified to work outside of that repo

import CodeBlockProvider from "amplify-docs/src/components/CodeBlockProvider/index";
import { Container } from "amplify-docs/src/components/Container";
import ExternalLink from "amplify-docs/src/components/ExternalLink";
import Footer from "amplify-docs/src/components/Footer/index";
import {
  ChapterTitleStyle,
  ContentStyle,
  LayoutStyle,
} from "amplify-docs/src/components/Layout/styles";
import {
  DirectoryGroupHeaderStyle,
  DirectoryGroupItemStyle,
  DirectoryLinksStyle,
  ProductRootLinkStyle,
} from "amplify-docs/src/components/Menu/Directory/styles";
import MenuCloseButton from "amplify-docs/src/components/Menu/MenuCloseButton";
import MenuOpenButton from "amplify-docs/src/components/Menu/MenuOpenButton";
import RepoActions from "amplify-docs/src/components/Menu/RepoActions";
import {
  DiscordLinkStyle,
  MenuBodyStyle,
  MenuBreakStyle,
  MenuHeaderStyle,
  MenuStyle,
} from "amplify-docs/src/components/Menu/styles";
import SecondaryNav from "amplify-docs/src/components/SecondaryNav/index";
import TableOfContents from "amplify-docs/src/components/TableOfContents/index";
import UniversalNav from "amplify-docs/src/components/UniversalNav/index";
import { DISCORD } from "amplify-docs/src/constants/img";
import "amplify-docs/src/styles/styles.css";
import capitalize from "lodash/capitalize";
import groupBy from "lodash/groupBy";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import pages from "@/data/pages.preval";

export default function Layout({
  children,
  frontmatter,
}: {
  children: any;
  frontmatter?: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const [headers, setHeaders] = React.useState([]);
  const router = useRouter();
  const pathname = router.pathname;
  const href = router.asPath;
  const { platform } = router.query as { platform: string };

  const groupedPages = Object.entries(
    groupBy(pages, (page) => {
      const [, folder = ""] = page.slug.split("/");
      return folder;
    })
  );

  React.useEffect(() => {
    const htmlHeaders = [
      ...document.querySelectorAll(
        [
          "#__next > section:first-of-type h2",
          "#__next > section:first-of-type h3",
        ].join(",")
      ),
    ].map((node) => [node.innerHTML, node.tagName.toLowerCase()]);

    setHeaders(htmlHeaders);
  }, [children]);

  const chapterTitle = "Components"; // TODO – Remove or use "Primitives" depending on path

  const basePath = "docs.amplify.aws";
  return (
    <>
      {frontmatter && (
        <Head>
          <title>{`${chapterTitle} - ${frontmatter.title} - Amplify Docs`}</title>
          <meta
            property="og:title"
            content={frontmatter.title}
            key="og:title"
          />
          <meta
            property="og:description"
            content={frontmatter.description}
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
            content={frontmatter.description}
            key="description"
          />
          <meta property="twitter:card" content="summary" key="twitter:card" />
          <meta
            property="twitter:title"
            content={frontmatter.title}
            key="twitter:title"
          />
          <meta
            property="twitter:description"
            content={frontmatter.description}
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
          {isMenuOpen ? (
            <MenuStyle>
              <div>
                <div>
                  <MenuHeaderStyle>
                    <MenuCloseButton closeMenu={() => setIsMenuOpen(false)} />
                  </MenuHeaderStyle>
                  <MenuBodyStyle>
                    {groupedPages.map(([folder, pages]) => (
                      <div key={folder}>
                        {folder && (
                          <DirectoryGroupHeaderStyle>
                            <h4>{capitalize(folder)}</h4>
                            {/* <ArrowStyle isUp={true} /> */}
                          </DirectoryGroupHeaderStyle>
                        )}
                        <DirectoryLinksStyle>
                          {pages.map((page) =>
                            folder ? (
                              <DirectoryGroupItemStyle
                                isActive={href === page.href}
                                key={page.href}
                              >
                                <Link href={`${page.href}`} key={page.href}>
                                  {page.frontmatter.title}
                                </Link>
                              </DirectoryGroupItemStyle>
                            ) : (
                              <Link href={page.href} key={page.href}>
                                <ProductRootLinkStyle
                                  isActive={href === page.href}
                                >
                                  {page.frontmatter.title}
                                </ProductRootLinkStyle>
                              </Link>
                            )
                          )}
                        </DirectoryLinksStyle>
                      </div>
                    ))}
                    <MenuBreakStyle />
                    <RepoActions path={pathname} href={href} />
                    <DiscordLinkStyle>
                      <ExternalLink
                        href="https://discord.gg/jWVbPfC"
                        anchorTitle="Discord Community"
                      >
                        <img alt={DISCORD.alt} src={DISCORD.lightSrc} />
                        Chat with us
                      </ExternalLink>
                    </DiscordLinkStyle>
                  </MenuBodyStyle>
                </div>
              </div>
            </MenuStyle>
          ) : (
            <MenuOpenButton openMenu={() => setIsMenuOpen(true)} />
          )}

          <ContentStyle>
            <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
            <h1>{frontmatter.title}</h1>
            <CodeBlockProvider>{children}</CodeBlockProvider>
          </ContentStyle>
          <TableOfContents title={frontmatter.title}>{headers}</TableOfContents>
        </LayoutStyle>
      </Container>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}
