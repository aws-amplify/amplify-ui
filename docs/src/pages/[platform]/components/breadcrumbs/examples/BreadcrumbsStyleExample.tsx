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
    text: 'Breadcrumbs',
    isCurrent: true,
  },
];

export default function BreadcrumbsStyleExample() {
  return (
    <Breadcrumbs.Container
      backgroundColor="background.tertiary"
      borderRadius="medium"
      padding="medium"
    >
      {breadcrumbs.map(({ href, text, isCurrent }, idx) => (
        <Breadcrumbs.Item key={`${href}${idx}`}>
          <Breadcrumbs.Link
            fontWeight="bold"
            textDecoration="underline"
            href={href}
            isCurrent={isCurrent}
          >
            {text}
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs.Container>
  );
}
