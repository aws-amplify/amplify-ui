import { Avatar, Flex } from '@aws-amplify/ui-react';

export default function AvatarLoadingExample() {
  return (
    <Flex>
      <Avatar isLoading />
      <Avatar isLoading colorTheme="info" />
      <Avatar isLoading variation="outlined" colorTheme="success" />
    </Flex>
  );
}
