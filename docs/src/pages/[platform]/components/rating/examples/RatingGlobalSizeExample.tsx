import { Rating } from '@aws-amplify/ui-react';

export const RatingGlobalSizeExample = () => {
  return (
    <Rating value={2.5} className="application-size-override" size="small" />
  );
};
