import { Rating, IconStarBorder } from '@aws-amplify/ui-react';

export const RatingEmptyExample = () => {
  return <Rating value={2.5} emptyIcon={<IconStarBorder />} />;
};
