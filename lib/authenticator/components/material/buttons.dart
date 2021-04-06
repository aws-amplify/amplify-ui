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
        context.read<AuthStateMachine>().navigateToSignIn();
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
            context.read<AuthStateMachine>().navigateToSignIn();
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
            context.read<AuthStateMachine>().navigateToSignUp();
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
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthStateMachine state = context.watch<AuthStateMachine>();
    // onPressed is set to null when the current state is not isConfirmSignUpIdle the disable ot button
    Function onPressed = state.isConfirmSignUpIdle()
        ? () =>
            state.confirmSignUpSumbit(StateTransitionPayload(context: context))
        : null;
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
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthStateMachine state = context.watch<AuthStateMachine>();
    // onPressed is set to null when the current state is not isSignUpIdle to disable the button
    Function onPressed = state.isSignUpIdle()
        ? () => state.signUpSumbit(StateTransitionPayload(context: context))
        : null;
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
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthStateMachine state = context.watch<AuthStateMachine>();
    // onPressed is set to null when the current state is not isSignInIdle to disable the button
    Function onPressed = state.isSignInIdle()
        ? () => state.signInSumbit(StateTransitionPayload(context: context))
        : null;
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
              context.read<AuthStateMachine>().navigateToResetPassword(),
          child: Text('Reset Password'),
        )
      ],
    );
  }
}
