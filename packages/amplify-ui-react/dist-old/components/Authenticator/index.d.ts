export declare function Authenticator({
  className,
  children,
}: {
  className?: any;
  children?: (context: any) => any;
}): any;
export declare namespace Authenticator {
  var ConfirmSignUp: typeof import('./ConfirmSignUp').ConfirmSignUp;
  var SignIn: typeof import('./SignIn').SignIn;
  var SignUp: typeof import('./SignUp').SignUp;
}
export declare function withAuthenticator(Component: any): () => JSX.Element;
