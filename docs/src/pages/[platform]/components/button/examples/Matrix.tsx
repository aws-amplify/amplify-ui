import * as React from 'react';
import { Button, Flex, Heading } from '@aws-amplify/ui-react';

export const Matrix = () => {
  return (
    <Flex direction="column" gap="medium">
      <Heading level={3} fontSize="medium">
        Outlined (default) variation
      </Heading>
      <Flex>
        <Button>normal</Button>
        <Button isDisabled={true}>disabled</Button>
        <Button isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>
      <Flex>
        <Button colorTheme="info">normal</Button>
        <Button colorTheme="info" isDisabled={true}>
          disabled
        </Button>
        <Button colorTheme="info" isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>
      <Flex>
        <Button colorTheme="error">normal</Button>
        <Button colorTheme="error" isDisabled={true}>
          disabled
        </Button>
        <Button colorTheme="error" isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>
      <Flex>
        <Button colorTheme="success">normal</Button>
        <Button colorTheme="success" isDisabled={true}>
          disabled
        </Button>
        <Button colorTheme="success" isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>
      <Flex>
        <Button colorTheme="warning">normal</Button>
        <Button colorTheme="warning" isDisabled={true}>
          disabled
        </Button>
        <Button colorTheme="warning" isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>

      <Heading level={3} fontSize="medium" marginTop="large">
        Primary variation
      </Heading>
      <Flex>
        <Button variation="primary">normal</Button>
        <Button variation="primary" isDisabled={true}>
          disabled
        </Button>
        <Button variation="primary" isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="primary" colorTheme="info">
          normal
        </Button>
        <Button variation="primary" colorTheme="info" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="primary"
          colorTheme="info"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="primary" colorTheme="error">
          normal
        </Button>
        <Button variation="primary" colorTheme="error" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="primary"
          colorTheme="error"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="primary" colorTheme="success">
          normal
        </Button>
        <Button variation="primary" colorTheme="success" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="primary"
          colorTheme="success"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="primary" colorTheme="warning">
          normal
        </Button>
        <Button variation="primary" colorTheme="warning" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="primary"
          colorTheme="warning"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>

      <Heading level={3} fontSize="medium" marginTop="large">
        Link variation
      </Heading>
      <Flex>
        <Button variation="link">normal</Button>
        <Button variation="link" isDisabled={true}>
          disabled
        </Button>
        <Button variation="link" isLoading={true} loadingText="loading">
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="link" colorTheme="info">
          normal
        </Button>
        <Button variation="link" colorTheme="info" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="link"
          colorTheme="info"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="link" colorTheme="error">
          normal
        </Button>
        <Button variation="link" colorTheme="error" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="link"
          colorTheme="error"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="link" colorTheme="success">
          normal
        </Button>
        <Button variation="link" colorTheme="success" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="link"
          colorTheme="success"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
      <Flex>
        <Button variation="link" colorTheme="warning">
          normal
        </Button>
        <Button variation="link" colorTheme="warning" isDisabled={true}>
          disabled
        </Button>
        <Button
          variation="link"
          colorTheme="warning"
          isLoading={true}
          loadingText="loading"
        >
          loading
        </Button>
      </Flex>
    </Flex>
  );
};
