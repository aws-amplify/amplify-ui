import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';

// AuthenticatorAction is a base class that is used to enforce typing for actions
abstract class AuthenticatorAction {}

// form field actions
class SetUsernameAction extends AuthenticatorAction {
  String username;
  SetUsernameAction(this.username);
}

class SetEmailAction extends AuthenticatorAction {
  String email;
  SetEmailAction(this.email);
}

class SetPasswordAction extends AuthenticatorAction {
  String password;
  SetPasswordAction(this.password);
}

class SetVerificationCodeAction extends AuthenticatorAction {
  String verificationCode;
  SetVerificationCodeAction(this.verificationCode);
}

// validation actions
class SetUsernameValidationMessageAction extends AuthenticatorAction {
  String validationMessage;
  SetUsernameValidationMessageAction(this.validationMessage);
}

class SetEmailValidationMessageAction extends AuthenticatorAction {
  String validationMessage;
  SetEmailValidationMessageAction(this.validationMessage);
}

class SetPasswordValidationMessageAction extends AuthenticatorAction {
  String validationMessage;
  SetPasswordValidationMessageAction(this.validationMessage);
}

class SetVerificationCodeValidationMessageAction extends AuthenticatorAction {
  String validationMessage;
  SetVerificationCodeValidationMessageAction(this.validationMessage);
}

// navigation actions
class NavigateToSignInAction extends AuthenticatorAction {}

class NavigateToSignUpAction extends AuthenticatorAction {}

class NavigateToResetPasswordAction extends AuthenticatorAction {}

// sign up actions
class SignUpAction extends AuthenticatorAction {}

class SignUpSuccessAction extends AuthenticatorAction {}

class SignUpFailureAction extends AuthenticatorAction {
  AuthException authException;
  SignUpFailureAction(this.authException);
}

// sign in actions
class SignInAction extends AuthenticatorAction {}

class SignInSuccessAction extends AuthenticatorAction {}

class SignInFailureAction extends AuthenticatorAction {
  AuthException authException;
  SignInFailureAction(this.authException);
}

// confirm signup actions
class ConfirmSignUpAction extends AuthenticatorAction {}

class ConfirmSignUpSuccessAction extends AuthenticatorAction {}

class ConfirmSignUpFailureAction extends AuthenticatorAction {
  AuthException authException;
  ConfirmSignUpFailureAction(this.authException);
}
