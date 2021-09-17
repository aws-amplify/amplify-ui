import React from 'react';

import { CheckboxField, Flex } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const Demo: React.FC = () => {
  return (
    <Flex>
      <CheckboxField name="subscribe-1" value="yes">
        subscribe
      </CheckboxField>
      <CheckboxField name="subscribe-3" value="yes" isEmphasized>
        subscribe
      </CheckboxField>
      <CheckboxField name="subscribe-4" value="yes" isDisabled>
        subscribe
      </CheckboxField>
    </Flex>
  );
};

export const ControlledCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxField
      name="subscribe-5"
      value="yes"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      subscribe
    </CheckboxField>
  );
};
