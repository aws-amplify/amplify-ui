import React from 'react';

import {
  getLogger,
  getCurrentMFA,
  disableMFA,
  translate,
} from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Radio, Text } from '../../../primitives';
import {
  ConfigureSMS,
  ConfigureTOTP,
  DisplayCurrentMFA,
  EnableMFAButton,
  SelectMFA,
  VerifySMS,
} from './defaults';
import {
  ConfigureMFAProps,
  ConfigureMFAState,
  MFAType,
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
    'Use an application on your phone. Applications include cloud-based TOTP (temporary one time password) apps such as Authy, Google Authenticator, and 1password.'
  );

  return (
    <Radio value={mfaType}>
      <Text fontWeight="bold">
        {mfaType === 'SMS' ? useSMSText : useTOTPText}
      </Text>
      <Text>
        {mfaType === 'SMS' ? smsDescriptionText : useTOTPDescriptionText}
      </Text>
    </Radio>
  );
}

function SetupMFA({
  children,
  onError,
}: ConfigureMFAProps): JSX.Element | null {
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

  // API calls
  const runDisableMFA = React.useCallback(async () => {
    try {
      setState('DISABLING_MFA');
      await disableMFA(user);
    } catch (e) {
      const error = e as Error;
      onError(error);
    } finally {
      setState('IDLE');
    }
  }, [onError, user]);

  // event handlers
  const handleEnableMFA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('SELECT_MFA');
  };

  const handleDisableMFA = React.useCallback(() => {
    // using a separate async function because disableMFA needs to be async
    runDisableMFA();
  }, [runDisableMFA]);

  const handleUpdateMFA = React.useCallback(() => {
    setState('SELECT_MFA');
  }, []);

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
      {state === 'IDLE' || state === 'DONE' ? (
        <>
          {isMFADisabled ? (
            <EnableMFAButton onClick={handleEnableMFA}>
              {enableMFAText}
            </EnableMFAButton>
          ) : (
            <DisplayCurrentMFA
              currentMFA={currentMFA as MFAType}
              onDisableMFA={handleDisableMFA}
              onUpdateMFA={handleUpdateMFA}
            />
          )}
        </>
      ) : null}
      {state === 'SELECT_MFA' ? <SelectMFA>{children}</SelectMFA> : null}
      {state === 'CONFIGURE_TOTP' ? <ConfigureTOTP /> : null}
      {state === 'CONFIGURE_SMS' ? <ConfigureSMS /> : null}
      {state === 'VERIFY_SMS' ? <VerifySMS /> : null}
    </View>
  );
}

SetupMFA.Option = SelectMFAOption;

export default SetupMFA;
