import React from 'react';

import {
  AmplifyUser,
  getCurrentMFA,
  getUserPhoneInfo,
  MFAType,
  getLogger,
  setPreferredMFA,
  setupTOTP,
  translate,
  verifyTOTPToken,
  verifyUserAttribute,
  verifyUserAttributeSubmit,
} from '@aws-amplify/ui';

import { useAuth } from '../../../../internal';
import { FormValues } from '../../types';
import { ConfigureMFAState } from '../types';

const logger = getLogger('Auth');

interface UseConfigureMFAParam {
  onSuccess?: (mfaType: MFAType) => void;
  onError?: (error: Error) => void;
}

interface UseConfigureMFAResult {
  // states
  state: ConfigureMFAState;
  currentMFA: MFAType;
  formValues: FormValues;
  errorMessage: string;
  defaultDialCode: string;
  // set states
  updateForm: ({ name, value }: { name: string; value: string }) => void;
  // API handlers
  runVerifyTOTPToken: (code: string) => Promise<void>;
  runEnableMFA: () => void;
  runDisableMFA: () => Promise<void>;
  getTotpSecretCode: (user: AmplifyUser) => () => Promise<string>;
  runVerifySMSCode: (code: string) => Promise<void>;
  runSendSMSCode: () => Promise<void>;
  // state management handlers
  runSelectMFA: () => void;
  transitionTo: (state: ConfigureMFAState) => void;
}

export const useConfigureMFA = ({
  onSuccess,
  onError,
}: UseConfigureMFAParam): UseConfigureMFAResult => {
  const [state, setState] = React.useState<ConfigureMFAState>('IDLE');
  const [currentMFA, setCurrentMFA] = React.useState<MFAType>(null);
  const [formValues, setFormValues] = React.useState<FormValues>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [defaultDialCode, setDefaultDialCode] = React.useState<string>(null);

  const { user } = useAuth();

  // translation for known error message
  const noPhoneErrorText = translate(
    'You do not have a phone number setup yet. Please register a phone number first.'
  );

  // get current mfa on init
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

  // expose form updater
  const updateForm = ({ name, value }: { name: string; value: string }) => {
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  // transition method
  const transitionTo = React.useCallback((newState: ConfigureMFAState) => {
    setFormValues({});
    setErrorMessage(null);
    setState(newState);
  }, []);

  const runDisableMFA = React.useCallback(async () => {
    try {
      setState('LOADING');
      await setPreferredMFA({ user, mfaType: 'NOMFA' });

      setCurrentMFA('nomfa');
      transitionTo('DONE');
      onSuccess?.('totp');
    } catch (e) {
      const error = e as Error;
      onError?.(error);
      setErrorMessage(error.message);
    }
  }, [user, transitionTo, onSuccess, onError]);

  const runEnableMFA = React.useCallback(() => {
    transitionTo('SELECT_MFA');
  }, [transitionTo]);

  // api call helpers
  const runSelectMFA = () => {
    const { mfaType } = formValues;

    switch (mfaType) {
      case 'sms': {
        const userPhoneInfo = getUserPhoneInfo(user);
        const { dialCode, phoneNumber, hasPhoneNumber } = userPhoneInfo;

        if (hasPhoneNumber) {
          // set initial values
          setDefaultDialCode(dialCode);
          transitionTo('CONFIGURE_SMS');
          setFormValues({ dialCode, phoneNumber });
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

  const getTotpSecretCode = React.useCallback((user: AmplifyUser) => {
    return () => {
      return setupTOTP(user);
    };
  }, []);

  const runVerifyTOTPToken = React.useCallback(
    async (code: string) => {
      try {
        await verifyTOTPToken({ user, code });

        // workaround: setting loading state before setPreferredMFA, because
        // setPreferredMFA triggers a token refresh, which in turns re-renders
        // authenticator (if any) and remounts this component
        setState('LOADING');
        await setPreferredMFA({ user, mfaType: 'TOTP' });

        // mfa has been succesfully changed!
        setCurrentMFA('totp');
        transitionTo('DONE');
        onSuccess?.('totp');
      } catch (e) {
        const error = e as Error;
        onError?.(error);
        if (state !== 'CONFIGURE_TOTP') setState('CONFIGURE_TOTP');
        setErrorMessage(error.message);
      }
    },
    [user, onSuccess, transitionTo, onError, state]
  );

  const runVerifySMSCode = React.useCallback(
    async (code: string) => {
      try {
        await verifyUserAttributeSubmit(code);

        setState('LOADING');
        await setPreferredMFA({ user, mfaType: 'SMS' });

        setCurrentMFA('sms');
        transitionTo('DONE');
        onSuccess?.('sms');
      } catch (e) {
        const error = e as Error;
        if (state !== 'VERIFY_SMS') {
          setState('VERIFY_SMS');
        }
        onError?.(error);
        setErrorMessage(error.message);
      }
    },
    [user, transitionTo, onSuccess, state, onError]
  );

  const runSendSMSCode = React.useCallback(async () => {
    try {
      await verifyUserAttribute();
      transitionTo('VERIFY_SMS');
    } catch (e) {
      const error = e as Error;
      onError?.(error);
      setErrorMessage(error.message);
      transitionTo('SELECT_MFA');
    }
  }, [onError, transitionTo]);

  return {
    currentMFA,
    defaultDialCode,
    errorMessage,
    formValues,
    getTotpSecretCode,
    runDisableMFA,
    runEnableMFA,
    runSelectMFA,
    runSendSMSCode,
    runVerifySMSCode,
    runVerifyTOTPToken,
    state,
    updateForm,
    transitionTo,
  };
};
