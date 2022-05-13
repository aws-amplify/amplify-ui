import { SliderField, useTheme } from '@aws-amplify/ui-react';

export const SliderFieldStylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <SliderField
      label="Style Props Slider"
      filledTrackColor={tokens.colors.green[80].value}
      emptyTrackColor={tokens.colors.green[20].value}
      thumbColor="red"
      trackSize="15px"
      defaultValue={50}
    />
  );
};
