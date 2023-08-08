import { Breadcrumbs } from '@aws-amplify/ui-react';

const MySeparator = () => <Breadcrumbs.Separator>{`//`}</Breadcrumbs.Separator>;

export default function BreadcrumbsSeparatorExample() {
  return (
    <Breadcrumbs separator={<MySeparator />}>
      <Breadcrumbs.Item>
        {/* Add a separator at the beginning */}
        <MySeparator />
        <Breadcrumbs.Link href="/react/components">Home</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/react/components">Components</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isCurrent>
        <Breadcrumbs.Link>Breadcrumbs</Breadcrumbs.Link>
        {/* Add a separator at the end */}
        <MySeparator />
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
