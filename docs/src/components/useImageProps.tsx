import { ImageOptions, ImageProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { ImagePropControlsProps } from './ImagePropControls';

interface UseImageProps {
  (initialValues: ImageOptions): ImagePropControlsProps;
}

export const useImageProps: UseImageProps = (initialValues) => {
  const [alt, setAlt] = useState<ImageOptions['alt']>(initialValues.alt);
  const [sizes, setSizes] = useState<ImageOptions['sizes']>(
    initialValues.sizes
  );
  const [src, setSrc] = useState<ImageOptions['src']>(initialValues.src);
  const [srcSet, setSrcSet] = useState<ImageOptions['srcSet']>(
    initialValues.srcSet
  );
  const [objectFit, setObjectFit] = useState<ImageOptions['objectFit']>(
    initialValues.objectFit
  );
  const [objectPosition, setObjectPosition] = useState<
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
