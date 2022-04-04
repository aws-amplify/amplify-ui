import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassNames } from '../../../primitives/shared';

import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { Flex, Heading } from '../../..';
import { ConfirmSignInFooter, RemoteErrorMessage } from '../shared';
import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';
import { FormFields } from '../shared/FormFields';

export const ConfirmSignIn = (): JSX.Element => {
  const { isPending } = useAuthenticator();
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ConfirmSignIn: {
        Header = ConfirmSignIn.Header,
        Footer = ConfirmSignIn.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <form
      className={classNames(
        ComponentClassNames.AuthenticatorConfirmSignIn,
        ComponentClassNames.AuthenticatorForm
      )}
      data-amplify-form=""
      data-amplify-authenticator-confirmsignin=""
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
          <FormFields route="confirmSignIn" />
          <RemoteErrorMessage />
        </Flex>

        <ConfirmSignInFooter />
        <Footer />
      </fieldset>
    </form>
  );
};

function Header() {
  const { _state } = useAuthenticator();
  const actorState = getActorState(_state) as SignInState;

  const { challengeName } = actorState.context as SignInContext;
  let headerText: string;

  switch (challengeName) {
    case AuthChallengeNames.SMS_MFA:
      headerText = translate('Confirm SMS Code');
      break;
    case AuthChallengeNames.SOFTWARE_TOKEN_MFA:
      headerText = translate('Confirm TOTP Code');
      break;
    default:
      throw new Error(
        `${translate(
          'Unexpected challengeName encountered in ConfirmSignIn:'
        )} ${challengeName}`
      );
  }

  return <Heading level={3}>{headerText}</Heading>;
}

ConfirmSignIn.Header = Header;
ConfirmSignIn.Footer = (): JSX.Element => null;
