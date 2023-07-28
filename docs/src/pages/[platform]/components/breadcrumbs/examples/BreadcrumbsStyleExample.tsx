import { Breadcrumbs } from '@aws-amplify/ui-react';

const breadcrumbs = [
  {
    href: 'test',
    text: 'test',
  },
  {
    href: 'test',
    text: 'test',
    isCurrent: true,
  },
];

export default function BreadcrumbsStyleExample() {
  return (
    <Breadcrumbs
      backgroundColor="background.tertiary"
      borderRadius="medium"
      padding="medium"
    >
      {breadcrumbs.map(({ href, text, isCurrent }) => (
        <Breadcrumbs.Item isCurrent={isCurrent}>
          <Breadcrumbs.Link
            fontWeight="bold"
            textDecoration="underline"
            href={href}
          >
            {text}
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
}
