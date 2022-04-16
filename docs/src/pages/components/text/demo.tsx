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
  }: TextProps,
  lorenIpsum: string
) => `
<Text
    as="${as}"
    variation="${variation}"
    isTruncated="${isTruncated}"
    color="${color}"
    lineHeight="${lineHeight}"
    fontWeight="${fontWeight}"
    fontStyle="${fontStyle}"
    fontSize="${fontSize}"
    textDecoration="${textDecoration}"
    maxWidth="30vi"
  >
    ${lorenIpsum}
</Text>`;

export const TextDemo = ({ children }) => {
  const props = useTextProps({
    as: 'p',
    variation: 'primary',
    isTruncated: false,
    color: 'blue',
    lineHeight: '1em',
    fontWeight: 400,
    fontSize: '1.5em',
    textDecoration: 'underline',
  });
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
  } = props;

  const LOREM_IPSUM =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At risus viverra adipiscing at in tellus integer feugiat.';

  return (
    <Demo
      code={propsToCode(
        variation,
        {
          as,
          isTruncated,
          color,
          lineHeight,
          fontWeight,
          fontStyle,
          fontSize,
          textDecoration,
        },
        LOREM_IPSUM
      )}
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
        maxWidth="30vi"
      >
        {LOREM_IPSUM}
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
