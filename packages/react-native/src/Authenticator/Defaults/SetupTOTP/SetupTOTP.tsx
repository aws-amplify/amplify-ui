import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Logger } from 'aws-amplify';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultSetupTOTPComponent } from '../types';
import { styles } from './styles';
// import { icons } from '../../../assets';

const logger = new Logger('SetupTOTP-logger');

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getCopiedText,
  getCopyText,
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
  const [textCopied, setTextCopied] = useState<boolean>(false); // getCopyText()
  const [secretKey, setSecretKey] = useState<string>('testing 123');

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

  const copyText = (): void => {
    // how to do this in React Native?

    // navigator.clipboard.writeText(secretKey);
    if (!textCopied) {
      setTextCopied(!textCopied);
    }
  };

  return (
    <>
      <Header>{getSetupTOTPText()}</Header>
      <View style={styles.secretKeyContainer}>
        <Text>{secretKey}</Text>
        <Button
          onPress={copyText}
          style={styles.copyButton}
          textStyle={styles.copyButtonLabel}
        >
          {textCopied ? getCopiedText() : getCopyText()}
        </Button>
        {/* <IconButton
          onPress={copyText}
          source={icons.copy}
          size={20}
          color="teal"
          iconStyle={styles.copyIcon}
        /> */}
      </View>
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
