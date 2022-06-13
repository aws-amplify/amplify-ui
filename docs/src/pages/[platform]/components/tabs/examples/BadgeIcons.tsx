import { Badge, Icon, Tabs, TabItem } from '@aws-amplify/ui-react';

const IconEmail = () => {
  return (
    <Icon
      pathData="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
      ariaLabel=""
    />
  );
};

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
