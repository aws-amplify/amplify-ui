import * as React from 'react';
import { Divider, Flex, Text } from '@aws-amplify/ui-react';
import { DividerPropControls } from './DividerPropControls';
import { useDividerProps } from './useDividerProps';
import { Demo } from '@/components/Demo';

const propsToCode = (props) => {
  return (
    `<Flex direction=${JSON.stringify(props.direction)}>
  <Text>Before</Text>
  <Divider` +
    (props.label ? `\n    label=${JSON.stringify(props.label)}` : '') +
    (props.size ? `\n    size=${JSON.stringify(props.size)}` : '') +
    `
    orientation=${JSON.stringify(props.orientation)} />
  <Text>After</Text>
</Flex>`
  );
};

export const DividerDemo = () => {
  const dividerProps = useDividerProps({
    orientation: 'horizontal',
  });
  const direction =
    dividerProps.orientation === 'horizontal' ? 'column' : 'row';

  return (
    <Demo
      propControls={<DividerPropControls {...dividerProps} />}
      code={propsToCode({ direction, ...dividerProps })}
    >
      <Flex direction={direction}>
        <Text>Before</Text>
        <Divider
          size={dividerProps.size}
          orientation={dividerProps.orientation}
          label={dividerProps.label}
        />
        <Text>After</Text>
      </Flex>
    </Demo>
  );
};
