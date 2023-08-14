import { Breadcrumbs, SelectField } from '@aws-amplify/ui-react';

export default function BreadcrumbsWithDropdownExample() {
  return (
    <Breadcrumbs.Container>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/react/components">Components</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <SelectField
          label="branch"
          labelHidden
          variation="quiet"
          size="small"
          options={['Breadcrumbs', 'Breadcrumbs.Item', 'Breadcrumbs.Link']}
        />
      </Breadcrumbs.Item>
    </Breadcrumbs.Container>
  );
}
