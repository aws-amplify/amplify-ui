import React from 'react';
import { Divider, Flex, Text } from '@aws-amplify/ui-react';
import { DividerPropControls } from '../../../../components/DividerPropControls';
import { useDividerProps } from '@/components/useDividerProps';

export const DividerDemo = () => {
  const dividerProps = useDividerProps({
    orientation: 'horizontal',
  });
  const direction =
    dividerProps.orientation === 'horizontal' ? 'column' : 'row';

  return (
    <div>
      <DividerPropControls {...dividerProps} />
      <Flex direction={direction} height="50px" className="pt-2">
        <Text>Before</Text>
        <Divider
          size={dividerProps.size}
          orientation={dividerProps.orientation}
        />
        <Text>After</Text>
      </Flex>
    </div>
  );
};
