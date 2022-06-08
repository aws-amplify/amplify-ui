import { SliderField, useTheme } from '@aws-amplify/ui-react';

export const SliderFieldStylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <SliderField
      label="Style Props Slider"
      filledTrackColor={tokens.colors.green[80]}
      emptyTrackColor={tokens.colors.green[20]}
      thumbColor={tokens.colors.red[60]}
      trackSize="15px"
      defaultValue={50}
    />
  );
};
