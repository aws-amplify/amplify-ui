import * as React from 'react';
import { Text, SwitchField } from '@aws-amplify/ui-react';

export const SwitchFieldOnChangeExample = () => {
  const [switchCount, setSwitchCount] = React.useState(0);
  const changeCount = () => {
    setSwitchCount(switchCount + 1);
  };
  return (
    <>
      <SwitchField label="This is a switch" onChange={changeCount} />
      <Text>Number of times the switch has changed {switchCount}</Text>
    </>
  );
};
