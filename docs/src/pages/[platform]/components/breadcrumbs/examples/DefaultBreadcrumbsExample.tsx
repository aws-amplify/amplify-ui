import { Breadcrumbs } from '@aws-amplify/ui-react';

export default function DefaultBreadcrumbsExample() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/category">Category</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/category/item">Type</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isCurrent>
        <Breadcrumbs.Link isCurrent href="/category/type/item">
          Item
        </Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
