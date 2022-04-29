import { View } from '../../../primitives/View';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { RouterContainerProps } from './types';

// TODO replace usage of this util with the `isSignInOrSignUpRoute` util in v3.
// Currently `hasTabs` always returns `undefined` as the right condition always
// resolves to truthy. This prevents the "data-amplify-router-content" attribute
// from being applied below. Fixing it will cause consumer snapshot tests to break,
// so wait to update.
const hasTabs = (route: string) => {
  return route === 'signIn' || 'signUp';
};

export function RouterContainer({
  children,
  className,
  variation = 'default',
}: RouterContainerProps) {
  const { route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );

  const {
    components: { Header, Footer },
  } = useCustomComponents();

  // `Authenticator` might not have `children` for non SPA use cases.
  if (['authenticated', 'signOut'].includes(route)) {
    if (!children) {
      return null;
    }

    return (
      <>
        {typeof children === 'function'
          ? children({ signOut, user }) // children is a render prop
          : children}
      </>
    );
  }

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
