import { Breadcrumbs } from '@aws-amplify/ui-react';

export default function ComposableBreadcrumbsExample() {
  return (
    <Breadcrumbs.Container>
      <Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/react/components">Components</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/react/components/breadcrumbs" isCurrent>
          Breadcrumbs
        </Breadcrumbs.Link>
        <Breadcrumbs.Separator />
      </Breadcrumbs.Item>
    </Breadcrumbs.Container>
  );
}
