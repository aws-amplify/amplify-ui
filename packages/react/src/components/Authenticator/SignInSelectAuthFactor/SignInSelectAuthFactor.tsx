import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  Button,
  Divider,
  Flex,
  PasswordField,
  TextField,
} from '../../../primitives';
import { RemoteErrorMessage } from '../shared';
import { useFormHandlers } from '../hooks/useFormHandlers';
import type { RouteProps } from '../RouteContainer';
import { RouteContainer } from '../RouteContainer';

const {
  getSignInWithPasswordText,
  getSignInWithEmailText,
  getSignInWithSmsText,
  getSignInWithPasskeyText,
  getSigningInText,
  getBackToSignInText,
  getOrText,
  getUsernameLabelByLoginMechanism,
} = authenticatorTextUtil;

type AuthMethod = 'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN';

const getMethodButtonLabel = (method: AuthMethod): string => {
  switch (method) {
    case 'EMAIL_OTP':
      return getSignInWithEmailText();
    case 'SMS_OTP':
      return getSignInWithSmsText();
    case 'WEB_AUTHN':
      return getSignInWithPasskeyText();
    case 'PASSWORD':
      return getSignInWithPasswordText();
    default:
      return getSignInWithPasswordText();
  }
};

export const SignInSelectAuthFactor = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const {
    isPending,
    username,
    availableAuthMethods,
    toSignIn,
    selectAuthMethod,
    loginMechanism,
  } = useAuthenticator((context) => [
    context.isPending,
    context.username,
    context.availableAuthMethods,
    context.toSignIn,
    context.selectAuthMethod,
    context.loginMechanism,
  ]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const methods = (availableAuthMethods ?? []) as AuthMethod[];
  const hasPassword = methods.includes('PASSWORD');
  const passwordlessMethods = methods.filter((m) => m !== 'PASSWORD');

  const handleMethodSelect = (method: AuthMethod) => {
    selectAuthMethod({ method });
  };

  const usernameLabel = getUsernameLabelByLoginMechanism(loginMechanism);

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form
        data-amplify-authenticator-signinselect
        method="post"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <Flex direction="column">
          <TextField
            label={usernameLabel}
            name="username"
            value={username}
            isReadOnly
            isDisabled
          />

          {hasPassword && (
            <>
              <PasswordField
                label="Password"
                name="password"
                autoComplete="current-password"
                isDisabled={isPending}
              />
              <Button
                isDisabled={isPending}
                type="submit"
                variation="primary"
                isFullWidth
                isLoading={isPending}
                loadingText={getSigningInText()}
              >
                {getSignInWithPasswordText()}
              </Button>
            </>
          )}

          {hasPassword && passwordlessMethods.length > 0 && (
            <Divider label={getOrText()} />
          )}

          {passwordlessMethods.length > 0 && (
            <Flex direction="column" gap="0.5rem">
              {passwordlessMethods.map((method) => (
                <Button
                  key={method}
                  variation="primary"
                  isFullWidth
                  isDisabled={isPending}
                  onClick={() => handleMethodSelect(method)}
                >
                  {getMethodButtonLabel(method)}
                </Button>
              ))}
            </Flex>
          )}

          <RemoteErrorMessage />

          <Button
            onClick={toSignIn}
            size="small"
            variation="link"
            isDisabled={isPending}
          >
            {getBackToSignInText()}
          </Button>
        </Flex>
      </form>
    </RouteContainer>
  );
};
