import { SliderField } from '@aws-amplify/ui-react';

export const SliderFieldFormatValueExample = () => {
  const formatValue = (value: number) => {
    return `${value}%`;
  };
  return (
    <SliderField
      label="SliderField with formatted value"
      defaultValue={50}
      formatValue={formatValue}
    />
  );
};
