import { SelectField, IconsProvider } from '@aws-amplify/ui-react';
import { FiChevronsDown } from 'react-icons/fi';

export const SelectFieldIconProviderExample = () => (
  <IconsProvider
    icons={{
      select: {
        expand: <FiChevronsDown />,
      },
    }}
  >
    <SelectField label="Fruit">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectField>
  </IconsProvider>
);
