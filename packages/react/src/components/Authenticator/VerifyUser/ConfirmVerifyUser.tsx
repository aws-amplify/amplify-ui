import * as React from 'react';

import { getFormFields, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';
import { useCustomComponents } from '../hooks/useCustomComponents';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';
import { BaseFormFields } from '../shared/BaseFormFields';

export const ConfirmVerifyUser = (): JSX.Element => {
  const {
    components: {
      ConfirmVerifyUser: {
        Header = ConfirmVerifyUser.Header,
        Footer = ConfirmVerifyUser.Footer,
      },
    },
  } = useCustomComponents();

  const { submitForm, updateForm, isPending, _state } = useAuthenticator();

  const formFields = React.useMemo(
    () => getFormFields('confirmVerifyUser', _state),
    []
  );

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputOrSelectElement(event.target)) {
      let { name, type, value } = event.target;
      if (
        isInputElement(event.target) &&
        type === 'checkbox' &&
        !event.target.checked
      ) {
        value = undefined;
      }

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm(getFormDataFromEvent(event));
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmverifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          <BaseFormFields formFields={formFields} />
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
