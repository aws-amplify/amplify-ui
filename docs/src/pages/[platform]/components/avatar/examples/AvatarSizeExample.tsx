import { Avatar, Flex } from '@aws-amplify/ui-react';

export default function AvatarSizeExample() {
  return (
    <Flex direction="row">
      <Avatar size="small" />
      <Avatar />
      <Avatar size="large" />
      <Avatar size="small">DB</Avatar>
      <Avatar>DB</Avatar>
      <Avatar size="large">DB</Avatar>
    </Flex>
  );
}
