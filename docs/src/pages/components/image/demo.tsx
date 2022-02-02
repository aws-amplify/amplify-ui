import * as React from 'react';
import { Image } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { ImagePropControls } from './ImagePropControls';
import { useImageProps } from './useImageProps';
import { useStyleProps } from '../shared/useStyleProps';
import { StylePropControls } from '../shared/StylePropControls';

const propsToCode = (props) => {
  return `<Image
  src="${props.src}"
  srcSet="${props.srcSet}"
  sizes="${props.sizes}"
  alt="${props.alt}"
  objectFit="${props.objectFit}"
  objectPosition="${props.objectPosition}"
  backgroundColor="${props.backgroundColor}"
  borderRadius="${props.borderRadius}"
  border="${props.border}"
  boxShadow="${props.boxShadow}"
  color="${props.color}"
  height="${props.height}"
  maxHeight="${props.maxHeight}"
  maxWidth="${props.maxWidth}"
  minHeight="${props.minHeight}"
  minWidth="${props.minWidth}"
  opacity="${props.opacity}"
  padding="${props.padding}"
  width="${props.width}"
  onClick={() => alert('📸 Say cheese!')}
/>`;
};

export const ImageDemo = () => {
  const styleProps = useStyleProps({
    width: '100%',
    height: '100%',
    backgroundColor: 'initial',
    border: 'initial',
    borderRadius: 'initial',
    boxShadow: 'initial',
    color: 'initial',
    maxHeight: 'initial',
    maxWidth: 'initial',
    minHeight: 'initial',
    minWidth: 'initial',
    opacity: '100%',
    padding: '0',
  });

  const imageProps = useImageProps({
    src: '/amplify-logo.svg',
    alt: 'Amplify logo',
    objectFit: 'fill',
    objectPosition: 'initial',
    onError: () => {},
    onLoad: () => {},
    sizes: '',
    srcSet: '',
  });

  return (
    <Demo
      code={propsToCode({ ...styleProps, ...imageProps })}
      propControls={
        <>
          <ImagePropControls {...imageProps} />
          <StylePropControls {...styleProps} />
        </>
      }
    >
      <Image
        src={imageProps.src}
        srcSet={imageProps.srcSet}
        sizes={imageProps.sizes}
        alt={imageProps.alt}
        objectFit={imageProps.objectFit}
        objectPosition={imageProps.objectPosition}
        backgroundColor={styleProps.backgroundColor}
        borderRadius={styleProps.borderRadius}
        border={styleProps.border}
        boxShadow={styleProps.boxShadow}
        color={styleProps.color}
        height={styleProps.height}
        maxHeight={styleProps.maxHeight}
        maxWidth={styleProps.maxWidth}
        minHeight={styleProps.minHeight}
        minWidth={styleProps.minWidth}
        opacity={styleProps.opacity}
        padding={styleProps.padding}
        width={styleProps.width}
        onClick={() => alert('📸 Say cheese!')}
      />
    </Demo>
  );
};
