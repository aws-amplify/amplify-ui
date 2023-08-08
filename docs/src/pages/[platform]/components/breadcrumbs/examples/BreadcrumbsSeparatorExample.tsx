import { Breadcrumbs } from '@aws-amplify/ui-react';

export default function BreadcrumbsSeparatorExample() {
  return (
    <Breadcrumbs
      items={[
        {
          href: '/',
          label: 'Home',
        },
        {
          href: '/react/components',
          label: 'Components',
        },
        {
          label: 'Breadcrumbs',
          isCurrent: true,
        },
      ]}
      separator={'|'}
    />
  );
}
