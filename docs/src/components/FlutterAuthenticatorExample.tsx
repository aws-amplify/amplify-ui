import * as React from 'react';

export function FlutterAuthenticatorExample({
  initialStep = 'signIn',
  signupAttribute = 'USERNAME',
  width,
  height,
  id,
}) {
  const colorAttr = 'data-amplify-color-mode';
  // in dev mode, `data-amplify-color-mode` will not be on the html element
  const colorElements = document.querySelectorAll(`[${colorAttr}]`);
  const colorMode = colorElements.length
    ? colorElements[0].getAttribute(colorAttr)
    : 'light';

  return (
    <iframe
      id={id}
      height={height ?? '800px'}
      width={width ?? '100%'}
      src={`/flutter-authenticator/flutter-authenticator-component.html?themeMode=${colorMode}&initialStep=${initialStep}&signupAttribute=${signupAttribute}`}
    ></iframe>
  );
}
