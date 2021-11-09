import React, { useState } from 'react';

import { CheckboxField } from '@aws-amplify/ui-react';

export const ControlledCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxField
      name="subscribe-controlled"
      value="yes"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      Subscribe
    </CheckboxField>
  );
};
