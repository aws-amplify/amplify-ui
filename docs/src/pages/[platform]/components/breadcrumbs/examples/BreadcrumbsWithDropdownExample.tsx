import { Breadcrumbs, SelectField } from '@aws-amplify/ui-react';

export default function BreadcrumbsWithDropdownExample() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/components">Components</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isCurrent>
        <SelectField
          label="branch"
          labelHidden
          variation="quiet"
          size="small"
          options={['Breadcrumbs', 'Breadcrumbs.Item', 'Breadcrumbs.Link']}
        />
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
