import { Rating, Icon } from '@aws-amplify/ui-react';

const IconStarBorder = () => {
  return (
    <Icon
      ariaLabel="No rating"
      pathData="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z"
    />
  );
};

export const RatingEmptyExample = () => {
  return <Rating value={2.5} emptyIcon={<IconStarBorder />} />;
};
