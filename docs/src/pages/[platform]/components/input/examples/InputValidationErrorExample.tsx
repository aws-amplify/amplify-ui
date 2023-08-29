import * as React from 'react';
import { Input, Label } from '@aws-amplify/ui-react';

export const InputValidationErrorExample = () => {
  const [hasError, setHasError] = React.useState(true);

  const validateUsername = (e) => {
    const containsDigit = /\d/.test(e.currentTarget.value);
    setHasError(!containsDigit);
  };

  return (
    <>
      <Label htmlFor="username">Username</Label>
      <Input id="username" hasError={hasError} onChange={validateUsername} />
    </>
  );
};
