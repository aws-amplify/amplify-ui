import { Flex, View, useTheme } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { FlexPropControls } from './FlexPropControls';
import { useFlexProps } from './useFlexProps';

const propsToCode = (props) => {
  return `<Flex
  direction="${props.direction}"
  justifyContent="${props.justifyContent}"
  alignItems="${props.alignItems}"
  alignContent="${props.alignContent}"
  wrap="${props.wrap}"
  gap="${props.gap}"
>
  <View
    height="2rem"
    width="5rem"
    backgroundColor={tokens.colors.blue[20]}
  ></View>
  <View
    height="2.5rem"
    width="6.25rem"
    backgroundColor={tokens.colors.blue[40]}
  ></View>
  <View
    height="3rem"
    width="7.5rem"
    backgroundColor={tokens.colors.blue[60]}
  ></View>
  <View
    height="3.5rem"
    width="8.75rem"
    backgroundColor={tokens.colors.blue[80]}
  ></View>
</Flex>`;
};

export const FlexDemo = () => {
  const flexProps = useFlexProps({
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'flex-start',
    wrap: 'nowrap',
    gap: '1rem',
  });

  const { tokens } = useTheme();

  return (
    <Demo
      code={propsToCode(flexProps)}
      propControls={<FlexPropControls {...flexProps} />}
    >
      <Flex
        direction={flexProps.direction}
        justifyContent={flexProps.justifyContent}
        alignItems={flexProps.alignItems}
        alignContent={flexProps.alignContent}
        wrap={flexProps.wrap}
        gap={flexProps.gap}
      >
        <View
          height="2rem"
          width="5rem"
          backgroundColor={tokens.colors.blue[20]}
        ></View>
        <View
          height="2.5rem"
          width="6.25rem"
          backgroundColor={tokens.colors.blue[40]}
        ></View>
        <View
          height="3rem"
          width="7.5rem"
          backgroundColor={tokens.colors.blue[60]}
        ></View>
        <View
          height="3.5rem"
          width="8.75rem"
          backgroundColor={tokens.colors.blue[80]}
        ></View>
      </Flex>
    </Demo>
  );
};
