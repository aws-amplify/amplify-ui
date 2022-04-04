import * as React from 'react';
import { translate } from '@aws-amplify/ui';
import classNames from 'classnames';
import { ComponentClassNames } from '../../../primitives/shared';

import { Flex, Heading } from '../../..';
import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';
import { FormFields } from '../shared/FormFields';

export const ConfirmResetPassword = (): JSX.Element => {
  const { isPending } = useAuthenticator();
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ConfirmResetPassword: {
        Header = ConfirmResetPassword.Header,
        Footer = ConfirmResetPassword.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <form
      className={classNames(
        ComponentClassNames.AuthenticatorForm,
        ComponentClassNames.AuthenticatorConfirmResetPassword
      )}
      data-amplify-form=""
      data-amplify-authenticator-confirmresetpassword=""
      method="post"
      onSubmit={handleSubmit}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      <fieldset
        className={classNames(
          'amplify-flex',
          ComponentClassNames.AuthenticatorFieldSet
        )}
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          <FormFields route="confirmResetPassword" />
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonSendType="RESEND"
          cancelButtonText={translate('Resend Code')}
        />
        <Footer />
      </fieldset>
    </form>
  );
};

ConfirmResetPassword.Header = () => {
  const headerText = translate('Reset your password');

  return <Heading level={3}>{headerText}</Heading>;
};

ConfirmResetPassword.Footer = (): JSX.Element => null;
