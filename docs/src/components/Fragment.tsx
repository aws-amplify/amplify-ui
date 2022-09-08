import * as React from 'react';

import { Alert, Flex, Link, Placeholder } from '@aws-amplify/ui-react';
import dynamic, { LoaderComponent } from 'next/dynamic';
import { useRouter } from 'next/router';

import { isArray } from 'lodash';

export default function Example() {
  return;
}

export interface FragmentProps {
  /**
   * Allowlist of accepted platforms. If the current platform is not in this
   * list, then the fragment will not render.
   * */
  platforms?: string[];
  /**
   * If true, all JS frameworks (react, vue, angular) will be treated as a single platform named 'web'.
   * Note: if this is true, platforms={['web']} should be used to enable web content instead of platforms={['react', 'vue', 'angular']}
   */
  useCommonWebContent?: boolean;
  children: ({ platform }: { platform: string }) => LoaderComponent;
}

const shouldRenderFragment = (
  allowlist: string[],
  platform: string | string[]
): boolean => {
  if (isArray(platform)) {
    console.error('ERROR - Only one platform should be selected.');
    return true;
  }
  if (!allowlist) {
    // if allowlist is not provided, we assume we render all requested fragment
    return true;
  } else {
    // if allowlist is provided, then we render only if it's allowlisted
    return allowlist.includes(platform);
  }
};

export const Fragment = ({
  children,
  platforms,
  useCommonWebContent,
}: FragmentProps) => {
  const {
    query: { platform: framework = 'react' },
  } = useRouter();
  const platform = getPlatform(framework as string, useCommonWebContent);
  const Component = React.useMemo(() => {
    if (!shouldRenderFragment(platforms, platform)) {
      return null;
    }

    return dynamic(() => children({ platform }), {
      loading({ error, isLoading }) {
        if (error) {
          return (
            <Alert role="none" variation="warning">
              {error.message.includes('Cannot find module') ? (
                <>Content missing for {platform}.</>
              ) : (
                error.message
              )}{' '}
              <Link
                isExternal
                href="https://github.com/aws-amplify/amplify-ui/issues/new/choose"
              >
                Please open an issue.
              </Link>
            </Alert>
          );
        }

        return (
          <Flex direction="column">
            <Placeholder />
            <Placeholder />
            <Placeholder width="50%" />
          </Flex>
        );
      },
    });
  }, [children, platform]);

  return Component ? <Component /> : null;
};

function getPlatform(framework = 'react', useCommonWebContent = false) {
  if (!useCommonWebContent) {
    return framework;
  }
  if (['react', 'vue', 'angular'].includes(framework)) {
    return 'web';
  }
  return framework;
}
