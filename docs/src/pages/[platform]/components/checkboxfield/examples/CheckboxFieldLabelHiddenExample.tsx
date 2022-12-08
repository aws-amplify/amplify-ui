import * as React from 'react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';

export const CheckboxFieldLabelHiddenExample = () => (
  <Flex>
    <CheckboxField label="Subscribe" name="subscribe" value="yes" />
    <CheckboxField
      label="Subscribe"
      name="subscribe"
      value="yes"
      labelHidden={true}
    />
  </Flex>
);
