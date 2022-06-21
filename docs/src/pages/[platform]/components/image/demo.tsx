import * as React from 'react';
import { Image, ImageProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { ImagePropControls } from './ImagePropControls';
import { useImageProps } from './useImageProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props) => {
  return `<Image
  alt="${props.alt}"
  src="${props.src}"
  objectFit="${props.objectFit}"
  objectPosition="${props.objectPosition}"
  backgroundColor="${props.backgroundColor}"
  height="${props.height}"
  width="${props.width}"
  opacity="${props.opacity}"
  onClick={() => alert('📸 Say cheese!')}
/>`;
};

const defaultImageProps = {
  alt: 'Amplify logo',
  src: '/amplify-logo.svg',
  objectFit: 'initial',
  objectPosition: '50% 50%',
  width: '75%',
  height: '75%',
  backgroundColor: 'initial',
  opacity: '100%',
};

export const ImageDemo = () => {
  const imageProps = useImageProps(
    (demoState.get(Image.displayName) as ImageProps) || defaultImageProps
  );

  React.useEffect(() => {
    demoState.set(Image.displayName, imageProps);
  }, [imageProps]);

  return (
    <Demo
      code={propsToCode({ ...imageProps })}
      propControls={<ImagePropControls {...imageProps} />}
    >
      <Image
        alt={imageProps.alt}
        src={imageProps.src}
        objectFit={imageProps.objectFit}
        objectPosition={imageProps.objectPosition}
        backgroundColor={imageProps.backgroundColor}
        height={imageProps.height}
        width={imageProps.width}
        opacity={imageProps.opacity}
        onClick={() => alert('📸 Say cheese!')}
      />
    </Demo>
  );
};
