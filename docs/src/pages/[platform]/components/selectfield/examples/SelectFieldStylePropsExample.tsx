import { SelectField, useTheme } from '@aws-amplify/ui-react';

export const SelectFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <SelectField
        label="Fruit"
        padding="xl"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </SelectField>
      <SelectField
        label="Fruit"
        inputStyles={{
          backgroundColor: 'brand.primary.10',
          border: `1px solid ${tokens.colors.brand.primary[60]}`,
        }}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </SelectField>
    </>
  );
};
