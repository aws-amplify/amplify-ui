import * as React from 'react';
import { Alert, Heading, SelectField } from '@aws-amplify/ui-react';

interface SelectProps<T extends string> {
  name: string;
  currentSelection: T;
  onChange: (selection: T) => void;
  options: T[];
}
export function ConfigSelect<T extends string>({
  name,
  currentSelection,
  onChange,
  options,
}: SelectProps<T>) {
  return (
    <Alert variation="info" hasIcon={false}>
      <Heading>{`Select ${name}`}</Heading>
      <SelectField
        label=""
        value={currentSelection}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((options) => (
          <option key={options} value={options}>
            {options}
          </option>
        ))}
      </SelectField>
    </Alert>
  );
}
