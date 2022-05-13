import { SwitchField, Button } from '@aws-amplify/ui-react';
import * as React from 'react';

export const SwitchFieldIsCheckedExample = () => {
  const [isChecked, setIsChecked] = React.useState(true);

  return (
    <>
      <SwitchField
        label="This is a switch"
        isChecked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
      />
      <Button
        onClick={() => {
          setIsChecked((isChecked) => !isChecked);
        }}
      >
        Switch
      </Button>
    </>
  );
};
