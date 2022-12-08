import * as React from 'react';

import { SelectField, SelectFieldProps } from '@aws-amplify/ui-react';
import { useSelectFieldProps } from './useSelectFieldProps';
import { SelectFieldPropControls } from './SelectFieldPropControls';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (selectFieldProps) => {
  return (
    `<SelectField` +
    `\n  label=${JSON.stringify(selectFieldProps.label)}` +
    (selectFieldProps.placeholder
      ? `\n  placeholder=${JSON.stringify(selectFieldProps.placeholder)}`
      : '') +
    (selectFieldProps.size
      ? `\n  size=${JSON.stringify(selectFieldProps.size)}`
      : '') +
    (selectFieldProps.variation
      ? `\n  variation=${JSON.stringify(selectFieldProps.variation)}`
      : '') +
    (selectFieldProps.descriptiveText
      ? `\n  descriptiveText=${JSON.stringify(
          selectFieldProps.descriptiveText
        )}`
      : '') +
    (selectFieldProps.errorMessage
      ? `\n  errorMessage=${JSON.stringify(selectFieldProps.errorMessage)}`
      : '') +
    (selectFieldProps.labelHidden
      ? `\n  labelHidden={${JSON.stringify(selectFieldProps.labelHidden)}}`
      : '') +
    (selectFieldProps.isDisabled
      ? `\n  isDisabled={${JSON.stringify(selectFieldProps.isDisabled)}}`
      : '') +
    `\n>` +
    `\n  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>` +
    `\n</SelectField>`
  );
};

const defaultSelectFieldProps = {
  descriptiveText: "What's your favorite fruit?",
  hasError: false,
  label: 'Fruit',
  labelHidden: false,
};

export const SelectFieldDemo = () => {
  const selectFieldProps = useSelectFieldProps(
    (demoState.get(SelectField.displayName) as SelectFieldProps) ||
      defaultSelectFieldProps
  );

  return (
    <Demo
      code={propsToCode(selectFieldProps)}
      propControls={<SelectFieldPropControls {...selectFieldProps} />}
    >
      <SelectField
        name="fruits"
        descriptiveText={selectFieldProps.descriptiveText}
        errorMessage={selectFieldProps.errorMessage}
        hasError={selectFieldProps.hasError}
        isDisabled={selectFieldProps.isDisabled}
        label={selectFieldProps.label}
        labelHidden={selectFieldProps.labelHidden}
        placeholder="Please select a fruit"
        size={selectFieldProps.size}
        variation={selectFieldProps.variation}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </SelectField>
    </Demo>
  );
};
