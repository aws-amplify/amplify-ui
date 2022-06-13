import {
  Flex,
  FieldGroupIcon,
  FieldGroupIconButton,
  TextField,
} from '@aws-amplify/ui-react';
import { IconInfo, IconSearch } from '@aws-amplify/ui-react/internal';

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
