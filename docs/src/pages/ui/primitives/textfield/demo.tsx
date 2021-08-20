import {
  TextField,
  Text,
  Flex,
  Button,
  View,
  Heading,
  Divider,
} from '@aws-amplify/ui-react';

import * as React from 'react';

export const TextFieldDemo = () => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <View maxWidth="500px" padding="2rem">
      <Heading level={2}>Checkout Form</Heading>
      <Heading level={3}>Billing Address</Heading>
      <Divider size="large" />
      <Flex gap="2rem" direction="column">
        <TextField
          id="first_name"
          label="First name"
          defaultValue="Scott"
          name="first_name"
          descriptiveText={
            <Text as="span" color="red">
              Required
            </Text>
          }
          onChange={(e) => console.info(e.target.value)}
          onFocus={(e) => console.info('text field focused', e)}
          onBlur={(e) => console.info('text field blurred', e)}
        />
        <TextField
          label="Last name"
          defaultValue="Rees"
          name="last_name"
          descriptiveText={
            <Text color="red" fontStyle="italic" fontSize="0.8rem">
              Required
            </Text>
          }
          onChange={(e) => console.info(e.target.value)}
          onFocus={(e) => console.info('text field focused', e)}
          onBlur={(e) => console.info('text field blurred', e)}
        />

        <Flex>
          <p>size: small</p>
          <TextField
            size="small"
            isDisabled
            labelHidden={true}
            label="Search"
            placeholder="Search"
          />
          <Button size="small">Search</Button>
        </Flex>
        <Flex>
          <p>size: default</p>
          <TextField labelHidden={true} label="Search" placeholder="Search" />
          <Button>Search</Button>
        </Flex>
        <Flex>
          <p>size: large</p>
          <TextField
            labelHidden={true}
            size="large"
            label="Search"
            placeholder="Search"
          />
          <Button size="large">Search</Button>
        </Flex>
      </Flex>
    </View>
  );
};
