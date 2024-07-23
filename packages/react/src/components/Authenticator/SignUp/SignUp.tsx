import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { View } from '../../../primitives/View';
import { FederatedSignIn } from '../FederatedSignIn';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields as DefaultFormFields } from '../shared/FormFields';

const { getCreateAccountText, getCreatingAccountText } = authenticatorTextUtil;

export function SignUp(): JSX.Element {
  const { hasValidationErrors, isPending } = useAuthenticator((context) => [
    context.hasValidationErrors,
    context.isPending,
  ]);
  const { handleChange, handleBlur, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SignUp: {
        Header = SignUp.Header,
        FormFields = SignUp.FormFields,
        Footer = SignUp.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signup=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <FederatedSignIn />

        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Flex direction="column">
            <FormFields />
            <RemoteErrorMessage />
          </Flex>

          <Button
            isDisabled={hasValidationErrors || isPending}
            isFullWidth
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={getCreatingAccountText()}
          >
            {getCreateAccountText()}
          </Button>
          <Footer />
        </Flex>
      </form>
    </View>
  );
}

SignUp.Header = function Header(): JSX.Element {
  // @ts-ignore
  return null;
};
SignUp.FormFields = function FormFields() {
  return <DefaultFormFields />;
};
SignUp.Footer = function Footer(): JSX.Element {
  // @ts-ignore
  return null;
};
