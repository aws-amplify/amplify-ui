import Link from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

export default function NextBreadcrumbsExample() {
  const router = useRouter();

  // Remove any query parameters, as those aren't included in breadcrumbs
  const asPathWithoutQuery = router.asPath.split('?')[0];

  // Break down the path between "/"s, removing empty entities
  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter((v) => v.length > 0);

  // Iterate over the list of nested route parts and build
  // a "crumb" object for each one.
  const crumblist = asPathNestedRoutes.map((subpath, idx) => {
    // We can get the partial nested route for the crumb
    // by joining together the path parts up to this point.
    const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
    // The title will just be the route string for now
    const text = subpath;
    return { href, text };
  });

  // Add in a default "Home" crumb for the top-level
  const breadcrumbs = [{ href: '/', text: 'Home' }, ...crumblist];

  return (
    <Breadcrumbs>
      {breadcrumbs.map(({ href, text }, i) => {
        const isCurrent = i === breadcrumbs.length - 1;
        return (
          <Breadcrumbs.Item isCurrent={isCurrent} key={href}>
            <Link href={href} passHref>
              <Breadcrumbs.Link isCurrent={isCurrent}>{text}</Breadcrumbs.Link>
            </Link>
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs>
  );
}
