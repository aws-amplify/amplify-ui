import React from 'react';
import { Text } from 'react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultConfirmSignUpComponent } from '../types';
import { Button, ErrorMessage } from '../../../primitives';
import { styles } from './style';

const {
  getDeliveryMethodText,
  getDeliveryMessageText,
  getConfirmingText,
  getConfirmText,
  getResendCodeText,
} = authenticatorTextUtil;

const ConfirmSignUp: DefaultConfirmSignUpComponent = ({
  codeDeliveryDetails,
  error,
  fields,
  Footer,
  FormFields,
  Header,
  isPending,
  resendCode,
}) => {
  return (
    <>
      <Header>{getDeliveryMethodText(codeDeliveryDetails)}</Header>
      <Text>{getDeliveryMessageText(codeDeliveryDetails)}</Text>
      <FormFields fields={fields} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getConfirmingText() : getConfirmText()}
      </Button>

      <Footer>
        <Button
          onPress={resendCode}
          style={styles.buttonSecondary}
          textStyle={styles.buttonSecondaryLabel}
        >
          {getResendCodeText()}
        </Button>
      </Footer>
    </>
  );
};

ConfirmSignUp.FormFields = DefaultFormFields;
ConfirmSignUp.Footer = DefaultFooter;
ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.displayName = 'ConfirmSignUp';
export default ConfirmSignUp;
