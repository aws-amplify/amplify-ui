import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/widgets.dart';

Future<SignUpResult> signUp({
  @required String username,
  @required String email,
  @required String password,
}) async {
  Map<String, String> userAttributes = {
    'email': email,
  };
  SignUpResult signUpResult = await Amplify.Auth.signUp(
    username: username,
    password: password,
    options: CognitoSignUpOptions(userAttributes: userAttributes),
  );
  return signUpResult;
}

Future<SignInResult> signIn({
  @required String username,
  @required String password,
}) async {
  SignInResult signInResult = await Amplify.Auth.signIn(
    username: username,
    password: password,
  );
  return signInResult;
}

Future<SignUpResult> confirmSignUp({
  @required String username,
  @required String verificationCode,
}) async {
  SignUpResult signUpResult = await Amplify.Auth.confirmSignUp(
    username: username,
    confirmationCode: verificationCode,
  );
  return signUpResult;
}
