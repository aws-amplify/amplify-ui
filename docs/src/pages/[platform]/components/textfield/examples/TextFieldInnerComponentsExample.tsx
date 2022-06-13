import {
  Flex,
  FieldGroupIcon,
  FieldGroupIconButton,
  TextField,
} from '@aws-amplify/ui-react';
import { MdInfo, MdSearch } from 'react-icons/md';

export const TextFieldInnerComponentsExample = () => (
  <Flex gap="1rem" direction="column">
    <TextField
      label="Start and End"
      innerStartComponent={
        <FieldGroupIcon ariaLabel="">
          {/** Accessibility tip: pass empty ariaLabel for decorative icons. */}
          <MdInfo />
        </FieldGroupIcon>
      }
      innerEndComponent={
        <FieldGroupIconButton
          ariaLabel="Search"
          variation="link"
          onClick={() => alert('😎')}
        >
          <MdSearch />
        </FieldGroupIconButton>
      }
    />
  </Flex>
);
