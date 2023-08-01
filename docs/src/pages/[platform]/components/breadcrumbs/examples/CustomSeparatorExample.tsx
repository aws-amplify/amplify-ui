import { Breadcrumbs } from '@aws-amplify/ui-react';

export default function CustomSeparatorExample() {
  return (
    <Breadcrumbs separator={'|'}>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/react/components">Home</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/react/components">Components</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isCurrent>
        <Breadcrumbs.Link>Breadcrumbs</Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
