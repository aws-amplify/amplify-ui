import * as React from 'react';
import { Flex, ImageOptions, TextField } from '@aws-amplify/ui-react';

export interface ImagePropControlsProps extends ImageOptions {
  setAlt: (value: React.SetStateAction<ImageOptions['alt']>) => void;
  setSizes: (value: React.SetStateAction<ImageOptions['sizes']>) => void;
  setSrc: (value: React.SetStateAction<ImageOptions['src']>) => void;
  setSrcSet: (value: React.SetStateAction<ImageOptions['srcSet']>) => void;
  setObjectFit: (
    value: React.SetStateAction<ImageOptions['objectFit']>
  ) => void;
  setObjectPosition: (
    value: React.SetStateAction<ImageOptions['objectPosition']>
  ) => void;
}

interface ImagePropControlsInterface {
  (props: ImagePropControlsProps): JSX.Element;
}

export const ImagePropControls: ImagePropControlsInterface = ({
  alt,
  sizes,
  src,
  srcSet,
  objectFit,
  objectPosition,
  setAlt,
  setSizes,
  setSrcSet,
  setObjectFit,
  setObjectPosition,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="alt"
        placeholder="Set alt"
        value={alt}
        onChange={(event: any) => {
          setAlt(event.target.value);
        }}
      />
      <TextField
        label="sizes"
        placeholder="Set sizes"
        value={sizes}
        onChange={(event: any) => {
          setSizes(event.target.value);
        }}
      />
      <TextField label="src" placeholder="Set src" value={src} isDisabled />
      <TextField label="srcSet" placeholder="Set srcSet" value={srcSet} />
      <TextField
        label="objectFit"
        placeholder="Set objectFit"
        value={objectFit as string}
        onChange={(event: any) => {
          setObjectFit(event.target.value);
        }}
      />
      <TextField
        label="objectPosition"
        placeholder="Set objectPosition"
        value={objectPosition as string}
        onChange={(event: any) => {
          setObjectPosition(event.target.value);
        }}
      />
    </Flex>
  );
};
