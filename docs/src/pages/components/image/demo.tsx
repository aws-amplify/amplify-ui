import React from 'react';
import { Image, View } from '@aws-amplify/ui-react';
import { StylePropControls } from '@/components/StylePropControls';
import { ImagePropControls } from '@/components/ImagePropControls';
import { useStyleProps } from '@/components/useStyleProps';
import { useImageProps } from '@/components/useImageProps';

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
    src: 'https://docs.amplify.aws/assets/logo-dark.svg',
    alt: 'Amplify logo',
    objectFit: 'fill',
    objectPosition: 'initial',
    onError: () => {},
    onLoad: () => {},
    sizes: '',
    srcSet: '',
  });

  return (
    <div>
      <ImagePropControls {...imageProps} />
      <StylePropControls {...styleProps} />

      <View width="350px" height="350px" className="p-6">
        <Image
          src={imageProps.src}
          srcSet={imageProps.srcSet}
          sizes={imageProps.sizes}
          alt={imageProps.alt}
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
          onClick={() => alert('📸 Say cheese!')}
          opacity={styleProps.opacity}
          padding={styleProps.padding}
          width={styleProps.width}
          objectFit={imageProps.objectFit}
          objectPosition={imageProps.objectPosition}
        />
      </View>
    </div>
  );
};
