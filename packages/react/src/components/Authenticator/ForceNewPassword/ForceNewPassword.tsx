import React from 'react';
import { translate } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { FormFields as DefaultFormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

export const ForceNewPassword = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending, toSignIn } = useAuthenticator((context) => [
    context.isPending,
    context.toSignIn,
  ]);
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ForceNewPassword: { FormFields = ForceNewPassword.FormFields },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-forcenewpassword=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Heading level={3}>{translate('Change Password')}</Heading>

          <FormFields />

          <RemoteErrorMessage />
          <Button
            isDisabled={isPending}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={translate('Changing')}
            fontWeight="normal"
          >
            {translate('Change Password')}
          </Button>
          <Button
            onClick={toSignIn}
            type="button"
            fontWeight="normal"
            variation="link"
            size="small"
          >
            {translate('Back to Sign In')}
          </Button>
        </Flex>
      </form>
    </RouteContainer>
  );
};

ForceNewPassword.FormFields = function FormFields() {
  return <DefaultFormFields />;
};
