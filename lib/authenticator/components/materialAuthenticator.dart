import 'package:flutter/material.dart';

import '../authenticator.dart';

class MaterialAuthenticator extends StatelessWidget {
  MaterialAuthenticator({
    @required this.onSignInSuccess,
  });
  final Function onSignInSuccess;

  @override
  Widget build(BuildContext context) {
    return AuthenticatorStateProvider(
      initialModel: AuthenticatorState(
        onSignInSuccess: this.onSignInSuccess,
      ),
      child: Builder(builder: (context) {
        AuthenticatorState state = AuthenticatorStateProvider.of(context);
        // the Form widget is wrapped in a Material widget so that it can be used inside a non-material app
        return Material(
          child: Form(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                if (_showUsername(state.step)) ...[
                  TextFormField(
                    key: Key('username-field'),
                    initialValue: state.usernameFormFieldState.value,
                    decoration: InputDecoration(
                      labelText: state.usernameFormFieldState.label,
                      errorText: state.usernameFormFieldState.validationMessage,
                    ),
                    onChanged: (value) {
                      AuthenticatorStateProvider.dispatch(
                        context,
                        SetUsernameAction(value),
                      );
                    },
                  ),
                  SizedBox(height: 12.0),
                ],
                if (_showEmail(state.step)) ...[
                  TextFormField(
                    key: Key('email-field'),
                    initialValue: state.emailFormFieldState.value,
                    decoration: InputDecoration(
                      labelText: state.emailFormFieldState.label,
                      errorText: state.emailFormFieldState.validationMessage,
                    ),
                    onChanged: (value) {
                      AuthenticatorStateProvider.dispatch(
                        context,
                        SetEmailAction(value),
                      );
                    },
                  ),
                  SizedBox(height: 12.0),
                ],
                if (_showPassword(state.step)) ...[
                  TextFormField(
                    key: Key('password-field'),
                    initialValue: state.passwordFormFieldState.value,
                    decoration: InputDecoration(
                      labelText: state.passwordFormFieldState.label,
                      errorText: state.passwordFormFieldState.validationMessage,
                    ),
                    onChanged: (value) {
                      AuthenticatorStateProvider.dispatch(
                        context,
                        SetPasswordAction(value),
                      );
                    },
                    obscureText: true,
                  ),
                  // don't apply the spacing if the forgot password button will be displayed
                  if (!_showForgotPassword(state.step)) SizedBox(height: 12.0),
                ],
                if (_showForgotPassword(state.step)) ...[
                  Row(
                    children: [
                      Text('Forgot your password?'),
                      TextButton(
                        onPressed: () {
                          AuthenticatorStateProvider.dispatch(
                            context,
                            NavigateToResetPasswordAction(),
                          );
                        },
                        child: Text('Reset Password'),
                      )
                    ],
                  ),
                  SizedBox(height: 12.0),
                ],
                if (_showVerificationCode(state.step)) ...[
                  TextFormField(
                    key: Key('verification-code-field'),
                    initialValue: state.verificationCodeFormFieldState.value,
                    decoration: InputDecoration(
                      labelText: state.verificationCodeFormFieldState.label,
                      errorText: state
                          .verificationCodeFormFieldState.validationMessage,
                    ),
                    onChanged: (value) {
                      AuthenticatorStateProvider.dispatch(
                        context,
                        SetVerificationCodeAction(value),
                      );
                    },
                    obscureText: true,
                  ),
                  SizedBox(height: 12.0),
                ],
                Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _buildSecondaryCTA(context, state.step),
                    _buildPrimaryCTA(context, state.step),
                  ],
                )
              ],
            ),
          ),
        );
      }),
    );
  }

  _buildPrimaryCTA(BuildContext context, AuthenticatorStep step) {
    switch (step) {
      case AuthenticatorStep.signIn:
        return ElevatedButton(
          onPressed: () => AuthenticatorStateProvider.dispatch(
            context,
            SignInAction(),
          ),
          child: Text('Sign In'),
        );
      case AuthenticatorStep.signUp:
        return ElevatedButton(
          onPressed: () => AuthenticatorStateProvider.dispatch(
            context,
            SignUpAction(),
          ),
          child: Text('Sign Up'),
        );
      case AuthenticatorStep.resetPassword:
        return ElevatedButton(
          onPressed: () => print('not implemented'),
          child: Text('Send Code'),
        );
      case AuthenticatorStep.confirmSignUp:
        return ElevatedButton(
          onPressed: () => AuthenticatorStateProvider.dispatch(
            context,
            ConfirmSignUpAction(),
          ),
          child: Text('Confirm Code'),
        );
      default:
        // return empty container in any other case
        return Container();
    }
  }

  _buildSecondaryCTA(BuildContext context, AuthenticatorStep step) {
    switch (step) {
      case AuthenticatorStep.signIn:
        return Row(
          key: Key('sign-up-button'),
          children: [
            Text('No Account?'),
            TextButton(
              onPressed: () {
                AuthenticatorStateProvider.dispatch(
                  context,
                  NavigateToSignUpAction(),
                );
              },
              child: Text('Sign Up'),
            ),
          ],
        );
      case AuthenticatorStep.signUp:
        return Row(
          children: [
            Text('Have an Account?'),
            TextButton(
              key: Key('sign-in-button'),
              onPressed: () {
                AuthenticatorStateProvider.dispatch(
                  context,
                  NavigateToSignInAction(),
                );
              },
              child: Text('Sign In'),
            ),
          ],
        );
      case AuthenticatorStep.resetPassword:
        return TextButton(
          // remove default material padding to left align
          style: TextButton.styleFrom(padding: EdgeInsets.zero),
          key: Key('back-to-sign-in-button'),
          onPressed: () {
            AuthenticatorStateProvider.dispatch(
              context,
              NavigateToSignUpAction(),
            );
          },
          child: Text('Back to Sign In'),
        );
      default:
        // return empty container in any other case
        return Container();
    }
  }
}

_showUsername(AuthenticatorStep authenticationState) =>
    authenticationState == AuthenticatorStep.signIn ||
    authenticationState == AuthenticatorStep.signUp ||
    authenticationState == AuthenticatorStep.resetPassword;

_showEmail(AuthenticatorStep authenticationState) =>
    authenticationState == AuthenticatorStep.signUp;

_showPassword(AuthenticatorStep authenticationState) =>
    authenticationState == AuthenticatorStep.signIn ||
    authenticationState == AuthenticatorStep.signUp;

_showVerificationCode(AuthenticatorStep authenticationState) =>
    authenticationState == AuthenticatorStep.confirmSignUp;

_showForgotPassword(AuthenticatorStep authenticationState) =>
    authenticationState == AuthenticatorStep.signIn;
