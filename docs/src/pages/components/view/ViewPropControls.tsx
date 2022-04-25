import * as React from 'react';
import { Flex, ViewProps, SelectField, TextField } from '@aws-amplify/ui-react';

export interface ViewPropControlsProps extends ViewProps {
  setAriaLabel: (value: React.SetStateAction<ViewProps['ariaLabel']>) => void;
  setWidth: (value: React.SetStateAction<ViewProps['width']>) => void;
  setHeight: (value: React.SetStateAction<ViewProps['height']>) => void;
  setColor: (value: React.SetStateAction<ViewProps['color']>) => void;
  setBackgroundColor: (
    value: React.SetStateAction<ViewProps['backgroundColor']>
  ) => void;
  setBoxShadow: (value: React.SetStateAction<ViewProps['boxShadow']>) => void;
  setPadding: (value: React.SetStateAction<ViewProps['padding']>) => void;
  setBorder: (value: React.SetStateAction<ViewProps['border']>) => void;
  setBorderRadius: (
    value: React.SetStateAction<ViewProps['borderRadius']>
  ) => void;
  setAsElementType: (value: React.SetStateAction<ViewProps['as']>) => void;
}

export interface ViewPropControlsInterface {
  (props: ViewPropControlsProps): JSX.Element;
}

export const ViewPropControls: ViewPropControlsInterface = ({
  ariaLabel,
  as: asElementType,
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  color,
  height,
  padding,
  setAriaLabel,
  setAsElementType,
  setBackgroundColor,
  setBorder,
  setBorderRadius,
  setBoxShadow,
  setColor,
  setHeight,
  setPadding,
  setWidth,
  width,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        value={asElementType as string}
        label="As element type"
        onChange={(event) =>
          setAsElementType(event.target.value as ViewProps['as'])
        }
      >
        <option value="div">div</option>
        <option value="button">button</option>
        <option value="p">p</option>
        <option value="span">span</option>
      </SelectField>
      <TextField
        label="Aria Label"
        value={ariaLabel}
        onChange={(event) => setAriaLabel(event.target.value)}
      />
      <TextField
        value={backgroundColor as string}
        onChange={(event) => setBackgroundColor(event.target.value)}
        label="Background Color"
      />
      <TextField
        value={border as string}
        onChange={(event) => setBorder(event.target.value)}
        label="Border"
      />
      <TextField
        value={borderRadius as string}
        onChange={(event) => setBorderRadius(event.target.value)}
        label="Border Radius"
      />
      <TextField
        value={boxShadow as string}
        onChange={(event) => setBoxShadow(event.target.value)}
        label="Box Shadow"
      />
      <TextField
        value={color as string}
        onChange={(event) => setColor(event.target.value)}
        label="Color"
      />
      <TextField
        value={height as string}
        onChange={(event) => setHeight(event.target.value)}
        label="Height"
      />

      <TextField
        value={padding as string}
        onChange={(event) => setPadding(event.target.value)}
        label="Padding"
      />
      <TextField
        value={width as string}
        onChange={(event) => setWidth(event.target.value)}
        label="Width"
      />
    </Flex>
  );
};
