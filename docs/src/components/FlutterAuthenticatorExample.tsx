import * as React from 'react';

export function FlutterAuthenticatorExample({
  initialStep = 'signIn',
  usernameAttribute = 'USERNAME',
  signUpAttributes = [],
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

  const baseUrl = '/flutter/authenticator/component.html?';
  var src = `${baseUrl}themeMode=${colorMode}&initialStep=${initialStep}&usernameAttribute=${usernameAttribute}`;
  if (signUpAttributes.length) {
    src += `&signUpAttributes=${signUpAttributes.join('|')}`;
  }
  console.log(src);
  return (
    <iframe
      id={id}
      height={height ?? '800px'}
      width={width ?? '100%'}
      src={src}
    ></iframe>
  );
}
