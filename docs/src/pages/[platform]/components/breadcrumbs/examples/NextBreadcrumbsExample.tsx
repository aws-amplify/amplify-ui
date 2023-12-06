import NextLink from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

export default function NextBreadcrumbsExample() {
  const { asPath } = useRouter();

  const nestedRoutes = asPath
    .split('#')[0]
    .split('?')[0]
    .split('/')
    .filter((subpath) => subpath.length > 0);

  const breadcrumbs = [
    { href: '/', text: 'Home' },
    ...nestedRoutes.map((subpath, i) => {
      const href = '/' + nestedRoutes.slice(0, i + 1).join('/');

      const text = subpath;
      return { href, text };
    }),
  ];

  return (
    <Breadcrumbs.Container>
      {breadcrumbs.map(({ href, text }, i) => {
        const isCurrent = i === breadcrumbs.length - 1;
        return (
          <Breadcrumbs.Item key={href}>
            <NextLink href={href} passHref legacyBehavior>
              <Breadcrumbs.Link isCurrent={isCurrent}>{text}</Breadcrumbs.Link>
            </NextLink>
            {isCurrent ? null : <Breadcrumbs.Separator />}
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs.Container>
  );
}
