import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_authenticator/authenticator/state/authenticator_state.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

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
  'User is not confirmed.': AuthExceptionField.username,
  'Username is required to signIn': AuthExceptionField.username,
  'Invalid email address format.': AuthExceptionField.email,
  'Incorrect username or password.': AuthExceptionField.password,
  'Password did not conform with policy: Password not long enough':
      AuthExceptionField.password,
  'Invalid verification code provided, please try again.':
      AuthExceptionField.verificationCode,
};

void setAuthExceptionField(BuildContext context, AuthException exception) {
  if (exception != null && exception.message.isNotEmpty) {
    debugPrint(exception.message);
    AuthExceptionField authExceptionField =
        authExceptionFieldLookup[exception.message];
    switch (authExceptionField) {
      case AuthExceptionField.username:
        context.read<UsernameFormFieldState>().validationMessage =
            exception.message;
        break;
      case AuthExceptionField.email:
        context.read<EmailFormFieldState>().validationMessage =
            exception.message;
        break;
      case AuthExceptionField.password:
        context.read<PasswordFormFieldState>().validationMessage =
            exception.message;
        break;
      case AuthExceptionField.verificationCode:
        context.read<VerificationCodeFormFieldState>().validationMessage =
            exception.message;
        break;
    }
  }
}

void clearAuthExceptionFields(BuildContext context) {
  context.read<UsernameFormFieldState>().validationMessage = null;
  context.read<EmailFormFieldState>().validationMessage = null;
  context.read<PasswordFormFieldState>().validationMessage = null;
  context.read<VerificationCodeFormFieldState>().validationMessage = null;
}
