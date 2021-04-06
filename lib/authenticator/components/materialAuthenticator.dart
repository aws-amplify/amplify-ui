import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../authenticator/state/authenticator_state.dart';
import '../../authenticator/state/authenticator_state_machine.dart';
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
    this.initialStep = AuthenticatorStep.signIn,
  });
  final Function onSignInSuccess;
  final AuthenticatorStep initialStep;

  @override
  Widget build(BuildContext context) {
    return MaterialAuthenticatorBuilder(
      onSignInSuccess: this.onSignInSuccess,
      initialStep: this.initialStep,
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
            throw ('Invalid authentication state. AuthenticatorStep is not valid');
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
    this.initialStep = AuthenticatorStep.signIn,
  });
  final Function onSignInSuccess;
  final Widget Function(BuildContext context, AuthenticatorState state) builder;
  final AuthenticatorStep initialStep;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthStateMachine(
            onSignInSuccess: this.onSignInSuccess,
            initialStep: this.initialStep,
          ),
        ),
        ChangeNotifierProvider(
          create: (_) => UsernameFormFieldState(label: 'Username'),
        ),
        ChangeNotifierProvider(
          create: (_) => EmailFormFieldState(label: 'Email'),
        ),
        ChangeNotifierProvider(
          create: (_) => PasswordFormFieldState(label: 'Password'),
        ),
        ChangeNotifierProvider(
          create: (_) =>
              VerificationCodeFormFieldState(label: 'Verification Code'),
        ),
      ],
      child: Builder(
        builder: (context) {
          AuthStateMachine authStateMachine = context.watch<AuthStateMachine>();
          UsernameFormFieldState usernameFormFieldState =
              context.watch<UsernameFormFieldState>();
          EmailFormFieldState emailFormFieldState =
              context.watch<EmailFormFieldState>();
          PasswordFormFieldState passwordFormFieldState =
              context.watch<PasswordFormFieldState>();
          VerificationCodeFormFieldState verificationCodeFormFieldState =
              context.watch<VerificationCodeFormFieldState>();
          AuthenticatorState authenticatorState = AuthenticatorState(
            authStateMachine: authStateMachine,
            usernameFormFieldState: usernameFormFieldState,
            emailFormFieldState: emailFormFieldState,
            passwordFormFieldState: passwordFormFieldState,
            verificationCodeFormFieldState: verificationCodeFormFieldState,
          );
          return builder(context, authenticatorState);
        },
      ),
    );
  }
}
