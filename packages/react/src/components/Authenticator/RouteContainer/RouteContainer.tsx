import React from 'react';
import { View } from '../../../primitives/View';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { RouteContainerProps } from './types';

// TODO replace usage of this util with the `isSignInOrSignUpRoute` util in v3.
// Currently `hasTabs` always returns `undefined` as the right condition always
// resolves to truthy. This prevents the "data-amplify-router-content" attribute
// from being applied below. Fixing it will cause consumer snapshot tests to break,
// so wait to update.
const hasTabs = (route: string) => {
  return route === 'signIn' || 'signUp';
};

export function RouteContainer({
  children,
  className,
  variation = 'default',
}: RouteContainerProps): JSX.Element {
  const { route } = useAuthenticator(({ route }) => [route]);

  const {
    components: { Header, Footer },
  } = useCustomComponents();

  return (
    <View
      className={className}
      data-amplify-authenticator=""
      data-variation={variation}
    >
      <View data-amplify-container="">
        <Header />
        <View
          data-amplify-router=""
          data-amplify-router-content={hasTabs(route) ? undefined : ''}
        >
          {children}
        </View>
        <Footer />
      </View>
    </View>
  );
}
