import { Rating, IconAdd } from '@aws-amplify/ui-react';

export const RatingIconExample = () => {
  return <Rating value={2.5} icon={<IconAdd />} />;
};
