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
  >
    {${lorenIpsum}}
</Text>`;

export const TextDemo = ({ children }) => {
  const props = useTextProps({
    as: 'p',
    variation: 'primary',
    isTruncated: true,
    color: 'blue',
    lineHeight: '1em',
    fontWeight: '400',
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
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At risus viverra adipiscing at in tellus integer feugiat. Quis vel eros donec ac odio tempor. Mauris a diam maecenas sed enim ut sem viverra aliquet. Auctor elit sed vulputate mi sit. Vitae auctor eu augue ut lectus arcu bibendum at varius. Tempus iaculis urna id volutpat. Consectetur libero id faucibus nisl tincidunt eget nullam non. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Id semper risus in hendrerit gravida rutrum quisque. Orci phasellus egestas tellus rutrum tellus pellentesque eu. Amet cursus sit amet dictum sit amet justo donec. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Lorem dolor sed viverra ipsum. Bibendum arcu vitae elementum curabitur vitae. Ullamcorper velit sed ullamcorper morbi.';
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
      >
        {LOREM_IPSUM}
      </Text>
    </Demo>
  );
};

export const TextTruncatedSample = () => {
  return (
    <Text isTruncated={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
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
