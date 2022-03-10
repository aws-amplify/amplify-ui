import * as React from 'react';

import { ToggleButton, ToggleButtonProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { ToggleButtonPropControls } from './ToggleButtonPropControls';
import { useToggleButtonProps } from './useToggleButtonProps';

const propsToCode = (props: ToggleButtonProps) => {
  return (
    `<ToggleButton` +
    (props.variation ? ` variation="${props.variation}"` : '') +
    (props.size ? ` size="${props.size}"` : '') +
    (props.isDisabled ? ` isDisabled={${props.isDisabled}}>` : '>') +
    `\n  Press me!` +
    `\n</ToggleButton>`
  );
};

export const ToggleButtonDemo = () => {
  const props = useToggleButtonProps({
    isDisabled: false,
  });
  return (
    <Demo
      code={propsToCode(props)}
      propControls={<ToggleButtonPropControls {...props} />}
    >
      <ToggleButton
        isDisabled={props.isDisabled}
        size={props.size}
        variation={props.variation}
      >
        Press me!
      </ToggleButton>
    </Demo>
  );
};
