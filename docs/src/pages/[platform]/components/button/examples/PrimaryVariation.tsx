import { Button, Flex } from '@aws-amplify/ui-react';
import { MdCheck } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';

export const PrimaryVariation = () => {
  return (
    <Flex>
      <Button variation="primary">brand</Button>
      <Button variation="primary" colorTheme="info">
        info
      </Button>
      <Button variation="primary" colorTheme="warning">
        warning
      </Button>
      <Button variation="primary" colorTheme="error">
        error
      </Button>
      <Button variation="primary" colorTheme="success">
        success
      </Button>
      <Button variation="primary" colorTheme="neutral">
        neutral
      </Button>
    </Flex>
  );
};
