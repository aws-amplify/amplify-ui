import * as React from 'react';
import { CheckboxField, Button } from '@aws-amplify/ui-react';

export const CheckboxFieldWithErrorExample = () => {
  const [checked, setChecked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!checked) {
      setHasError(true);
    } else {
      setHasError(false);
      alert(`success`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CheckboxField
        label="I agree to the terms and conditions"
        name="toc"
        value="yes"
        checked={checked}
        hasError={hasError}
        errorMessage="Please agree to the terms and conditions"
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
