import { Avatar, Flex } from '@aws-amplify/ui-react';

export default function AvatarColorExample() {
  return (
    <Flex direction="column">
      <Flex direction="row">
        <Avatar />
        <Avatar colorTheme="info" />
        <Avatar colorTheme="success" />
        <Avatar colorTheme="warning" />
        <Avatar colorTheme="error" />
      </Flex>
      <Flex direction="row">
        <Avatar variation="outlined" />
        <Avatar variation="outlined" colorTheme="info" />
        <Avatar variation="outlined" colorTheme="success" />
        <Avatar variation="outlined" colorTheme="warning" />
        <Avatar variation="outlined" colorTheme="error" />
      </Flex>
      <Flex direction="row">
        <Avatar variation="filled" />
        <Avatar variation="filled" colorTheme="info" />
        <Avatar variation="filled" colorTheme="success" />
        <Avatar variation="filled" colorTheme="warning" />
        <Avatar variation="filled" colorTheme="error" />
      </Flex>
    </Flex>
  );
}
