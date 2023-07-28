import { Breadcrumbs } from '@aws-amplify/ui-react';

export default function CustomSeparatorExample() {
  return (
    <Breadcrumbs separator={<span>|</span>}>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/category">Category</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/category/item">Type</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isCurrent>
        <Breadcrumbs.Link href="/category/type/item">Item</Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
