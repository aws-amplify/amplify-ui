import * as React from 'react';
import debounce from 'lodash/debounce';
import { Alert, Heading, Button, Text, useTheme } from '@aws-amplify/ui-react';
import { FiInfo } from 'react-icons/fi';
import { Sidebar } from './SecondaryNav';
import { TableOfContents } from '../TableOfContents';
import { Footer } from './Footer';

const PrimitiveAlert = () => {
  const { tokens } = useTheme();
  return (
    <Alert
      variation="info"
      heading="Developer preview"
      margin={`${tokens.space.small} 0 0 0`}
    >
      <Text color="inherit">
        Amplify UI primitive components like this one are in developer preview
        and only available in React for now.
      </Text>
      <Button
        as="a"
        size="small"
        gap={tokens.space.xs}
        margin={`${tokens.space.xs} 0 0 0`}
        isExternal
        href="https://github.com/aws-amplify/amplify-ui/discussions/198"
      >
        <FiInfo />
        Add feedback here
      </Button>
    </Alert>
  );
};

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
    isPrimitive = false,
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
            {isPrimitive ? <PrimitiveAlert /> : null}
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
