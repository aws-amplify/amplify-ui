import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import { Logger } from 'aws-amplify';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { icons } from '../../../assets';
import { Button, ErrorMessage, IconButton } from '../../../primitives';

import {
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSetupTOTPComponent } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'SetupTOTP';

const logger = new Logger('Authenticator');

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
  handleBlur,
  handleChange,
  handleSubmit,
  Header,
  isPending,
  toSignIn,
}) => {
  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  const [secretKey, setSecretKey] = useState<string | null>(null);

  const getSecretKey = useCallback(async () => {
    if (secretKey) {
      return;
    }
    try {
      const newSecretKey = await getTotpSecretCode();
      setSecretKey(newSecretKey);
    } catch (error) {
      logger.error(error);
    }
  }, [getTotpSecretCode, secretKey]);

  useEffect(() => {
    if (!secretKey) {
      getSecretKey();
    }
  }, [getSecretKey, secretKey]);

  const copyText = () => {
    if (secretKey) {
      Clipboard.setString(secretKey);
    }
  };

  return (
    <>
      <Header>{getSetupTOTPText()}</Header>
      {secretKey ? (
        <View style={styles.secretKeyContainer}>
          <Text style={styles.secretKeyText}>{secretKey}</Text>
          <IconButton
            color="teal"
            iconStyle={styles.copyIcon}
            onPress={copyText}
            size={24}
            source={icons.copy}
            testID="amplify__copy-text-button"
          />
        </View>
      ) : null}
      <FormFields fields={fieldsWithHandlers} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        variant="primary"
        onPress={handleFormSubmit}
        style={styles.buttonPrimary}
      >
        {isPending ? getConfirmingText() : getConfirmText()}
      </Button>
      <Button onPress={toSignIn} variant="link" style={styles.buttonSecondary}>
        {getBackToSignInText()}
      </Button>
      <Footer />
    </>
  );
};

SetupTOTP.Footer = DefaultFooter;
SetupTOTP.FormFields = DefaultTextFormFields;
SetupTOTP.Header = DefaultHeader;

SetupTOTP.displayName = COMPONENT_NAME;
export default SetupTOTP;
