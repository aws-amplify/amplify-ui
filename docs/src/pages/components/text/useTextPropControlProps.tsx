import * as React from 'react';

import { TextProps, TextVariation } from '@aws-amplify/ui-react';

import { TextPropControlsProps } from './TextPropControls';

export const useTextProps = (): TextPropControlsProps => {
  const [variation, setVariation] = React.useState<TextVariation>('primary');
  const [as, setAs] = React.useState<TextProps['as']>('p');
  const [isTruncated, setIsTruncated] =
    React.useState<TextProps['isTruncated']>(false);
  const [color, setColor] = React.useState<string>('blue');
  const [lineHeight, setLineHeight] = React.useState<string>('1.5em');
  const [fontWeight, setFontWeight] = React.useState<number>(400);
  const [fontStyle, setFontStyle] = React.useState<string>('normal');
  const [fontSize, setFontSize] = React.useState<string>('1em');
  const [textDecoration, setTextDecoration] = React.useState<string>('none');
  const [value, setValue] = React.useState<string>('Hello World!');

  return {
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
    fontStyle,
    setFontStyle,
    fontSize,
    setFontSize,
    textDecoration,
    setTextDecoration,
    value,
    setValue,
  };
};
