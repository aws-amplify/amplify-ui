import * as React from 'react';

import {
  Text,
  TextProps,
  TextVariation,
  useTheme,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { TextPropControls } from './TextPropControls';
import { useTextProps } from './useTextPropControlProps';

const propsToCode = (
  variation: TextVariation,
  {
    as,
    isTruncated,
    color,
    lineHeight,
    fontWeight,
    fontStyle,
    fontSize,
    textDecoration,
    value,
  }: TextProps
) => `
<Text
    variation="${variation}"
    as="${as}"
    color="${color}"${
  isTruncated
    ? `
    isTruncated={true}`
    : ''
}
    lineHeight="${lineHeight}"
    fontWeight={${fontWeight}}
    fontSize="${fontSize}"
    fontStyle="${fontStyle}"
    textDecoration="${textDecoration}"
    width="30vw"
  >
    ${value}
</Text>`;

export const TextDemo = ({ children }) => {
  const props = useTextProps();
  const {
    as,
    variation,
    isTruncated,
    color,
    lineHeight,
    fontWeight,
    fontStyle,
    fontSize,
    textDecoration,
    value,
  } = props;

  return (
    <Demo
      code={propsToCode(variation, {
        as,
        isTruncated,
        color,
        lineHeight,
        fontWeight,
        fontStyle,
        fontSize,
        textDecoration,
        value,
      })}
      propControls={<TextPropControls {...props} />}
    >
      <Text
        as={as}
        variation={variation}
        isTruncated={isTruncated}
        color={color}
        lineHeight={lineHeight}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        fontSize={fontSize}
        textDecoration={textDecoration}
        width="30vw"
      >
        {value}
      </Text>
    </Demo>
  );
};

export const TextStylingSample = () => {
  const theme = useTheme();
  return (
    <Text
      fontWeight={theme.tokens.fontWeights.bold}
      color={theme.tokens.colors.red[80]}
      textDecoration="underline"
      as="span"
    >
      This is my styled text
    </Text>
  );
};
