import * as React from 'react';
import debounce from 'lodash/debounce';
import { SiW3C, SiReact } from 'react-icons/si';
import {
  Heading,
  Link,
  Icon,
  Text,
  View,
  useTheme,
} from '@aws-amplify/ui-react';
import { Sidebar } from './SecondaryNav';
import { TableOfContents } from '../TableOfContents';
import { Footer } from './Footer';
import { GITHUB_REPO_FILE } from '@/data/links';
import { DesignTokenIcon } from '@/components/DesignTokenIcon';

export default function Page({
  children,
  frontmatter = {},
}: {
  children: any;
  frontmatter?: any;
}) {
  const {
    title,
    description,
    hideToc = false,
    ariaPattern,
    themeSource,
    reactSource,
  } = frontmatter;
  const { tokens } = useTheme();
  const [headings, setHeadings] = React.useState([]);

  // TODO: is there a better way to do this?
  React.useLayoutEffect(() => {
    const updateHeaders = debounce(() => {
      setHeadings(
        [
          ...document
            .querySelector('#__next')
            .querySelectorAll('h2[id],h3[id]'),
        ].map((node: HTMLElement) => ({
          id: node.id,
          label: node.innerText,
          level: node.nodeName,
          top: node.offsetTop,
        }))
      );
    });

    const observer = new MutationObserver(updateHeaders);

    observer.observe(document.querySelector('#__next'), {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [children]);
  return (
    <div className="docs-main">
      <Sidebar />
      <main className="docs-content">
        <section className="docs-content-body">
          <section className="docs-meta">
            <Heading level={1}>{title}</Heading>
            <Text
              fontSize={`${tokens.fontSizes.xl}`}
              className="docs-description"
            >
              {description}
            </Text>
            <View className="docs-component-links">
              {ariaPattern ? (
                <Link
                  className="docs-component-link"
                  href={ariaPattern}
                  isExternal
                >
                  <Icon
                    ariaLabel=""
                    as={SiW3C}
                    marginInlineEnd={tokens.space.xs}
                  />
                  ARIA pattern
                </Link>
              ) : null}
              {themeSource ? (
                <Link
                  className="docs-component-link"
                  href={`${GITHUB_REPO_FILE}${themeSource}`}
                  isExternal
                >
                  <DesignTokenIcon
                    ariaLabel=""
                    marginInlineEnd={tokens.space.xs}
                  />
                  Theme source
                </Link>
              ) : null}
              {reactSource ? (
                <Link
                  className="docs-component-link"
                  href={`${GITHUB_REPO_FILE}${reactSource}`}
                  isExternal
                >
                  <Icon
                    ariaLabel=""
                    as={SiReact}
                    marginInlineEnd={tokens.space.xs}
                  />
                  React source
                </Link>
              ) : null}
            </View>
          </section>

          {children}
        </section>
        <Footer />
      </main>

      {hideToc ? null : (
        <TableOfContents title="Contents" headings={headings} />
      )}
    </div>
  );
}
