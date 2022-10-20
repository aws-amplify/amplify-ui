import { CheckboxField, Button } from '@aws-amplify/ui-react';
import * as React from 'react';

export const CheckboxFieldValueExample = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    alert(event.target.subscribe.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <CheckboxField label="Subscribe" name="subscribe" value="yes" />
      <Button type="submit">Submit</Button>
    </form>
  );
};
