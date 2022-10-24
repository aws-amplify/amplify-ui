import { SwitchField, Button, Flex } from '@aws-amplify/ui-react';
import * as React from 'react';

export const SwitchFieldErrorExample = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    if (!isChecked) {
      setHasError(true);
    } else {
      setHasError(false);
      alert(`success`);
    }
  };

  return (
    <Flex
      as="form"
      direction="column"
      alignItems="flex-start"
      onSubmit={onSubmit}
    >
      <SwitchField
        label="I agree to the terms and conditions"
        labelPosition="end"
        isChecked={isChecked}
        hasError={hasError}
        errorMessage="Please agree to the terms and conditions"
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
      />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
