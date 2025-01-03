import * as React from 'react';
import {
  Flex,
  ImageOptions,
  BaseStyleProps,
  TextField,
  SelectField,
} from '@aws-amplify/ui-react';

export interface ImagePropControlsProps extends ImageOptions {
  setAlt: (value: React.SetStateAction<ImageOptions['alt']>) => void;
  setObjectFit: (
    value: React.SetStateAction<ImageOptions['objectFit']>
  ) => void;
  setObjectPosition: (
    value: React.SetStateAction<ImageOptions['objectPosition']>
  ) => void;
  setBackgroundColor: (
    value: React.SetStateAction<BaseStyleProps['backgroundColor']>
  ) => void;
  setHeight: (value: React.SetStateAction<BaseStyleProps['height']>) => void;
  setWidth: (value: React.SetStateAction<BaseStyleProps['width']>) => void;
  setOpacity: (value: React.SetStateAction<BaseStyleProps['opacity']>) => void;
  backgroundColor: BaseStyleProps['backgroundColor'];
  height: BaseStyleProps['height'];
  width: BaseStyleProps['width'];
  opacity: BaseStyleProps['opacity'];
}

interface ImagePropControlsInterface {
  (props: ImagePropControlsProps): JSX.Element;
}

export const ImagePropControls: ImagePropControlsInterface = ({
  alt,
  setAlt,
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
      <TextField label="src" placeholder="/amplify-logo.svg" isReadOnly />
      <SelectField
        label="objectFit"
        value={objectFit as string}
        onChange={(event) => setObjectFit(event.target.value as string)}
      >
        <option value="initial">initial</option>
        <option value="cover">cover</option>
        <option value="none">none</option>
      </SelectField>
      <TextField
        label="objectPosition"
        placeholder="Set objectPosition"
        value={objectPosition as string}
        onChange={(event: any) => {
          setObjectPosition(event.target.value);
        }}
      />
      <TextField
        label="backgroundColor"
        placeholder="Set backgroundColor"
        value={backgroundColor as string}
        onChange={(event: any) => {
          setBackgroundColor(event.target.value);
        }}
      />
      <TextField
        label="height"
        placeholder="Set height"
        value={height as string}
        onChange={(event: any) => {
          setHeight(event.target.value);
        }}
      />
      <TextField
        label="width"
        placeholder="Set width"
        value={width as string}
        onChange={(event: any) => {
          setWidth(event.target.value);
        }}
      />
      <TextField
        label="opacity"
        placeholder="Set opacity"
        value={opacity as string}
        onChange={(event: any) => {
          setOpacity(event.target.value);
        }}
      />
    </Flex>
  );
};
