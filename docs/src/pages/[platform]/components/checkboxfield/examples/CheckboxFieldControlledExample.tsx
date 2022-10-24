import * as React from 'react';

import { CheckboxField } from '@aws-amplify/ui-react';

export const CheckboxFieldControlledExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <CheckboxField
      name="subscribe-controlled"
      value="yes"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      label="Subscribe"
    />
  );
};
