import * as React from 'react';

import { PhoneNumberField, View } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';

export const PhoneNumberFieldDemo = () => {
  return (
    <View width="100%">
      <Example>
        <PhoneNumberField defaultCountryCode="+1" label="Phone Number" />
      </Example>
    </View>
  );
};
