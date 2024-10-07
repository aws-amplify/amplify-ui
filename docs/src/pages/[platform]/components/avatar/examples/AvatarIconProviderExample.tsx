import { Avatar, Flex, IconsProvider } from '@aws-amplify/ui-react';
import { FiUser } from 'react-icons/fi';

export default function AvatarIconProviderExample() {
  return (
    <IconsProvider
      icons={{
        avatar: {
          user: <FiUser />,
        },
      }}
    >
      <Flex direction="column">
        <Avatar />
      </Flex>
    </IconsProvider>
  );
}
