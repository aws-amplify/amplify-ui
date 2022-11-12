import React from 'react';

import {
  getLogger,
  getCurrentMFA,
  setPreferredMFA,
  translate,
  setupTOTP,
  verifyTOTPToken,
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
import { FormValues } from '../types';

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
  // desired mfa type that end user selects
  const [desiredMFA, setDesiredMFA] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>(null);
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

  const hasFetched = React.useRef<boolean>(false);

  // get current mfa settings for current user
  React.useEffect(() => {
    const runFetch = async () => {
      await fetchCurrentMFA();
      hasFetched.current = true;
    };
    if (user && !hasFetched.current) {
      runFetch();
    }
  }, [user, fetchCurrentMFA]);

  const isMFADisabled = React.useMemo(
    () => currentMFA === 'NOMFA',
    [currentMFA]
  );

  // transition methods
  const toIdle = React.useCallback(() => {
    setFormValues({});
    setDesiredMFA(null);
    setState('IDLE');
  }, []);

  const toSelectMFA = React.useCallback(() => {
    setFormValues({});
    setDesiredMFA(null);
    setState('SELECT_MFA');
  }, []);

  // API calls
  const runVerifyTOTPToken = React.useCallback(
    async (code: string) => {
      try {
        await verifyTOTPToken({ user, code });

        // move to an intermediary state so that `SetupTOTP` doesn't remount
        // and call `Auth.setupTOTP` in parallel
        setState('LOADING');
        await setPreferredMFA({ user, mfaType: 'TOTP' });

        // mfa has been succesfully changed!
        setCurrentMFA('TOTP');
        setState('DONE');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
        setErrorMessage(error.message);
      }
    },
    [onError, user]
  );

  const runSetPreferredMFA = React.useCallback(
    async (newMFA: MFAType) => {
      try {
        await setPreferredMFA({ user, mfaType: newMFA });
        setState('DONE');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
      }
    },
    [user, onError]
  );

  const getTotpSecretCode = React.useCallback(async () => {
    return setupTOTP(user);
  }, [user]);

  // event handlers
  const handleEnableMFA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('SELECT_MFA');
  };

  const handleDisableMFA = React.useCallback(() => {
    runSetPreferredMFA('NOMFA');
  }, [runSetPreferredMFA]);

  const handleSelectMFAChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (name === 'mfaType') {
        setDesiredMFA(value);
      }
    },
    []
  );

  const handleSelectMFASubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      switch (desiredMFA) {
        case 'SMS': {
          setState('CONFIGURE_SMS');
          break;
        }
        case 'TOTP': {
          setState('CONFIGURE_TOTP');
          break;
        }
        default: {
          logger.error('Unknown mfa was selected:', desiredMFA);
          break;
        }
      }
    },
    [desiredMFA]
  );

  const handleConfigureTOTPSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { code } = formValues;
      runVerifyTOTPToken(code);
    },
    [runVerifyTOTPToken, formValues]
  );

  const handleCodeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues]
  );

  // Return null if user isn't authenticated in the first place
  if (!user) {
    logger.warn('<SetupMFA /> requires user to be authenticated.');
    return null;
  }

  // Return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isLoading) {
    return null;
  }

  // return null if mfaType hasn't been fetched yet
  if (!currentMFA) {
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
              onUpdateMFA={toSelectMFA}
            />
          )}
        </>
      ) : null}
      {state === 'SELECT_MFA' ? (
        <SelectMFA
          onSubmit={handleSelectMFASubmit}
          onChange={handleSelectMFAChange}
          onCancel={toIdle}
          isDisabled={!desiredMFA}
        >
          {children}
        </SelectMFA>
      ) : null}
      {state === 'CONFIGURE_TOTP' ? (
        <ConfigureTOTP
          onCancel={toSelectMFA}
          getTotpSecretCode={getTotpSecretCode}
          onChange={handleCodeChange}
          onSubmit={handleConfigureTOTPSubmit}
          totpIssuer="AWSCognito"
          totpUsername={user.username}
        />
      ) : null}
      {state === 'CONFIGURE_SMS' ? (
        <ConfigureSMS onCancel={toSelectMFA} />
      ) : null}
      {state === 'VERIFY_SMS' ? <VerifySMS /> : null}
    </View>
  );
}

SetupMFA.Option = SelectMFAOption;

export default SetupMFA;
