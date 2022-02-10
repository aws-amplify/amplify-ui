export function FlutterAuthenticatorExample({
  themeMode = 'light',
  initialStep = 'signIn',
  width,
  height,
  id,
}) {
  return (
    <iframe
      id={id}
      height={height ?? '800px'}
      width={width ?? '100%'}
      src={`/flutter-authenticator/flutter-authenticator-component.html?themeMode${themeMode}&initialStep=${initialStep}`}
    ></iframe>
  );
}
