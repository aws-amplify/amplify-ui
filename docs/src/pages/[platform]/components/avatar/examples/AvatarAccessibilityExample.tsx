import { Avatar, Flex } from '@aws-amplify/ui-react';

export default function AvatarAccessibilityExample() {
  return (
    <Flex direction="row">
      {/* Avatar with image and alt text */}
      <Avatar src="/cats/5.jpg" alt="My cat" />
      {/* Avatar with aria label */}
      <Avatar aria-label="profile icon" />
    </Flex>
  );
}
