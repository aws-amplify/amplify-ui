import { Button, Flex } from '@aws-amplify/ui-react';
import { MdCheck } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';

export const PrimaryVariation = () => {
  return (
    <Flex direction="column">
      <Flex>
        <Button variation="link" colorTheme="success">
          <Flex as="span" gap="xs" alignItems="center">
            <MdCheck style={{ fontSize: '1.2rem' }} />
            Approve
          </Flex>
        </Button>
        <Button variation="primary" colorTheme="error">
          <Flex as="span" gap="xs" alignItems="center">
            <BsFillTrashFill style={{ fontSize: '1.2rem' }} />
            Delete
          </Flex>
        </Button>
        <Button colorTheme="warning">
          <Flex as="span" gap="xs" alignItems="center">
            Mark as deprecated
          </Flex>
        </Button>
      </Flex>
      <code>variation=&quot;primary&quot;</code>
      <Flex>
        <Button variation="primary">Brand</Button>
        <Button variation="primary" colorTheme="info">
          Info
        </Button>
        <Button variation="primary" colorTheme="warning">
          Warning
        </Button>
        <Button variation="primary" colorTheme="error">
          Primary
        </Button>
        <Button variation="primary" colorTheme="success">
          Success
        </Button>
        <Button variation="primary" colorTheme="neutral">
          Neutral
        </Button>
      </Flex>
    </Flex>
  );
};
