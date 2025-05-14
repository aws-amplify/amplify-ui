import { useEffect } from 'react';
import type { SetUserAgentOptions } from '@aws-amplify/ui';
import { setUserAgent } from '@aws-amplify/ui';

export default function useSetUserAgent({
  componentName,
  packageName,
  version,
}: SetUserAgentOptions): void {
  useEffect(() => {
    const clearUserAgent = setUserAgent({
      componentName,
      packageName,
      version,
    });

    return clearUserAgent;
  }, [componentName, packageName, version]);
}
