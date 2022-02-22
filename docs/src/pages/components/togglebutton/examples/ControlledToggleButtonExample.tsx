import * as React from 'react';
import { ToggleButton } from '@aws-amplify/ui-react';

export const ControlledToggleButtonExample = () => {
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    <ToggleButton
      isPressed={isPressed}
      onChange={() => setIsPressed(!isPressed)}
    >
      Press me!
    </ToggleButton>
  );
};
