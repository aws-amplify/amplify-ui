import * as React from 'react';

import { CheckboxField, Flex } from '@aws-amplify/ui-react';

export const CheckboxFieldDisabledExample = () => {
  return (
    <Flex>
      <CheckboxField
        label="Subscribe"
        name="subscribe"
        value="yes"
        isDisabled
      />
      <CheckboxField
        label="Subscribe"
        name="subscribe"
        value="yes"
        defaultChecked
        isDisabled
      />
    </Flex>
  );
};
