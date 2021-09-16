import React from 'react';

import { CheckboxField } from '@aws-amplify/ui-react';

export const Demo: React.FC = () => {
  return (
    <CheckboxField name="subscribe" value="yes">
      subscribe
    </CheckboxField>
  );
};
