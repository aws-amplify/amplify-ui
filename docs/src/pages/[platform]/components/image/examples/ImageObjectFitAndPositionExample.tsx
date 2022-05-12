import { Image } from '@aws-amplify/ui-react';

export const ImageObjectFitAndPositionExample = () => {
  return (
    <Image
      width="100%"
      height="100%"
      objectFit="cover"
      objectPosition="50% 50%"
      src="/road-to-milford-new-zealand-800w.jpg"
      alt="Glittering stream with old log, snowy mountain peaks
    tower over a green field."
    />
  );
};
