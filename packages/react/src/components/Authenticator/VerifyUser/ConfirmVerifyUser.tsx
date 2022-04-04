import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassNames } from '../../../primitives/shared';

import { translate } from '@aws-amplify/ui';

import { Flex, Heading } from '../../..';
import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';
import { FormFields } from '../shared/FormFields';

export const ConfirmVerifyUser = (): JSX.Element => {
  const { isPending } = useAuthenticator();
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ConfirmVerifyUser: {
        Header = ConfirmVerifyUser.Header,
        Footer = ConfirmVerifyUser.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <form
      className={classNames(
        ComponentClassNames.AuthenticatorForm,
        ComponentClassNames.AuthenticatorConfirmVerifyUser
      )}
      data-amplify-form=""
      data-amplify-authenticator-confirmverifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
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
          <FormFields route="confirmVerifyUser" />
        </Flex>

        <RemoteErrorMessage />

        <TwoButtonSubmitFooter
          cancelButtonText={translate('Skip')}
          cancelButtonSendType="SKIP"
        />
        <Footer />
      </fieldset>
    </form>
  );
};

ConfirmVerifyUser.Header = () => {
  return (
    <Heading level={3}>
      {translate('Account recovery requires verified contact information')}
    </Heading>
  );
};

ConfirmVerifyUser.Footer = (): JSX.Element => null;
