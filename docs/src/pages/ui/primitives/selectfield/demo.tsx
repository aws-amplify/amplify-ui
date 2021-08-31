import React, { useState } from 'react';

import { SelectField, View } from '@aws-amplify/ui-react';

import { SelectFieldPropControls } from '@/components/SelectFieldPropControls';
import { useSelectFieldProps } from '@/components/useSelectFieldProps';

export const SelectDemo = () => {
  const selectProps = useSelectFieldProps({
    label: 'Fruit',
    labelHidden: true,
    hasError: false,
  });
  return (
    <View>
      <SelectFieldPropControls {...selectProps} />
      <View className="mt-8">
        <SelectField
          name="fruits"
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
      </View>
    </View>
  );
};

export const ControlledSelect = () => {
  const [value, setValue] = useState('');
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
