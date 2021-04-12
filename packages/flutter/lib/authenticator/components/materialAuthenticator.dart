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
    @required this.child,
    this.onStateChange,
    this.initialState,
  });

  /// the widget to show if the user is authenticated
  final Widget child;

  /// function called when the AuthenticatorStep changes
  final Function(String state) onStateChange;
  final String initialState;

  @override
  Widget build(BuildContext context) {
    return MaterialAuthenticatorBuilder(
      onStateChange: this.onStateChange,
      initialState: this.initialState,
      builder: (context, state) {
        if (state.isAuthenticated) {
          return child;
        }
        if (state.isSignIn) {
          return MaterialSignInView();
        }
        if (state.isSignUp) {
          return MaterialSignUpView();
        }
        if (state.isConfirmSignUp) {
          return MaterialConfirmSignUpView();
        }
        if (state.isResetPassword) {
          return MaterialForgotPasswordView();
        }
        throw ('Invalid authentication state. AuthenticatorStep is not valid');
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
    this.onStateChange,
    @required this.builder,
    this.initialState,
  });
  final Function(String state) onStateChange;
  final Widget Function(BuildContext context, AuthenticatorState state) builder;
  final String initialState;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthStateMachine(
            onStateChange: this.onStateChange,
            initialState: this.initialState,
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
