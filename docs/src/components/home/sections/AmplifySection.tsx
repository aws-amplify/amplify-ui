import { useRef } from 'react';
import classNames from 'classnames';
import { Heading, Link, View, Flex } from '@aws-amplify/ui-react';
import { AmplifyIcon, ServerIcon, LibraryIcon } from '@/components/Icons';
import { useIntersectionObserver } from '@/components/useIntersection';
import { HomeFeatureCard } from '../HomeFeatureCard';
import { trackScroll } from '@/utils/track';

export const AmplifySection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Amplify');
  }

  return (
    <View
      ref={ref}
      as="section"
      testId="docs-home-section"
      className={classNames(
        'docs-home-section',
        'fade-in',
        isVisible && 'shown'
      )}
    >
      <Flex direction="column" className="docs-home-subsection--thin">
        <Heading
          level={2}
          className={classNames('expand-out', isVisible && 'shown')}
        >
          Better <strong>together</strong> with AWS Amplify
        </Heading>

        <HomeFeatureCard
          title="Build your application visually in Amplify Studio"
          icon={AmplifyIcon}
        >
          Deploy and manage your app backend with a GraphQL API, User login,
          File storage and more in minutes. Start small and build to the full
          scale of AWS!
          {platform === 'react'
            ? ' Build components visually in Figma, bind them to your data, and use them in your codebase.'
            : ''}
          <br />
          <Link href="https://docs.amplify.aws/console/">
            Learn more about Amplify Studio
          </Link>
        </HomeFeatureCard>
        <HomeFeatureCard
          title="Connect your UI to your backend with Amplify libraries."
          icon={LibraryIcon}
        >
          Amplify Libraries offer an opinionated and declarative interfaces to
          connect to your backend. The libraries are pluggable and can be
          extended to use other providers.
          <br />
          <Link
            href={`https://docs.amplify.aws/lib/q/platform/${
              platform !== 'flutter' ? 'js' : platform
            }/`}
          >
            Learn more about Amplify Libraries
          </Link>
        </HomeFeatureCard>
        <HomeFeatureCard
          title="Deploy your front-end in minutes with Amplify Hosting."
          icon={ServerIcon}
        >
          Fully managed web hosting with full-stack CI/CD. Amplify Hosting has
          support for common SPA and SSG frameworks like Next.js, Gatsby, and
          Eleventy.
          <br />
          <Link
            isExternal
            href="https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html"
          >
            Learn more about Amplify Hosting
          </Link>
        </HomeFeatureCard>
      </Flex>
    </View>
  );
};
