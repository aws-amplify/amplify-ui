import { SelectField, useTheme } from '@aws-amplify/ui-react';

export const SelectFieldInputStyleExample = () => {
  const { tokens } = useTheme();

  return (
    <SelectField
      label="Fruit"
      labelHidden={true}
      placeholder="Please select a fruit"
      inputStyles={{
        backgroundColor: tokens.colors.background.success,
      }}
    >
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectField>
  );
};
