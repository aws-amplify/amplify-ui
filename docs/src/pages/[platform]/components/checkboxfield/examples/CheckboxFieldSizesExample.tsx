import * as React from 'react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';

export const CheckboxFieldSizesExample = () => (
  <Flex>
    <CheckboxField
      label="Subscribe"
      name="subscribe"
      value="yes"
      size="small"
    />
    <CheckboxField label="Subscribe" name="subscribe" value="yes" />
    <CheckboxField
      label="Subscribe"
      name="subscribe"
      value="yes"
      size="large"
    />
  </Flex>
);
