import * as React from 'react';

import { Text, useTheme } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { TextPropControls } from './TextPropControls';
import { TextProps } from '@aws-amplify/ui-react';
import { TextVariation } from '@aws-amplify/ui-react';

const propsToCode = (
  variation: TextVariation,
  as: TextProps['as'],
  isTruncated: TextProps['isTruncated']
) => {
  return `
<Text as="${as}" isTruncated="${isTruncated}" variation="${variation}">
  Hello world!
</Text>;`;
};

export const TextDemo = ({ children }) => {
  const [variation, setVariation] = React.useState<TextVariation>('primary');
  const [as, setAs] = React.useState<TextProps['as']>('p');
  const [isTruncated, setIsTruncated] =
    React.useState<TextProps['isTruncated']>(false);
  const [color, setColor] = React.useState<string>('blue');
  const [lineHeight, setLineHeight] = React.useState<number>(1.5);
  const [fontWeight, setFontWeight] = React.useState<number>(400);
  const [fontStyle, setFontStyle] = React.useState<string>('normal');
  const [fontSize, setFontSize] = React.useState<string>('1em');
  const [textDecoration, setTextDecoration] = React.useState<string>('none');

  const LOREM_IPSUM =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At risus viverra adipiscing at in tellus integer feugiat. Quis vel eros donec ac odio tempor. Mauris a diam maecenas sed enim ut sem viverra aliquet. Auctor elit sed vulputate mi sit. Vitae auctor eu augue ut lectus arcu bibendum at varius. Tempus iaculis urna id volutpat. Consectetur libero id faucibus nisl tincidunt eget nullam non. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Id semper risus in hendrerit gravida rutrum quisque. Orci phasellus egestas tellus rutrum tellus pellentesque eu. Amet cursus sit amet dictum sit amet justo donec. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Lorem dolor sed viverra ipsum. Bibendum arcu vitae elementum curabitur vitae. Ullamcorper velit sed ullamcorper morbi.';
  return (
    <Demo
      code={propsToCode(variation, as, isTruncated)}
      propControls={
        <TextPropControls
          variation={variation}
          setVariation={setVariation}
          as={as}
          setAs={setAs}
          isTruncated={isTruncated}
          setIsTruncated={setIsTruncated}
        />
      }
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
