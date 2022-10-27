import React from 'react';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { Button, ErrorMessage } from '../../../primitives';
import { DefaultConfirmVerifyUserComponent } from '../types';
import { authenticatorTextUtil } from '@aws-amplify/ui';
import { styles } from './styles';

const { getAccountRecoveryInfoText, getSkipText } = authenticatorTextUtil;

const ConfirmVerifyUser: DefaultConfirmVerifyUserComponent = ({
  error,
  fields,
  FormFields,
  Footer,
  Header,
  isPending,
}) => {
  return (
    <>
      <Header>{getAccountRecoveryInfoText()}</Header>
      <FormFields isPending={isPending} fields={fields} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonSecondary}
        textStyle={styles.buttonSecondaryLabel}
      >
        {getSkipText()}
      </Button>
      <Footer />
    </>
  );
};

const FormFields: DefaultConfirmVerifyUserComponent['FormFields'] = () => null;

ConfirmVerifyUser.Footer = DefaultFooter;
ConfirmVerifyUser.FormFields = FormFields;
ConfirmVerifyUser.Header = DefaultHeader;

ConfirmVerifyUser.displayName = 'ConfirmVerifyUser';
export default ConfirmVerifyUser;
