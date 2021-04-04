import 'package:flutter/material.dart';

import '../authenticator.dart';
import 'material/confirm_sign_up_view.dart';
import 'material/forgot_password_view.dart';
import 'material/sign_in_view.dart';
import 'material/sign_up_view.dart';

/// MaterialAuthenticator is an authenticator widget build with Material Widgets.
///
/// To use it in a non-material app, be sure to wrap in in a Material() widget.
///
/// The widget will use the styles from the application's ThemeData.
/// To style this widget without changing the entire app's ThemeData, wrap this widget in a
/// Theme() widget and provide the appropriate themeData.
class MaterialAuthenticator extends StatelessWidget {
  MaterialAuthenticator({
    @required this.onSignInSuccess,
  });
  final Function onSignInSuccess;

  @override
  Widget build(BuildContext context) {
    return MaterialAuthenticatorBuilder(
      onSignInSuccess: this.onSignInSuccess,
      builder: (context, state) {
        switch (state.step) {
          case AuthenticatorStep.signIn:
            return MaterialSignInView();
          case AuthenticatorStep.signUp:
            return MaterialSignUpView();
          case AuthenticatorStep.confirmSignUp:
            return MaterialConfirmSignUpView();
          case AuthenticatorStep.resetPassword:
            return MaterialForgotPasswordView();
          default:
            throw ('Invalid authentication state. AuthenticatorStep must not be null');
            return null;
        }
      },
    );
  }
}

/// MaterialAuthenticatorBuilder provides a more flexible way to build an authenticator widget
///
/// Most use cases can be met with [MaterialAuthenticator], and custom themes, but MaterialAuthenticatorBuilder
/// can be used to build more custom authentication workflows without having to build the full
/// flow from scratch
///
/// [MaterialAuthenticator] is built using MaterialAuthenticatorBuilder, and can be referenced as an example
class MaterialAuthenticatorBuilder extends StatelessWidget {
  MaterialAuthenticatorBuilder({
    @required this.onSignInSuccess,
    @required this.builder,
    this.onStepChange,
  });
  final Function onSignInSuccess;
  final Function(AuthenticatorStep) onStepChange;
  final Widget Function(BuildContext, AuthenticatorState) builder;

  @override
  Widget build(BuildContext context) {
    return AuthenticatorStateProvider(
      initialModel: AuthenticatorState(
        onSignInSuccess: this.onSignInSuccess,
        onStepChange: this.onStepChange,
      ),
      child: Builder(
        builder: (context) {
          AuthenticatorState state = AuthenticatorStateProvider.of(context);
          return builder(context, state);
        },
      ),
    );
  }
}
