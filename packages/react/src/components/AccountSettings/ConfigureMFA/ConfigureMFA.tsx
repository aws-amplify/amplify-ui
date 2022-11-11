import React from 'react';

import { getLogger, getCurrentMFA, translate } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Radio, Link, Text } from '../../../primitives';
import { DefaultEnableMFAButton, DefaultSelectMFA } from './defaults';
import {
  ConfigureMFAProps,
  ConfigureMFAState,
  SelectMFAOptionProps,
} from './types';

const logger = getLogger('Auth');

/*
 * helper subcomponent that represents radio button option for desired
 * MFA type. This will be passed as children to `<ConfigureMFA />`:
 *
 * <ConfigureMFA>
 *   <ConfigureMFA.Option mfaType="SMS" />
 * </ConfigureMFA>
 */
function SelectMFAOption({
  mfaType,
}: SelectMFAOptionProps): JSX.Element | null {
  // translation
  const useSMSText = translate('Use SMS');
  const useTOTPText = translate('Use an app');
  const smsDescriptionText = translate(
    'Receive an SMS on your phone with a code'
  );
  const useTOTPDescriptionText = translate(
    'Use an application on your phone. Applications include cloud-based TOTP (temporary one time password) apps such as'
  );
  const authyText = translate('authy');
  const googleAuthenticatorText = translate('Google Authenticator');
  const onePasswordText = translate('1password');

  return (
    <Radio value={mfaType}>
      {mfaType === 'SMS' ? (
        <>
          <Text fontWeight="bold">{useSMSText}</Text>
          <Text>{smsDescriptionText}</Text>
        </>
      ) : (
        <>
          <Text fontWeight="bold">{useTOTPText}</Text>
          <Text>{useTOTPDescriptionText}</Text>
          <Link isExternal href="">
            {authyText}
          </Link>
          {`, `}
          <Link isExternal href="">
            {googleAuthenticatorText}
          </Link>
          {`, `}
          <Link isExternal href="">
            {onePasswordText}
          </Link>
        </>
      )}
    </Radio>
  );
}

function SetupMFA({ children }: ConfigureMFAProps): JSX.Element | null {
  const [state, setState] = React.useState<ConfigureMFAState>('IDLE');
  const [currentMFA, setCurrentMFA] = React.useState<string>(null);
  const [_errorMessage, setErrorMessage] = React.useState<string>(null);

  const { user, isLoading } = useAuth();

  // translations
  const enableMFAText = translate('Enable multi-factor authentication');

  const fetchCurrentMFA = React.useCallback(async () => {
    if (user) {
      try {
        const currentMFASetting = await getCurrentMFA(user);
        setCurrentMFA(currentMFASetting);
      } catch (e) {
        const error = e as Error;
        setErrorMessage(error.message);
      }
    }
  }, [user]);

  // get current mfa settings for current user
  React.useEffect(() => {
    fetchCurrentMFA();
  }, [fetchCurrentMFA]);

  const isMFADisabled = React.useMemo(
    () => currentMFA === 'NOMFA',
    [currentMFA]
  );

  // event handlers
  const handleEnableMFA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('SELECT_MFA');
  };

  // Return null if user isn't authenticated in the first place
  if (!user) {
    logger.warn('<SetupMFA /> requires user to be authenticated.');
    return null;
  }

  // Return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isLoading) {
    return null;
  }

  return (
    <View className="amplify-configuremfa">
      {state === 'IDLE' ? (
        <>
          {isMFADisabled ? (
            <DefaultEnableMFAButton onClick={handleEnableMFA}>
              {enableMFAText}
            </DefaultEnableMFAButton>
          ) : null}
        </>
      ) : null}
      {state === 'SELECT_MFA' ? (
        <DefaultSelectMFA>{children}</DefaultSelectMFA>
      ) : null}
    </View>
  );
}

SetupMFA.Option = SelectMFAOption;

export default SetupMFA;
