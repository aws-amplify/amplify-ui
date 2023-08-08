import { Breadcrumbs } from '@aws-amplify/ui-react';

export default function NoSeparatorExample() {
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
        },
      ]}
      separator={null}
    />
  );
}
