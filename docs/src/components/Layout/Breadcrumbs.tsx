import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumbs } from '@aws-amplify/ui-react';

export const DocsBreadcrumbs = () => {
  const { pathname } = useRouter();

  const nestedRoutes = pathname
    .replace('/[platform]', '')
    .split('#')[0]
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
    <Breadcrumbs>
      {breadcrumbs.map(({ href, text }, i) => {
        const isCurrent = i === breadcrumbs.length - 1;
        return (
          <Breadcrumbs.Item isCurrent={isCurrent} key={href}>
            <Link href={href} passHref>
              <Breadcrumbs.Link>{text}</Breadcrumbs.Link>
            </Link>
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs>
  );
};
