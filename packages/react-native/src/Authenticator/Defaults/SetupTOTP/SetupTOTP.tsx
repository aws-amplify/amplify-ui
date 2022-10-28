import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Logger } from 'aws-amplify';
import { authenticatorTextUtil } from '@aws-amplify/ui';
// import Clipboard from '@react-native-clipboard/clipboard';

import { Button, ErrorMessage, IconButton } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultSetupTOTPComponent } from '../types';
import { styles } from './styles';
import { icons } from '../../../assets';

const logger = new Logger('SetupTOTP-logger');

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTOTPText,
} = authenticatorTextUtil;

const SetupTOTP: DefaultSetupTOTPComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  getTotpSecretCode,
  Header,
  isPending,
  // TODO: add toSignIn prop to SetupTOTP component
  // toSignIn
  // TODO: remove `totpIssuer` and `totpUsername` from types
  // totpIssuer,
  // totpUsername,
}) => {
  const [textCopied, setTextCopied] = useState<boolean>(false);
  const [secretKey, setSecretKey] = useState<string>('testing 123');

  const getSecretKey = useCallback(async (): Promise<void> => {
    try {
      const newSecretKey = await getTotpSecretCode();
      setSecretKey(newSecretKey);
    } catch (error) {
      logger.error(error);
    }
  }, [getTotpSecretCode]);

  useEffect(() => {
    if (!secretKey) {
      getSecretKey();
    }
  }, [getSecretKey, secretKey]);

  const copyText = (): void => {
    // TODO: implement copy-to-clipboard functionality
    // use @react-native-clipboard/clipboard
    // Clipboard.setString(secretKey);

    if (!textCopied) {
      setTextCopied(!textCopied);
    }
  };

  return (
    <>
      <Header>{getSetupTOTPText()}</Header>
      <View style={styles.secretKeyContainer}>
        <Text>{secretKey}</Text>
        <IconButton
          color="teal"
          iconStyle={styles.copyIcon}
          onPress={copyText}
          size={20}
          source={icons.copy}
        />
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
