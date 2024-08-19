import * as React from 'react';
import { Box, Flex, Img } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Box boxShadow="md">
      <Flex direction="row" p="6" alignItems="center">
        <Link to="/">
          <Img src="/logo.svg" height="2rem" />
        </Link>
        <Link to="/storage/storage-manager">Storage</Link>
      </Flex>
    </Box>
  );
};
