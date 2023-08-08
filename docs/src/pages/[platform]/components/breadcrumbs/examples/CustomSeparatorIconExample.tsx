import { Breadcrumbs } from '@aws-amplify/ui-react';
import { MdChevronRight } from 'react-icons/md';

export default function CustomSeparatorIconExample() {
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
      separator={<MdChevronRight />}
    />
  );
}
