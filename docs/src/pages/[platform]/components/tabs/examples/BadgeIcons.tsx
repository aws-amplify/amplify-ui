import { Badge, IconEmail, Tabs, TabItem } from '@aws-amplify/ui-react';

export const BadgeIcons = () => (
  <Tabs>
    <TabItem
      title={
        <>
          Email{' '}
          <Badge size="small" variation="info">
            21
          </Badge>
        </>
      }
    >
      Content of the first tab
    </TabItem>
    <TabItem
      title={
        <>
          <IconEmail /> Email
        </>
      }
    >
      Content of the second tab
    </TabItem>
  </Tabs>
);
