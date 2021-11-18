import dynamic, { LoaderComponent } from 'next/dynamic';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';
import * as React from 'react';

import { Placeholder, Flex, Link, Alert } from '@aws-amplify/ui-react';

export default function Example() {
  return;
}

export interface FragmentProps {
  /**
   * Allowlist of accepted platforms. If the current platform is not in this
   * list, then the fragment will not render.
   * */
  platforms?: string[];
  children: ({ platform: string }) => LoaderComponent;
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

export const Fragment = ({ children, platforms }: FragmentProps) => {
  const { query } = useRouter();
  const { platform = 'react' } = query;
  const Component = React.useMemo(() => {
    if (!shouldRenderFragment(platforms, platform)) {
      return null;
    }

    return dynamic(() => children({ platform }), {
      loading({ error, isLoading }) {
        if (error) {
          return (
            <Alert variation="warning">
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
