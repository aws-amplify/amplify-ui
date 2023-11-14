import * as React from 'react';
import {
  AuthenticatorMachineOptions,
  isFunction,
  FormFieldComponents,
  FormFieldOptions,
} from '@aws-amplify/ui';
import { AuthUser } from 'aws-amplify/auth';

import {
  AuthenticatorProvider as Provider,
  useAuthenticator,
  UseAuthenticator,
  useAuthenticatorInitMachine,
  useSetUserAgent,
} from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';

import {
  CustomComponentsContext,
  ComponentsProviderProps,
} from './hooks/useCustomComponents';
import { Router, RouterProps } from './Router';
import { SetupTotp } from './SetupTotp';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ResetPassword } from './ForgotPassword';
import { defaultComponents } from './hooks/useCustomComponents/defaultComponents';

export type SignOut = UseAuthenticator['signOut'];
export type AuthenticatorProps = Partial<
  Omit<AuthenticatorMachineOptions, 'formFields'> &
    ComponentsProviderProps &
    RouterProps & {
      children:
        | React.ReactNode
        | ((props: { signOut?: SignOut; user?: AuthUser }) => JSX.Element);
      formFields: {
        [key in FormFieldComponents]?: {
          [field_name: string]: ReactFormFieldOptions;
        };
      };
    }
>;

interface ReactFormFieldOptions extends FormFieldOptions {
  /** Desired HTML defaultValue type */
  defaultValue?: string;
  /** isReadOnly maps to readonly HTML type */
  isReadOnly?: boolean;
  /** Desired HTML pattern type */
  pattern?: string | undefined;
  /** Desired HTML minLength type */
  minLength?: number;
  /** Desired HTML maxLength type */
  maxLength?: number;
}

// `AuthenticatorInternal` exists to give access to the context returned via `useAuthenticator`,
// which allows the `Authenticator` to just return `children` if a user is authenticated.
// Once the `Provider` is removed from the `Authenticator` component and exported as
// `AuthenticatorProvider`, this component should be renamed to `Authenticator`.
export function AuthenticatorInternal({
  children,
  className,
  components: customComponents,
  formFields,
  hideSignUp,
  initialState,
  loginMechanisms,
  passwordSettings,
  signUpAttributes,
  services,
  socialProviders,
  variation,
}: AuthenticatorProps): JSX.Element {
  useDeprecationWarning({
    message:
      'The `passwordSettings` prop has been deprecated and will be removed in a future major version of Amplify UI.',
    // shouldWarn: !!passwordSettings,
    /**
     * @migration turn off until getConfig returns zero config
     */
    shouldWarn: false,
  });

  const { route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );

  useAuthenticatorInitMachine({
    initialState,
    loginMechanisms,
    passwordSettings,
    services,
    signUpAttributes,
    socialProviders,
    formFields,
  });

  const value = React.useMemo(
    () => ({ components: { ...defaultComponents, ...customComponents } }),
    [customComponents]
  );

  const isAuthenticatedRoute = route === 'authenticated' || route === 'signOut';
  if (isAuthenticatedRoute) {
    // `Authenticator` might not have user defined `children` for non SPA use cases.
    if (!children) {
      // @ts-ignore
      return null;
    }

    return (
      <>
        {isFunction(children)
          ? children({ signOut, user }) // children is a render prop
          : children}
      </>
    );
  }

  return (
    <CustomComponentsContext.Provider value={value}>
      <Router
        className={className!}
        hideSignUp={hideSignUp!}
        variation={variation!}
      />
    </CustomComponentsContext.Provider>
  );
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function Authenticator(props: AuthenticatorProps): JSX.Element {
  useSetUserAgent({
    componentName: 'Authenticator',
    packageName: 'react',
    version: VERSION,
  });

  return (
    <Provider>
      <AuthenticatorInternal {...props} />
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTotp = SetupTotp;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
Authenticator.ForceNewPassword = ForceNewPassword;
