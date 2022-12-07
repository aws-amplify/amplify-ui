import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Radio, Text } from '../../../primitives';
import { MFAOptionProps } from './types';

function MFAOption({ mfaType }: MFAOptionProps): JSX.Element | null {
  // translation
  const useSMSText = translate('Use SMS');
  const useTOTPText = translate('Use an app');
  const smsDescriptionText = translate(
    'Receive an SMS on your phone with a code'
  );
  const useTOTPDescriptionText = translate(
    'Use an application on your phone. Applications include cloud-based TOTP (temporary one time password) apps such as Authy, Google Authenticator, and 1password.'
  );

  return (
    <Radio value={mfaType}>
      <Text fontWeight="bold">
        {mfaType === 'sms' ? useSMSText : useTOTPText}
      </Text>
      <Text>
        {mfaType === 'sms' ? smsDescriptionText : useTOTPDescriptionText}
      </Text>
    </Radio>
  );
}

export default MFAOption;
