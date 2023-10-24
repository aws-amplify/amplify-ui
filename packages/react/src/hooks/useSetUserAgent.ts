import { useEffect } from 'react';
import { setUserAgent, SetUserAgentOptions } from '@aws-amplify/ui';

/**
 * Amplify Auth React hook
 * @internal
 */
export function useSetUserAgent({
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

    return () => {
      clearUserAgent();
    };
  }, [componentName, packageName, version]);
}

export default useSetUserAgent;
