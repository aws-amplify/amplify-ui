import { Label, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <Label fontSize={tokens.fontSizes.xl} fontStyle="italic">
      Awesome label
    </Label>
  );
};
