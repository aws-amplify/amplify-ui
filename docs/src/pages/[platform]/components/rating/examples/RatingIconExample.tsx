import { Rating, Icon } from '@aws-amplify/ui-react';

const IconAdd = () => {
  return (
    <Icon
      ariaLabel="No rating"
      pathData="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
    />
  );
};

export const RatingIconExample = () => {
  return <Rating value={2.5} icon={<IconAdd />} />;
};
