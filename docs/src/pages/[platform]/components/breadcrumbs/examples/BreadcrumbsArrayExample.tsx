import { Breadcrumbs } from '@aws-amplify/ui-react';

const breadcrumbs = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/react/components',
    text: 'Components',
  },
  {
    href: '/react/components/breadcrumbs',
    text: 'Breadcrumbs',
    isCurrent: true,
  },
];

export default function BreadcrumbsArrayExample() {
  return (
    <Breadcrumbs>
      {breadcrumbs.map(({ href, text, isCurrent }) => (
        <Breadcrumbs.Item isCurrent={isCurrent} key={href}>
          <Breadcrumbs.Link href={href}>{text}</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
}
