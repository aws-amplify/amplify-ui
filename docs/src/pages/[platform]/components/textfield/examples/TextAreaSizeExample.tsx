import {
  Flex,
  TextField,
  TextFieldProps,
  SelectField,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export const TextAreaSizeExample = () => {
  const [size, setSize] = React.useState('default');

  return (
    <Flex direction="column">
      <SelectField
        label="Choose a size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as TextFieldProps['size'])
        }
      >
        <option value="small">small</option>
        <option value="default">default</option>
        <option value="large">large</option>
      </SelectField>
      <TextField
        label="Sizes"
        labelHidden
        size={size as TextFieldProps['size']}
        isMultiline
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </Flex>
  );
};
