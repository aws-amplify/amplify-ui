import { Alert, Loader, View } from '@aws-amplify/ui-react';
import React, { useCallback } from 'react';

export function FlutterAuthenticatorExample({
  initialStep = 'signIn',
  usernameAttribute = 'USERNAME',
  signUpAttributes = [],
  includeSocialProviders = false,
  useCustomUI = false,
  useCustomTheme = false,
  width = '100%',
  height = '800px',
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
      <View
        as="iframe"
        key={id}
        height={height}
        width={width}
        src={src}
        loading="lazy"
      />
    </>
  );
}

// Loader is in a separate component to prevent the iframe from re-rendering
// when setHasLoaded is called
function FlutterAuthenticatorLoader({ id }) {
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const onMessage = useCallback((event) => {
    const data = JSON.parse(event.data);
    if (data['name'] == 'loaded' && data['id'] == id) {
      setHasLoaded(true);
      window.removeEventListener('message', onMessage);
    }
  }, []);

  React.useEffect(() => {
    // the authenticator will post a message to the parent window when it has finished loading
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [onMessage]);

  return (
    <Loader
      style={{
        bottom: '-14px',
        padding: '0 6px',
        visibility: hasLoaded ? 'hidden' : 'visible',
      }}
      position="relative"
      variation="linear"
      size="small"
    />
  );
}

const generateId = () => (Math.random() + 1).toString(36).substring(2);
