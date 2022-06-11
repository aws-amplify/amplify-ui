import { Rating, useTheme } from '@aws-amplify/ui-react';

export const RatingColorExample = () => {
  const { tokens } = useTheme();
  return (
    <Rating
      value={2.5}
      fillColor={tokens.colors.red[60]}
      emptyColor={tokens.colors.green[60]}
    />
  );
};
