import 'package:amplify_authenticator/authenticator/state/authenticator_state_machine.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

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
        print(state.current.toString());
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
        // TODO: Determine how to handle default
        return MaterialSignInView();
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
    // this.onStepChange,
  });
  final Function onSignInSuccess;
  // final Function(AuthenticatorStep) onStepChange;
  final Widget Function(BuildContext, AuthStateMachine) builder;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthStateMachine(
            onSignInSuccess: this.onSignInSuccess,
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
          AuthStateMachine state = context.watch<AuthStateMachine>();
          return builder(context, state);
        },
      ),
    );
  }
}
