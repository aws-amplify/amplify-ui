import * as React from 'react';
import debounce from 'lodash/debounce';
import { Heading, Text, useTheme } from '@aws-amplify/ui-react';
import { Sidebar } from './SecondaryNav';
import { TableOfContents } from '../TableOfContents';
import { Footer } from './Footer';

export default function Page({
  children,
  frontmatter = {},
}: {
  children: any;
  frontmatter?: any;
}) {
  const { title, description, hideToc = false } = frontmatter;
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
