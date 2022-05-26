import { Image } from '@aws-amplify/ui-react';

export const ImageOptimizationExample = () => {
  return (
    <Image
      src="/road-to-milford-new-zealand-800w.jpg"
      srcSet="/road-to-milford-new-zealand-800w.jpg 800w,
          /road-to-milford-new-zealand-1200w.jpg 1200w,
          /road-to-milford-new-zealand-1400w.jpg 1400w"
      alt="View from road to Milford Sound, New Zealand.
      Glittering stream with old log, snowy mountain peaks
      tower over a green field."
    />
  );
};
