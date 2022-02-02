import {
  Button,
  Flex,
  FieldGroupIcon,
  FieldGroupIconButton,
  IconInfo,
  IconSearch,
  TextField,
} from '@aws-amplify/ui-react';

export const TextFieldOuterAndInnerComponentsExample = () => (
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
