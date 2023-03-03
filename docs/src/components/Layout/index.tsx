import * as React from 'react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import { Heading, Link, Text, View, useTheme } from '@aws-amplify/ui-react';

import { TableOfContents } from '../TableOfContents';
import { Footer } from './Footer';
import {
  GITHUB_REPO,
  ANDROID_GITHUB_REPO,
  SWIFT_GITHUB_REPO,
  GITHUB_REPO_FILE,
} from '@/data/links';
import {
  DesignTokenIcon,
  ReactIcon,
  W3CIcon,
  GithubIcon,
} from '@/components/Icons';

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

  React.useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;

      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('load', scrollToHash);

    return () => window.removeEventListener('load', scrollToHash);
  }, []);

  const {
    query: { platform: framework = 'react' },
  } = useRouter();
  const githubRepo = getGitHubRepo(framework as string);

  return (
    <>
      <div className="docs-content">
        <section className="docs-content-body">
          <section className="docs-meta">
            <Heading level={1}>{title}</Heading>
            {description ? (
              <Text className="docs-description">{description}</Text>
            ) : null}

            <View className="docs-component-links">
              {ariaPattern ? (
                <Link
                  className="docs-component-link"
                  href={ariaPattern}
                  isExternal
                >
                  <W3CIcon ariaLabel="W3C" marginInlineEnd={tokens.space.xs} />
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
                  <ReactIcon
                    ariaLabel=""
                    aria-hidden="true"
                    marginInlineEnd={tokens.space.xs}
                  />
                  React source
                </Link>
              ) : null}
              <Link
                className="docs-component-link"
                href={`${githubRepo}issues/new/choose`}
                isExternal
              >
                <GithubIcon
                  ariaLabel="GitHub"
                  aria-hidden="true"
                  marginInlineEnd={tokens.space.xs}
                />
                Feedback
              </Link>
            </View>
          </section>

          {children}
        </section>
        <Footer />
      </div>

      {!hideToc && headings.length ? (
        <TableOfContents title="Contents" headings={headings} />
      ) : null}
    </>
  );
}

function getGitHubRepo(framework = 'react') {
  if (framework === 'android') {
    return ANDROID_GITHUB_REPO;
  } else if (framework === 'swift') {
    return SWIFT_GITHUB_REPO;
  }
  return GITHUB_REPO;
}
