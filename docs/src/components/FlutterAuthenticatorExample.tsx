import { Alert, Loader, View } from '@aws-amplify/ui-react';
import React, { useCallback } from 'react';

export function FlutterAuthenticatorExample({
  initialStep = 'signIn',
  usernameAttribute = 'USERNAME',
  signUpAttributes = [],
  includeSocialProviders = false,
  useCustomUI = false,
  useCustomTheme = false,
  // id is passed to the flutter authenticator.
  // it is used by the authenticator to signal when the authenticator has finished loading.
  id = generateId(),
}) {
  const colorAttr = 'data-amplify-color-mode';
  // in dev mode, `data-amplify-color-mode` will not be on the html element
  const colorElements = document.querySelectorAll(`[${colorAttr}]`);
  const themeMode = colorElements.length
    ? colorElements[0].getAttribute(colorAttr)
    : 'light';

  const baseUrl = '/flutter/authenticator/component.html';
  const queryParams: Record<string, any> = {
    id,
    themeMode,
    initialStep,
    usernameAttribute,
    includeSocialProviders,
    useCustomUI,
    useCustomTheme,
    ...(signUpAttributes.length && { signUpAttributes }),
  };
  var src = `${baseUrl}?${new URLSearchParams(queryParams).toString()}`;

  return (
    <>
      <Alert variation="info">
        {
          'The Authenticator demo below uses a mock backend. Any users you create are stored in memory. You can verify accounts that you create with the code "123456".'
        }
      </Alert>
      <FlutterAuthenticatorLoader id={id} />
      <View width="100%" textAlign="center">
        <View
          as="iframe"
          key={id}
          height={{ base: '600px', medium: '800px' }}
          width={{ base: '300px', medium: '400px' }}
          src={src}
          loading="lazy"
          frameBorder="0"
        />
      </View>
    </>
  );
}

// Loader is in a separate component to prevent the iframe from re-rendering
// when setHasLoaded is called
function FlutterAuthenticatorLoader({ id }) {
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const onMessage = useCallback((event) => {
    try {
      if (event && event.data) {
        const data = JSON.parse(event.data);
        if (data['name'] === 'loaded' && data['id'] === id) {
          console.log('loaded!');
          setHasLoaded(true);
          window.removeEventListener('message', onMessage);
        }
      }
    } catch (error) {
      // There might be other messages on the window and we don't want to barf
      // console errors.
    }
  }, []);

  React.useEffect(() => {
    // the authenticator will post a message to the parent window when it has finished loading
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [onMessage]);

  return <>{hasLoaded ? null : <Loader variation="linear" size="small" />}</>;
}

const generateId = () => (Math.random() + 1).toString(36).substring(2);
