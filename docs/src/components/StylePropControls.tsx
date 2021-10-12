import React from 'react';
import { BaseStyleProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';

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
  (props: StylePropControlsProps): JSX.Element;
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
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">Style props:</legend>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2">
        <FieldLabeler id="backgroundColor">
          <input
            type="text"
            placeholder="Set backgroundColor"
            value={backgroundColor as string}
            onChange={(event: any) => {
              setBackgroundColor(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="border">
          <input
            type="text"
            placeholder="Set border"
            value={border as string}
            onChange={(event: any) => {
              setBorder(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="borderRadius">
          <input
            type="text"
            placeholder="Set borderRadius"
            value={borderRadius as string}
            onChange={(event: any) => {
              setBorderRadius(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="boxShadow">
          <input
            type="text"
            placeholder="Set boxShadow"
            value={boxShadow as string}
            onChange={(event: any) => {
              setBoxShadow(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="color">
          <input
            type="text"
            placeholder="Set color"
            id="color"
            name="color"
            value={color as string}
            onChange={(event: any) => {
              setColor(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="height">
          <input
            type="text"
            placeholder="Set height"
            value={height as string}
            onChange={(event: any) => {
              setHeight(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="maxHeight">
          <input
            type="text"
            placeholder="Set maxHeight"
            value={maxHeight as string}
            onChange={(event: any) => {
              setMaxHeight(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="maxWidth">
          <input
            type="text"
            placeholder="Set maxWidth"
            value={maxWidth as string}
            onChange={(event: any) => {
              setMaxWidth(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="minHeight">
          <input
            type="text"
            placeholder="Set minHeight"
            value={minHeight as string}
            onChange={(event: any) => {
              setMinHeight(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="minWidth">
          <input
            type="text"
            placeholder="Set minWidth"
            value={minWidth as string}
            onChange={(event: any) => {
              setMinWidth(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="opacity">
          <input
            type="text"
            placeholder="Set opacity"
            value={opacity as string}
            onChange={(event: any) => {
              setOpacity(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="padding">
          <input
            type="text"
            placeholder="Set padding"
            value={padding as string}
            onChange={(event: any) => {
              setPadding(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="width">
          <input
            type="text"
            placeholder="Set width"
            value={width as string}
            onChange={(event: any) => {
              setWidth(event.target.value);
            }}
          />
        </FieldLabeler>
      </div>
    </fieldset>
  );
};
