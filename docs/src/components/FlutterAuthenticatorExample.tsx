import { Alert } from '@aws-amplify/ui-react';

export function FlutterAuthenticatorExample({
  initialStep = 'signIn',
  usernameAttribute = 'USERNAME',
  signUpAttributes = [],
  includeSocialProviders = false,
  width = '100%',
  height = '800px',
}) {
  const colorAttr = 'data-amplify-color-mode';
  // in dev mode, `data-amplify-color-mode` will not be on the html element
  const colorElements = document.querySelectorAll(`[${colorAttr}]`);
  const themeMode = colorElements.length
    ? colorElements[0].getAttribute(colorAttr)
    : 'light';

  const baseUrl = '/flutter/authenticator/component.html';
  const queryParams: Record<string, any> = {
    themeMode,
    initialStep,
    usernameAttribute,
    includeSocialProviders,
    ...(signUpAttributes.length && { signUpAttributes }),
  };
  var src = `${baseUrl}?${new URLSearchParams(queryParams).toString()}`;
  console.log(src);
  return (
    <>
      <Alert variation="info">
        The Authenticator demo below uses a mock backend. Any users you create
        are stored in memory. You can verify accounts that you create with the
        code "123456".
      </Alert>
      <iframe height={height} width={width} src={src} loading="lazy"></iframe>
    </>
  );
}
