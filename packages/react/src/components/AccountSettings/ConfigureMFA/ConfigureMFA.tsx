import React from 'react';

import {
  AmplifyUser,
  getCurrentMFA,
  getLogger,
  getUserPhoneInfo,
  MFAType,
  setPreferredMFA,
  setupTOTP,
  translate,
  verifyTOTPToken,
  verifyUserAttribute,
  verifyUserAttributeSubmit,
} from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Flex } from '../../../primitives';
import { FormValues } from '../types';
import { MFAOption } from './MFAOption';
import {
  ConfigureSMS,
  ConfigureTOTP,
  DisplayCurrentMFA,
  EnableMFAButton,
  Error,
  SelectMFA,
  VerifySMS,
} from './defaults';
import { ConfigureMFAProps, ConfigureMFAState } from './types';

const logger = getLogger('Auth');

function ConfigureMFA({
  children,
  onError,
}: ConfigureMFAProps): JSX.Element | null {
  const [state, setState] = React.useState<ConfigureMFAState>('IDLE');
  const [currentMFA, setCurrentMFA] = React.useState<MFAType>(null);
  const [formValues, setFormValues] = React.useState<FormValues>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [defaultDialCode, setDefaultDialCode] = React.useState<string>(null);

  const { user, isLoading } = useAuth();

  // translations
  const enableMFAText = translate('Enable multi-factor authentication');
  const noPhoneErrorText = translate(
    'You do not have a phone number setup yet. Please register a phone number first.'
  );

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
    () => currentMFA === 'nomfa',
    [currentMFA]
  );

  // transition methods
  const transitionTo = React.useCallback((newState: ConfigureMFAState) => {
    setFormValues({});
    setErrorMessage(null);
    setState(newState);
  }, []);

  // API call helpers
  const runVerifyTOTPToken = React.useCallback(
    async (code: string) => {
      try {
        await verifyTOTPToken({ user, code });

        // move to an intermediary state so that `SetupTOTP` doesn't remount
        // and call `Auth.setupTOTP` in parallel
        setState('LOADING');
        await setPreferredMFA({ user, mfaType: 'TOTP' });

        // mfa has been succesfully changed!
        setCurrentMFA('totp');
        transitionTo('DONE');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
        if (state !== 'CONFIGURE_TOTP') {
          setState('CONFIGURE_TOTP');
        }
        setErrorMessage(error.message);
      }
    },
    [user, transitionTo, onError, state]
  );

  const runDisableMFA = React.useCallback(async () => {
    try {
      await setPreferredMFA({ user, mfaType: 'NOMFA' });

      setCurrentMFA('nomfa');
      transitionTo('DONE');
    } catch (e) {
      const error = e as Error;
      onError?.(error);
      setErrorMessage(error.message);
    }
  }, [user, transitionTo, onError]);

  const getTotpSecretCode = React.useCallback((user: AmplifyUser) => {
    return () => {
      return setupTOTP(user);
    };
  }, []);

  const runVerifySMSCode = React.useCallback(
    async (code: string) => {
      try {
        await verifyUserAttributeSubmit(code);
        await setPreferredMFA({ user, mfaType: 'SMS' });
        setCurrentMFA('sms');
        transitionTo('DONE');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
        setErrorMessage(error.message);
      }
    },
    [user, transitionTo, onError]
  );

  const runSendSMSCode = React.useCallback(async () => {
    try {
      setState('LOADING');
      await verifyUserAttribute();

      transitionTo('VERIFY_SMS');
    } catch (e) {
      const error = e as Error;
      onError?.(error);
      setErrorMessage(error.message);
      transitionTo('SELECT_MFA');
    }
  }, [onError, transitionTo]);

  // submit handlers
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const handleEnableMFA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    transitionTo('SELECT_MFA');
  };

  const handleDisableMFA = React.useCallback(() => {
    runDisableMFA();
  }, [runDisableMFA]);

  const handleSelectMFA = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { mfaType } = formValues;

    switch (mfaType) {
      case 'sms': {
        const userPhoneInfo = getUserPhoneInfo(user);
        const { dialCode, phoneNumber, hasPhoneNumber } = userPhoneInfo;

        if (hasPhoneNumber) {
          // set initial values
          setDefaultDialCode(dialCode);
          setFormValues({ dialCode, phoneNumber });
          setState('CONFIGURE_SMS');
        } else {
          // user doesn't have a phone yet, warn them.
          setErrorMessage(noPhoneErrorText);
        }
        break;
      }
      case 'totp': {
        transitionTo('CONFIGURE_TOTP');
        break;
      }
      default: {
        logger.error('Unknown mfa was selected:', mfaType);
        break;
      }
    }
  };

  const handleConfigureTOTP = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { code } = formValues;
      runVerifyTOTPToken(code);
    },
    [runVerifyTOTPToken, formValues]
  );

  const handleConfigureSMS = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSendSMSCode();
  };

  const handleVerifySMS = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { code } = formValues;
    runVerifySMSCode(code);
  };

  // Return null if user isn't authenticated in the first place
  if (!user) {
    logger.warn('<ConfigureMFA /> requires user to be authenticated.');
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
    <Flex direction="column" className="amplify-configuremfa">
      {state === 'IDLE' || state === 'DONE' ? (
        <>
          {isMFADisabled ? (
            <EnableMFAButton onClick={handleEnableMFA}>
              {enableMFAText}
            </EnableMFAButton>
          ) : (
            <DisplayCurrentMFA
              currentMFA={currentMFA}
              onDisableMFA={handleDisableMFA}
              onUpdateMFA={() => transitionTo('SELECT_MFA')}
            />
          )}
        </>
      ) : null}
      {state === 'SELECT_MFA' ? (
        <SelectMFA
          onSubmit={handleSelectMFA}
          onChange={handleChange}
          onCancel={() => transitionTo('IDLE')}
          isDisabled={!formValues.mfaType}
        >
          {children}
        </SelectMFA>
      ) : null}
      {state === 'CONFIGURE_TOTP' ? (
        <ConfigureTOTP
          onCancel={() => transitionTo('SELECT_MFA')}
          getTotpSecretCode={getTotpSecretCode(user)}
          onChange={handleChange}
          onSubmit={handleConfigureTOTP}
          totpIssuer="AWSCognito"
          totpUsername={user.username}
        />
      ) : null}
      {state === 'CONFIGURE_SMS' ? (
        <ConfigureSMS
          defaultDialCode={defaultDialCode}
          formValues={formValues}
          onCancel={() => transitionTo('SELECT_MFA')}
          onChange={handleChange}
          onDialCodeChange={handleChange}
          onSubmit={handleConfigureSMS}
        />
      ) : null}
      {state === 'VERIFY_SMS' ? (
        <VerifySMS
          onCancel={() => transitionTo('SELECT_MFA')}
          onSubmit={handleVerifySMS}
          onChange={handleChange}
        />
      ) : null}

      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </Flex>
  );
}

ConfigureMFA.Option = MFAOption;

export default ConfigureMFA;
