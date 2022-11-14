import React from 'react';

import { getLogger, translate } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Flex } from '../../../primitives';
import { MFAOption } from './MFAOption';
import { useConfigureMFA } from './hooks/useConfigureMFA';
import {
  ConfigureSMS,
  ConfigureTOTP,
  DisplayCurrentMFA,
  EnableMFAButton,
  Error,
  SelectMFA,
  VerifySMS,
} from './defaults';
import { ConfigureMFAProps } from './types';

const logger = getLogger('Auth');

function ConfigureMFA({
  children,
  onSuccess,
  onError,
}: ConfigureMFAProps): JSX.Element | null {
  const {
    state,
    currentMFA,
    formValues,
    errorMessage,
    defaultDialCode,
    updateForm,
    runVerifyTOTPToken,
    getTotpSecretCode,
    runEnableMFA,
    runDisableMFA,
    runVerifySMSCode,
    runSelectMFA,
    transitionTo,
    runSendSMSCode,
  } = useConfigureMFA({ onSuccess, onError });
  const { user, isLoading } = useAuth();

  // translations
  const enableMFAText = translate('Enable multi-factor authentication');

  const isMFADisabled = React.useMemo(
    () => currentMFA === 'nomfa',
    [currentMFA]
  );

  // event handlers
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  const handleEnableMFA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    runEnableMFA();
  };

  const handleDisableMFA = React.useCallback(() => {
    runDisableMFA();
  }, [runDisableMFA]);

  const handleSelectMFA = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSelectMFA();
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
