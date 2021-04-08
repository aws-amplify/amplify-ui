import 'package:amplify_authenticator/authenticator/state/authenticator_state_machine.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class BackToSignInLink extends StatelessWidget {
  const BackToSignInLink({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      // remove default material padding to left align
      style: TextButton.styleFrom(padding: EdgeInsets.zero),
      key: Key('back-to-sign-in-button'),
      onPressed: () {
        context.read<AuthStateMachine>().send('SIGN_IN');
      },
      child: Text('Back to Sign In'),
    );
  }
}

class SignInLink extends StatelessWidget {
  const SignInLink({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('Have an Account?'),
        TextButton(
          key: Key('sign-in-button'),
          onPressed: () {
            context.read<AuthStateMachine>().send('SIGN_IN');
          },
          child: Text('Sign In'),
        ),
      ],
    );
  }
}

class SignUpLink extends StatelessWidget {
  const SignUpLink({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      key: Key('sign-up-button'),
      children: [
        Text('No Account?'),
        TextButton(
          onPressed: () {
            context.read<AuthStateMachine>().send('SIGN_UP');
          },
          child: Text('Sign Up'),
        ),
      ],
    );
  }
}

class ConfirmVerificationCodeButton extends StatelessWidget {
  const ConfirmVerificationCodeButton({
    Key key,
    this.disabled = false,
  }) : super(key: key);

  final bool disabled;

  @override
  Widget build(BuildContext context) {
    Function onPressed = () => context
        .read<AuthStateMachine>()
        .send('SUBMIT', StateTransitionPayload(context: context));
    return ElevatedButton(
      onPressed: onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Confirm Code'),
        ],
      ),
    );
  }
}

class ResetPasswordButton extends StatelessWidget {
  const ResetPasswordButton({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => print('not implemented'),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Send Code'),
        ],
      ),
    );
  }
}

class SignUpButton extends StatelessWidget {
  const SignUpButton({
    Key key,
    this.disabled = false,
  }) : super(key: key);

  final bool disabled;

  @override
  Widget build(BuildContext context) {
    Function onPressed = () => context
        .read<AuthStateMachine>()
        .send('SUBMIT', StateTransitionPayload(context: context));
    return ElevatedButton(
      onPressed: onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Sign Up'),
        ],
      ),
    );
  }
}

class SignInButton extends StatelessWidget {
  const SignInButton({
    Key key,
    this.disabled = false,
  }) : super(key: key);

  final bool disabled;

  @override
  Widget build(BuildContext context) {
    Function onPressed = () => context
        .read<AuthStateMachine>()
        .send('SUBMIT', StateTransitionPayload(context: context));
    return ElevatedButton(
      onPressed: onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Sign In'),
        ],
      ),
    );
  }
}

class ForgotPasswordButton extends StatelessWidget {
  const ForgotPasswordButton({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('Forgot your password?'),
        TextButton(
          onPressed: () =>
              context.read<AuthStateMachine>().send('RESET_PASSWORD'),
          child: Text('Reset Password'),
        )
      ],
    );
  }
}
