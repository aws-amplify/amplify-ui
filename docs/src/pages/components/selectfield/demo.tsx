import * as React from 'react';

import { SelectField, Flex } from '@aws-amplify/ui-react';

import { SelectFieldPropControls } from '@/components/SelectFieldPropControls';
import { useSelectFieldProps } from '@/components/useSelectFieldProps';

export const SelectDemo = () => {
  const selectProps = useSelectFieldProps({
    label: '',
    labelHidden: false,
    hasError: false,
  });
  return (
    <Flex direction="column">
      <SelectFieldPropControls {...selectProps} />
      <SelectField
        name="fruits"
        descriptiveText={selectProps.descriptiveText}
        errorMessage={selectProps.errorMessage}
        hasError={selectProps.hasError}
        isDisabled={selectProps.isDisabled}
        label={selectProps.label}
        labelHidden={selectProps.labelHidden}
        placeholder="Please select a fruit"
        size={selectProps.size}
        variation={selectProps.variation}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </SelectField>
    </Flex>
  );
};

export const ControlledSelect = () => {
  const [value, setValue] = React.useState('');
  return (
    <SelectField
      label="Fruit"
      labelHidden={true}
      value={value}
      placeholder="Please select a fruit"
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectField>
  );
};
