import { Button, Flex } from '@aws-amplify/ui-react';

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
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </Flex>`;
};

export const FlexDemo = () => {
  const flexProps = useFlexProps({
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    wrap: 'nowrap',
    gap: '1rem',
  });

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
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Flex>
    </Demo>
  );
};
