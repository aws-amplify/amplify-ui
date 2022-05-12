import * as React from 'react';

import {
  Flex,
  SelectField,
  SliderField,
  SwitchField,
  TextField,
  TextProps,
  TextVariation,
} from '@aws-amplify/ui-react';

export interface TextPropControlsProps extends TextProps {
  setAs: (value: React.SetStateAction<TextProps['as']>) => void;
  setVariation: (value: React.SetStateAction<TextProps['variation']>) => void;
  setIsTruncated: (
    value: React.SetStateAction<TextProps['isTruncated']>
  ) => void;
  setColor: (value: React.SetStateAction<TextProps['color']>) => void;
  setLineHeight: (value: React.SetStateAction<TextProps['lineHeight']>) => void;
  setFontWeight: (value: React.SetStateAction<TextProps['fontWeight']>) => void;
  setFontStyle: (value: React.SetStateAction<TextProps['fontStyle']>) => void;
  setFontSize: (value: React.SetStateAction<TextProps['fontSize']>) => void;
  setTextDecoration: (
    value: React.SetStateAction<TextProps['textDecoration']>
  ) => void;
  value: string;
  setValue: (value: string) => void;
}

interface TextPropControlsInterface {
  (props: TextPropControlsProps): JSX.Element;
}

export const TextPropControls: TextPropControlsInterface = ({
  variation,
  setVariation,
  as,
  setAs,
  isTruncated,
  setIsTruncated,
  color,
  setColor,
  lineHeight,
  setLineHeight,
  fontWeight,
  setFontWeight,
  fontSize,
  setFontSize,
  fontStyle,
  setFontStyle,
  textDecoration,
  setTextDecoration,
  value,
  setValue,
}) => {
  const VARIATIONS_OPTIONS: TextVariation[] = [
    'primary',
    'secondary',
    'tertiary',
    'error',
    'warning',
    'info',
    'success',
  ];

  const AS_OPTIONS = ['p', 'span', 'strong', 'em'];

  return (
    <Flex direction="column">
      <TextField
        label="Displayed Text"
        onChange={(event) => setValue(event.target.value)}
        defaultValue={value}
      ></TextField>
      <SelectField
        name="variation"
        value={String(variation)}
        onChange={(event) => setVariation(event.target.value as TextVariation)}
        label="variation"
      >
        {VARIATIONS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectField>
      <SelectField
        name="as"
        value={String(as)}
        onChange={(event) => setAs(event.target.value as TextProps['as'])}
        label="as"
      >
        {AS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectField>
      <TextField
        label="color"
        placeholder={String(color)}
        onChange={(event) => setColor(event.target.value)}
      />
      <SwitchField
        label="isTruncated"
        defaultChecked={isTruncated}
        labelPosition="end"
        onChange={(event) => setIsTruncated(event.target.checked)}
      />
      <TextField
        label="lineHeight"
        placeholder={String(lineHeight)}
        onChange={(event) => setLineHeight(event.target.value)}
      />
      <TextField
        label="fontSize"
        placeholder={String(fontSize)}
        onChange={(event) => setFontSize(event.target.value)}
      />
      <TextField
        label="fontStyle"
        placeholder={String(fontStyle)}
        onChange={(event) => setFontStyle(event.target.value)}
      />
      <TextField
        label="textDecoration"
        placeholder={String(textDecoration)}
        onChange={(event) => setTextDecoration(event.target.value)}
      />
      <SliderField
        label="fontWeight"
        min={100}
        max={950}
        step={50}
        value={fontWeight as number}
        onChange={setFontWeight}
      />
    </Flex>
  );
};
