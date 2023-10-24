import { Badge, Icon, Tabs } from '@aws-amplify/ui-react';

const IconEmail = () => {
  return (
    <Icon
      pathData="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
      ariaLabel=""
    />
  );
};

export const BadgeIcons = () => (
  <Tabs.Container defaultValue="1">
    <Tabs.List>
      <Tabs.Item value="1">
        Email{' '}
        <Badge size="small" variation="info">
          21
        </Badge>
      </Tabs.Item>
      <Tabs.Item value="2">
        <IconEmail /> Email
      </Tabs.Item>
    </Tabs.List>
    <Tabs.Panel value="1">Content of the first tab</Tabs.Panel>
    <Tabs.Panel value="2">Content of the second tab</Tabs.Panel>
  </Tabs.Container>
);
