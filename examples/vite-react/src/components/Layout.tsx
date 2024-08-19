import * as React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <Box p="6">{children}</Box>
    </Flex>
  );
};
