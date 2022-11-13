import React from 'react';

import {
  AmplifyUser,
  getCurrentMFA,
  getLogger,
  getUserPhoneInfo,
  isMFAType,
  MFAType,
  setPreferredMFA,
  setupTOTP,
  translate,
  UserPhoneInfo,
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

function SetupMFA({
  children,
  onError,
}: ConfigureMFAProps): JSX.Element | null {
  const [state, setState] = React.useState<ConfigureMFAState>('IDLE');
  const [currentMFA, setCurrentMFA] = React.useState<MFAType>(null);
  const [desiredMFA, setDesiredMFA] = React.useState<MFAType>(null);
  const [formValues, setFormValues] = React.useState<FormValues>(null);
  const [phoneInfo, setPhoneInfo] = React.useState<UserPhoneInfo>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>(null);

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
        setCurrentMFA('totp');
        setState('DONE');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
        setState('CONFIGURE_TOTP');
        setErrorMessage(error.message);
      }
    },
    [onError, user]
  );

  const runDisableMFA = React.useCallback(async () => {
    try {
      await setPreferredMFA({ user, mfaType: 'NOMFA' });

      setCurrentMFA('nomfa');
      setState('DONE');
    } catch (e) {
      const error = e as Error;
      onError?.(error);
      setErrorMessage(error.message);
    }
  }, [user, onError]);

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
        setState('DONE');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
        setErrorMessage(error.message);
      }
    },
    [onError, user]
  );

  const runSendSMSCode = React.useCallback(async () => {
    try {
      setState('LOADING');
      await verifyUserAttribute();

      setFormValues({});
      setState('VERIFY_SMS');
      setPhoneInfo(null);
    } catch (e) {
      const error = e as Error;
      onError?.(error);
      setErrorMessage(error.message);
      toSelectMFA();
    }
  }, [onError, toSelectMFA]);

  // event handlers
  const handleEnableMFA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('SELECT_MFA');
  };

  const handleDisableMFA = React.useCallback(() => {
    runDisableMFA();
  }, [runDisableMFA]);

  const handleSelectMFAChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { value } = event.target;

      if (isMFAType(value)) {
        setDesiredMFA(value);
      } else {
        logger.error('Unknown mfa type was selected', value);
      }
    },
    []
  );

  const handleSelectMFASubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      switch (desiredMFA) {
        case 'sms': {
          const userPhoneInfo = getUserPhoneInfo(user);
          const { dialCode, phoneNumber, hasPhoneNumber } = userPhoneInfo;

          if (hasPhoneNumber) {
            // set initial values
            setFormValues({ dialCode, phoneNumber });
            setPhoneInfo(userPhoneInfo);
            setState('CONFIGURE_SMS');
          } else {
            // user doesn't have a phone yet, warn them.
            setErrorMessage(noPhoneErrorText);
          }
          break;
        }
        case 'totp': {
          setState('CONFIGURE_TOTP');
          break;
        }
        default: {
          logger.error('Unknown mfa was selected:', desiredMFA);
          break;
        }
      }
    },
    [desiredMFA, user, noPhoneErrorText]
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

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const handleConfigureSMSSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    runSendSMSCode();
  };

  const handleVerifySMSCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { code } = formValues;
    runVerifySMSCode(code);
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
          getTotpSecretCode={getTotpSecretCode(user)}
          onChange={handleCodeChange}
          onSubmit={handleConfigureTOTPSubmit}
          totpIssuer="AWSCognito"
          totpUsername={user.username}
        />
      ) : null}
      {state === 'CONFIGURE_SMS' ? (
        <ConfigureSMS
          hasPhoneNumber={phoneInfo.hasPhoneNumber}
          defaultDialCode={phoneInfo.dialCode}
          isVerified={phoneInfo.isVerified}
          formValues={formValues}
          onCancel={toSelectMFA}
          onChange={handleChange}
          onDialCodeChange={handleChange}
          onSubmit={handleConfigureSMSSubmit}
        />
      ) : null}
      {state === 'VERIFY_SMS' ? (
        <VerifySMS
          onCancel={toSelectMFA}
          onSubmit={handleVerifySMSCode}
          onChange={handleChange}
        />
      ) : null}

      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </Flex>
  );
}

SetupMFA.Option = MFAOption;

export default SetupMFA;
