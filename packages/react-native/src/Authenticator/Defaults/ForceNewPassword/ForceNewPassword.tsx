import React from 'react';
import { View } from 'react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultForceNewPasswordComponent } from '../types';
import { styles } from './styles';

const ForceNewPassword: DefaultForceNewPasswordComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  Header,
  isPending,
  toSignIn,
}) => {
  const { getChangePasswordText, getChangingText, getBackToSignInText } =
    authenticatorTextUtil;

  return (
    <View style={styles.container}>
      <Header>{getChangePasswordText()}</Header>
      <FormFields fields={fields} isPending={isPending} />
      {error ? (
        <ErrorMessage style={styles.errorMessage}>{error}</ErrorMessage>
      ) : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getChangingText() : getChangePasswordText()}
      </Button>
      <Button onPress={toSignIn} textStyle={styles.buttonSecondaryLabel}>
        {getBackToSignInText()}
      </Button>
      <Footer />
    </View>
  );
};

ForceNewPassword.Footer = DefaultFooter;
ForceNewPassword.FormFields = DefaultFormFields;
ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
