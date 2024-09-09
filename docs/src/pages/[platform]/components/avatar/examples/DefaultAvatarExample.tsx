import { Avatar, Flex } from '@aws-amplify/ui-react';
import { FiSmile } from 'react-icons/fi';

export default function DefaultAvatarExample() {
  return (
    <Flex direction="row">
      {/* Avatar with image */}
      <Avatar src="/cats/5.jpg" alt="my cat" />
      {/* Avatar with default placeholder icon */}
      <Avatar />
      {/* Avatar with initials */}
      <Avatar>DB</Avatar>
      {/* Avatar with custom icon */}
      <Avatar>
        <FiSmile style={{ width: '60%', height: '60%' }} />
      </Avatar>
    </Flex>
  );
}
