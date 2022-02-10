import { ImageOptions } from '@aws-amplify/ui-react';
import * as React from 'react';

import { ImagePropControlsProps } from './ImagePropControls';

interface UseImageProps {
  (initialValues: ImageOptions): ImagePropControlsProps;
}

export const useImageProps: UseImageProps = (initialValues) => {
  const [alt, setAlt] = React.useState<ImageOptions['alt']>(initialValues.alt);
  const [sizes, setSizes] = React.useState<ImageOptions['sizes']>(
    initialValues.sizes
  );
  const [src, setSrc] = React.useState<ImageOptions['src']>(initialValues.src);
  const [srcSet, setSrcSet] = React.useState<ImageOptions['srcSet']>(
    initialValues.srcSet
  );
  const [objectFit, setObjectFit] = React.useState<ImageOptions['objectFit']>(
    initialValues.objectFit
  );
  const [objectPosition, setObjectPosition] = React.useState<
    ImageOptions['objectPosition']
  >(initialValues.objectPosition);

  return {
    alt,
    sizes,
    src,
    srcSet,
    objectFit,
    objectPosition,
    setAlt,
    setSizes,
    setSrc,
    setSrcSet,
    setObjectFit,
    setObjectPosition,
  };
};
