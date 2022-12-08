import { TextField } from '@aws-amplify/ui-react';
import * as React from 'react';

export const TextFieldValidationErrorExample = () => {
  const [hasError, setHasError] = React.useState(true);

  const validateUsername = (e) => {
    const containsDigit = /\d/.test(e.currentTarget.value);
    setHasError(!containsDigit);
  };

  return (
    <TextField
      label="Username"
      hasError={hasError}
      errorMessage="Username must include at least one digit"
      onChange={validateUsername}
    />
  );
};
