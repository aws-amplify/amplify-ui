import { Rating } from '@aws-amplify/ui-react';

export const RatingSizeExample = () => {
  return (
    <>
      <Rating value={2.5} size="small" />
      <Rating value={2.5} />
      <Rating value={2.5} size="large" />
    </>
  );
};
