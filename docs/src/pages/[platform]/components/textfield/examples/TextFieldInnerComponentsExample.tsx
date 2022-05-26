import {
  Flex,
  FieldGroupIcon,
  FieldGroupIconButton,
  IconInfo,
  IconSearch,
  TextField,
} from '@aws-amplify/ui-react';

export const TextFieldInnerComponentsExample = () => (
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
