import { ImageOptions, BaseStyleProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { ImagePropControlsProps } from './ImagePropControls';

interface UseImageProps {
  (initialValues: ImageOptions & BaseStyleProps): ImagePropControlsProps;
}

export const useImageProps: UseImageProps = (initialValues) => {
  const [alt, setAlt] = React.useState<ImageOptions['alt']>(initialValues.alt);
  const [src, setSrc] = React.useState<ImageOptions['src']>(initialValues.src);
  const [objectFit, setObjectFit] = React.useState<ImageOptions['objectFit']>(
    initialValues.objectFit
  );
  const [objectPosition, setObjectPosition] = React.useState<
    ImageOptions['objectPosition']
  >(initialValues.objectPosition);
  const [backgroundColor, setBackgroundColor] = React.useState<
    BaseStyleProps['backgroundColor']
  >(initialValues.backgroundColor);
  const [height, setHeight] = React.useState<BaseStyleProps['height']>(
    initialValues.height
  );
  const [width, setWidth] = React.useState<BaseStyleProps['width']>(
    initialValues.width
  );
  const [opacity, setOpacity] = React.useState<BaseStyleProps['opacity']>(
    initialValues.opacity
  );

  return React.useMemo(
    () => ({
      alt,
      setAlt,
      src,
      setSrc,
      objectFit,
      setObjectFit,
      objectPosition,
      setObjectPosition,
      backgroundColor,
      setBackgroundColor,
      height,
      setHeight,
      width,
      setWidth,
      opacity,
      setOpacity,
    }),
    [
      alt,
      setAlt,
      src,
      setSrc,
      objectFit,
      setObjectFit,
      objectPosition,
      setObjectPosition,
      backgroundColor,
      setBackgroundColor,
      height,
      setHeight,
      width,
      setWidth,
      opacity,
      setOpacity,
    ]
  );
};
