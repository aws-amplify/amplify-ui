import * as React from 'react';

import { BaseStyleProps, Flex, TextField } from '@aws-amplify/ui-react';

export interface StylePropControlsProps extends BaseStyleProps {
  setBackgroundColor: (
    value: React.SetStateAction<BaseStyleProps['backgroundColor']>
  ) => void;
  setBorder: (value: React.SetStateAction<BaseStyleProps['border']>) => void;
  setBorderRadius: (
    value: React.SetStateAction<BaseStyleProps['borderRadius']>
  ) => void;
  setBoxShadow: (
    value: React.SetStateAction<BaseStyleProps['boxShadow']>
  ) => void;
  setColor: (value: React.SetStateAction<BaseStyleProps['color']>) => void;
  setHeight: (value: React.SetStateAction<BaseStyleProps['height']>) => void;
  setMaxHeight: (
    value: React.SetStateAction<BaseStyleProps['maxHeight']>
  ) => void;
  setMaxWidth: (
    value: React.SetStateAction<BaseStyleProps['maxWidth']>
  ) => void;
  setMinHeight: (
    value: React.SetStateAction<BaseStyleProps['minHeight']>
  ) => void;
  setMinWidth: (
    value: React.SetStateAction<BaseStyleProps['minWidth']>
  ) => void;
  setOpacity: (value: React.SetStateAction<BaseStyleProps['opacity']>) => void;
  setPadding: (value: React.SetStateAction<BaseStyleProps['padding']>) => void;
  setWidth: (value: React.SetStateAction<BaseStyleProps['width']>) => void;
}

interface StylePropControlsInterface {
  (props: StylePropControlsProps): React.JSX.Element;
}

export const StylePropControls: StylePropControlsInterface = ({
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  color,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  padding,
  width,
  setBackgroundColor,
  setBorder,
  setBorderRadius,
  setBoxShadow,
  setColor,
  setHeight,
  setMaxHeight,
  setMaxWidth,
  setMinHeight,
  setMinWidth,
  setOpacity,
  setPadding,
  setWidth,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="backgroundColor"
        placeholder="Set backgroundColor"
        value={backgroundColor as string}
        onChange={(event: any) => {
          setBackgroundColor(event.target.value);
        }}
      />
      <TextField
        label="border"
        placeholder="Set border"
        value={border as string}
        onChange={(event: any) => {
          setBorder(event.target.value);
        }}
      />
      <TextField
        label="borderRadius"
        placeholder="Set borderRadius"
        value={borderRadius as string}
        onChange={(event: any) => {
          setBorderRadius(event.target.value);
        }}
      />
      <TextField
        label="boxShadow"
        placeholder="Set boxShadow"
        value={boxShadow as string}
        onChange={(event: any) => {
          setBoxShadow(event.target.value);
        }}
      />
      <TextField
        label="color"
        placeholder="Set color"
        value={color as string}
        onChange={(event: any) => {
          setColor(event.target.value);
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
        label="maxHeight"
        placeholder="Set maxHeight"
        value={maxHeight as string}
        onChange={(event: any) => {
          setMaxHeight(event.target.value);
        }}
      />
      <TextField
        label="maxWidth"
        placeholder="Set maxWidth"
        value={maxWidth as string}
        onChange={(event: any) => {
          setMaxWidth(event.target.value);
        }}
      />
      <TextField
        label="minHeight"
        placeholder="Set minHeight"
        value={minHeight as string}
        onChange={(event: any) => {
          setMinHeight(event.target.value);
        }}
      />
      <TextField
        label="minWidth"
        placeholder="Set minWidth"
        value={minWidth as string}
        onChange={(event: any) => {
          setMinWidth(event.target.value);
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
      <TextField
        label="padding"
        placeholder="Set padding"
        value={padding as string}
        onChange={(event: any) => {
          setPadding(event.target.value);
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
    </Flex>
  );
};
