import * as React from 'react';

import {
  TextField,
  Text,
  Flex,
  Button,
  View,
  FieldGroupIcon,
  IconClose,
  IconInfo,
  FieldGroupIconButton,
  IconSearch,
} from '@aws-amplify/ui-react';

export const DescriptiveTextFieldExample = () => {
  return (
    <View width="100%">
      <TextField
        type="password"
        label="Password"
        descriptiveText={
          <Text
            as="span"
            color="rebeccapurple"
            fontStyle="italic"
            fontSize="0.8rem"
          >
            Password length must be greater than 8 characters
          </Text>
        }
      />
    </View>
  );
};

export const RequiredTextFieldExample = () => (
  <Flex as="form" direction="column" width="20rem">
    <TextField
      label={
        <Text>
          Email
          <Text as="span" fontSize="0.8rem" color="red">
            {' '}
            (required)
          </Text>
        </Text>
      }
      type="email"
      name="email"
      isRequired={true}
    />
    <TextField
      label="Password"
      descriptiveText={
        <Text as="span" fontSize="0.8rem" color="red" fontStyle="italic">
          Required
        </Text>
      }
      type="email"
      name="email"
      isRequired={true}
    />
    <Button type="submit">Submit</Button>
  </Flex>
);

export const TextFieldStyledPropsExample = () => (
  <TextField
    direction="row"
    alignItems="baseline"
    fontSize="1.5rem"
    label={
      <Text fontWeight="bold" fontSize="1.5rem">
        Name:
      </Text>
    }
    backgroundColor="#fff1e7"
    color="#000"
    width="400px"
  />
);

export const TextFieldStartEndComponentsExample = () => (
  <Flex gap="1rem" direction="column">
    <TextField label="Start" outerStartComponent={<Button>Start</Button>} />
    <TextField
      label="Start and End"
      outerStartComponent={<Button>Start</Button>}
      outerEndComponent={<Button>End</Button>}
    />
    <TextField label="End" outerEndComponent={<Button>End</Button>} />
    <TextField
      label="Multiple End"
      outerEndComponent={
        <>
          <Button>End</Button>
          <Button>End</Button>
        </>
      }
    />
    <TextField
      label="Multiple Start"
      outerStartComponent={
        <>
          <Button>Start</Button>
          <Button>Start</Button>
        </>
      }
    />
  </Flex>
);

export const TextFieldStartEndIconExample = () => (
  <Flex gap="1rem" direction="column">
    <TextField
      label="Start and End"
      innerStartComponent={
        <FieldGroupIcon ariaLabel="">
          {/** Accessibility tip: pass empty ariaLabel for decorative icons. */}
          <IconInfo />
        </FieldGroupIcon>
      }
      innerEndComponent={
        <FieldGroupIconButton
          ariaLabel="Search"
          variation="link"
          onClick={() => alert('😎')}
        >
          <IconSearch />
        </FieldGroupIconButton>
      }
    />
  </Flex>
);
export const TextFieldStartEndComponentAndIconExample = () => (
  <Flex gap="1rem" direction="column">
    <TextField
      label="Start and End inner and outer components"
      outerStartComponent={<Button>Start</Button>}
      outerEndComponent={<Button>End</Button>}
      innerStartComponent={
        <FieldGroupIcon ariaLabel="">
          {/** Accessibility tip: pass empty ariaLabel for decorative icons. */}
          <IconInfo />
        </FieldGroupIcon>
      }
      innerEndComponent={
        <FieldGroupIconButton
          ariaLabel="Search"
          variation="link"
          onClick={() => alert('😎')}
        >
          <IconSearch />
        </FieldGroupIconButton>
      }
    />
  </Flex>
);
