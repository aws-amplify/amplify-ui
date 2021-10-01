import * as React from 'react';

import { Flex, ToggleButton } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { ToggleButtonPropControls } from '@/components/ToggleButtonPropControls';
import { useToggleButtonProps } from '@/components/useToggleButtonProps';

export const Demo = () => {
  const props = useToggleButtonProps({
    isDisabled: false,
    size: 'medium',
    variation: 'default',
  });
  return (
    <Flex direction="column">
      <ToggleButtonPropControls {...props} />
      <Example>
        <ToggleButton
          isDisabled={props.isDisabled}
          size={props.size}
          variation={props.variation}
        >
          Press me!
        </ToggleButton>
      </Example>
    </Flex>
  );
};
