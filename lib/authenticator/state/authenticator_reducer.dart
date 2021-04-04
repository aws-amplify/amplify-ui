import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:flutter/foundation.dart';

import '../authenticator_service.dart';
import 'authenticator_actions.dart';
import 'authenticator_state.dart';

AuthenticatorState authenticatorStateReducer(
  AuthenticatorState state,
  AuthenticatorAction action,
) {
  // form fields
  if (action is SetUsernameAction) {
    AuthenticatorState newState = state.copyWith(
      usernameFormFieldState: state.usernameFormFieldState.copyWith(
        value: action.username,
      ),
    );
    return newState;
  }
  if (action is SetEmailAction) {
    AuthenticatorState newState = state.copyWith(
      emailFormFieldState: state.emailFormFieldState.copyWith(
        value: action.email,
      ),
    );
    return newState;
  }
  if (action is SetPasswordAction) {
    AuthenticatorState newState = state.copyWith(
      passwordFormFieldState: state.passwordFormFieldState.copyWith(
        value: action.password,
      ),
    );
    return newState;
  }
  if (action is SetVerificationCodeAction) {
    AuthenticatorState newState = state.copyWith(
      verificationCodeFormFieldState:
          state.verificationCodeFormFieldState.copyWith(
        value: action.verificationCode,
      ),
    );
    return newState;
  }
  // validation
  if (action is SetUsernameValidationMessageAction) {
    AuthenticatorState newState = state.copyWith(
      usernameFormFieldState: state.usernameFormFieldState.copyWith(
        validationMessage: action.validationMessage,
      ),
    );
    return newState;
  }
  if (action is SetEmailValidationMessageAction) {
    AuthenticatorState newState = state.copyWith(
      emailFormFieldState: state.emailFormFieldState.copyWith(
        validationMessage: action.validationMessage,
      ),
    );
    return newState;
  }
  if (action is SetPasswordValidationMessageAction) {
    AuthenticatorState newState = state.copyWith(
      passwordFormFieldState: state.passwordFormFieldState.copyWith(
        validationMessage: action.validationMessage,
      ),
    );
    return newState;
  }
  if (action is SetVerificationCodeValidationMessageAction) {
    AuthenticatorState newState = state.copyWith(
      verificationCodeFormFieldState:
          state.verificationCodeFormFieldState.copyWith(
        validationMessage: action.validationMessage,
      ),
    );
    return newState;
  }
  if (action is SignInAction ||
      action is SignUpAction ||
      action is ConfirmSignUpAction) {
    AuthenticatorState newState = state.copyWith(
      usernameFormFieldState: state.usernameFormFieldState.copyWith(
        validationMessage: '',
      ),
      emailFormFieldState: state.emailFormFieldState.copyWith(
        validationMessage: '',
      ),
      passwordFormFieldState: state.passwordFormFieldState.copyWith(
        validationMessage: '',
      ),
      verificationCodeFormFieldState:
          state.verificationCodeFormFieldState.copyWith(
        validationMessage: '',
      ),
    );
    return newState;
  }
  // navigation
  if (action is NavigateToSignInAction) {
    AuthenticatorState newState = state.copyWith(
      step: AuthenticatorStep.signIn,
    );
    return newState;
  }
  if (action is NavigateToSignUpAction) {
    AuthenticatorState newState = state.copyWith(
      step: AuthenticatorStep.signUp,
    );
    return newState;
  }
  if (action is NavigateToResetPasswordAction) {
    AuthenticatorState newState = state.copyWith(
      step: AuthenticatorStep.resetPassword,
    );
    return newState;
  }
  if (action is SignUpSuccessAction) {
    AuthenticatorState newState = state.copyWith(
      step: AuthenticatorStep.confirmSignUp,
    );
    return newState;
  }

  return state;
}

Future<AuthenticatorAction> authenticatorSideEffectsHandler(
  AuthenticatorAction action,
  AuthenticatorState state,
) async {
  // sign in
  if (action is SignInAction) {
    try {
      SignInResult signInResult = await signIn(
        username: state.usernameFormFieldState.value,
        password: state.passwordFormFieldState.value,
      );
      return SignInSuccessAction();
    } on AuthException catch (e) {
      return SignInFailureAction(e);
    }
  }
  if (action is SignInSuccessAction) {
    state.onSignInSuccess();
  }
  if (action is SignInFailureAction) {
    AuthExceptionField authExceptionField =
        getAuthExceptionField(action.authException);
    switch (authExceptionField) {
      case AuthExceptionField.username:
        return SetUsernameValidationMessageAction(action.authException.message);
      case AuthExceptionField.email:
        return SetEmailValidationMessageAction(action.authException.message);
      case AuthExceptionField.password:
        return SetPasswordValidationMessageAction(action.authException.message);
      case AuthExceptionField.verificationCode:
        return SetVerificationCodeValidationMessageAction(
            action.authException.message);
    }
  }
  // sign up
  if (action is SignUpAction) {
    try {
      SignUpResult signUpResult = await signUp(
        username: state.usernameFormFieldState.value,
        email: state.emailFormFieldState.value,
        password: state.passwordFormFieldState.value,
      );
      return SignUpSuccessAction();
    } on AuthException catch (e) {
      return SignUpFailureAction(e);
    }
  }
  if (action is SignUpFailureAction) {
    AuthExceptionField authExceptionField =
        getAuthExceptionField(action.authException);
    switch (authExceptionField) {
      case AuthExceptionField.username:
        return SetUsernameValidationMessageAction(action.authException.message);
      case AuthExceptionField.email:
        return SetEmailValidationMessageAction(action.authException.message);
      case AuthExceptionField.password:
        return SetPasswordValidationMessageAction(action.authException.message);
      case AuthExceptionField.verificationCode:
        return SetVerificationCodeValidationMessageAction(
            action.authException.message);
    }
  }
  // Confirm sign up
  if (action is ConfirmSignUpAction) {
    try {
      SignUpResult signInResult = await confirmSignUp(
        username: state.usernameFormFieldState.value,
        verificationCode: state.verificationCodeFormFieldState.value,
      );
      return ConfirmSignUpSuccessAction();
    } on AuthException catch (e) {
      return SignInFailureAction(e);
    }
  }
  if (action is ConfirmSignUpSuccessAction) {
    return SignInAction();
  }
  if (action is ConfirmSignUpFailureAction) {
    AuthExceptionField authExceptionField =
        getAuthExceptionField(action.authException);
    switch (authExceptionField) {
      case AuthExceptionField.username:
        return SetUsernameValidationMessageAction(action.authException.message);
      case AuthExceptionField.email:
        return SetEmailValidationMessageAction(action.authException.message);
      case AuthExceptionField.password:
        return SetPasswordValidationMessageAction(action.authException.message);
      case AuthExceptionField.verificationCode:
        return SetVerificationCodeValidationMessageAction(
            action.authException.message);
    }
  }
  // navigation
  if (action is NavigateToSignInAction) {
    if (state.onStepChange == null) {
      return null;
    }
    return state.onStepChange(AuthenticatorStep.signIn);
  }
  if (action is NavigateToSignUpAction) {
    if (state.onStepChange == null) {
      return null;
    }
    return state.onStepChange(AuthenticatorStep.signUp);
  }
  if (action is NavigateToResetPasswordAction) {
    if (state.onStepChange == null) {
      return null;
    }
    return state.onStepChange(AuthenticatorStep.resetPassword);
  }
  if (action is SignUpSuccessAction) {
    if (state.onStepChange == null) {
      return null;
    }
    return state.onStepChange(AuthenticatorStep.confirmSignUp);
  }
  return null;
}

enum AuthExceptionField {
  username,
  email,
  password,
  verificationCode,
}

// Note: This is really brittle because it is just string matching and attempting to match the error to the correct field
// If this text were to change, it would change the functionality of this component
// Unfortnutely it looks like the flutter auth library doesn't return an enum or an error code
// There is also no default case handling (no message is matched)
// The error handling implementation right now is mostly just for demonstration purposes and needs some more work
Map<String, AuthExceptionField> authExceptionFieldLookup = {
  'User does not exist.': AuthExceptionField.username,
  'User already exists': AuthExceptionField.username,
  'Username is required to signIn': AuthExceptionField.username,
  'Invalid email address format.': AuthExceptionField.email,
  'Incorrect username or password.': AuthExceptionField.password,
  'Password did not conform with policy: Password not long enough':
      AuthExceptionField.password,
  'Invalid verification code provided, please try again.':
      AuthExceptionField.verificationCode,
};

AuthExceptionField getAuthExceptionField(AuthException exception) {
  if (exception != null && exception.message.isNotEmpty) {
    debugPrint(exception.message);
    return authExceptionFieldLookup[exception.message];
  }
  return null;
}
