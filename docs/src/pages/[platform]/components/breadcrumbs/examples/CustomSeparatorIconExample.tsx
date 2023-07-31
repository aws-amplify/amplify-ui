import { Breadcrumbs } from '@aws-amplify/ui-react';
import { MdChevronRight } from 'react-icons/md';

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

export default function CustomSeparatorIconExample() {
  return (
    <Breadcrumbs separator={<MdChevronRight />}>
      {breadcrumbs.map(({ href, text, isCurrent }) => (
        <Breadcrumbs.Item isCurrent={isCurrent} key={href}>
          <Breadcrumbs.Link href={href}>{text}</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
}
