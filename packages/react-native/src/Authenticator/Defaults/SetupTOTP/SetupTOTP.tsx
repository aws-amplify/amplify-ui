import React, { useCallback, useEffect, useState } from 'react';

import { Logger } from 'aws-amplify';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultSetupTOTPComponent } from '../types';
import { styles } from './styles';

const logger = new Logger('SetupTOTP-logger');

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  // getCopiedText,
  // getCopyText,
  // getLoadingText,
  getSetupTOTPText,
} = authenticatorTextUtil;

const SetupTOTP: DefaultSetupTOTPComponent = ({
  // totpIssuer,
  // totpUsername,
  getTotpSecretCode,
  //
  error,
  fields,
  Footer,
  FormFields,
  Header,
  isPending,
}) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [copyTextLabel, setCopyTextLabel] = useState<string>('COPY'); // getCopyText()
  const [secretKey, setSecretKey] = useState<string>('');

  const getSecretKey = useCallback(async (): Promise<void> => {
    try {
      const newSecretKey = await getTotpSecretCode();
      setSecretKey(newSecretKey);
    } catch (error) {
      logger.error(error);
    } finally {
      // setIsLoading(false);
    }
  }, [getTotpSecretCode]);

  useEffect(() => {
    if (!secretKey) {
      getSecretKey();
    }
  }, [getSecretKey, secretKey]);

  // const copyText = (): void => {
  // how to do this in React Native?
  // navigator.clipboard.writeText(secretKey);
  // setCopyTextLabel(getCopiedText());
  // };

  return (
    <>
      <Header>{getSetupTOTPText()}</Header>
      <FormFields fields={fields} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getConfirmingText() : getConfirmText()}
      </Button>
      <Button
        // onPress={toSignIn}
        style={styles.buttonSecondary}
        textStyle={styles.buttonSecondaryLabel}
      >
        {getBackToSignInText()}
      </Button>
      <Footer />
    </>
  );
};

SetupTOTP.Footer = DefaultFooter;
SetupTOTP.FormFields = DefaultFormFields;
SetupTOTP.Header = DefaultHeader;

SetupTOTP.displayName = 'SetupTOTP';
export default SetupTOTP;
