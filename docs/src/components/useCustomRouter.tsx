import * as React from 'react';

import { useRouter } from 'next/router';

/**
 *
 * @returns same router format as Next.js with validated parameters.
 * TODO: Next.js has a RFC to custom routes and validate params https://github.com/vercel/next.js/discussions/9081#discussioncomment-21895
 * Once that feature is release, we may consider to migrate to their official ones instead.
 */

export const useCustomRouter = () => {
  const router = useRouter();
  const {
    query: { platform = 'react' },
    push,
  } = router;
  const platforms = ['react', 'angular', 'vue', 'flutter'];

  React.useEffect(() => {
    if (!platforms.includes(platform.toString())) {
      push('/404');
    }
  }, [platform]);

  router.query.platform = platform;

  return router;
};
