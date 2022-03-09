// ignore_for_file: implementation_imports

import 'dart:async';
import 'dart:core';
import 'dart:math';
import 'package:amplify_auth_cognito/src/CognitoHubEvents/AuthHubEvent.dart';
import 'package:amplify_auth_cognito/src/CognitoPasswords/CognitoResetPasswordResult.dart';
import 'package:amplify_auth_cognito/src/CognitoSession/CognitoAuthSession.dart';
import 'package:amplify_auth_cognito/src/CognitoSignIn/CognitoSignInResult.dart';
import 'package:amplify_auth_cognito/src/CognitoSignUp/CognitoResendSignUpCodeResult.dart';
import 'package:amplify_auth_cognito/src/CognitoSignUp/CognitoSignUpResult.dart';
import 'package:amplify_auth_plugin_interface/amplify_auth_plugin_interface.dart';

export 'package:amplify_auth_cognito/src/types.dart';
export 'package:amplify_auth_plugin_interface/src/types.dart';

class AmplifyAuthCognitoStub extends AuthPluginInterface {
  static final Object _token = Object();

  AmplifyAuthCognitoStub() : super(token: _token);

  static AuthStreamController streamWrapper = AuthStreamController();

  static set instance(AuthPluginInterface instance) {}

  @override
  StreamController<AuthHubEvent> get streamController {
    return streamWrapper.authStreamController;
  }

  @override
  Future<void> addPlugin() async {}

  @override
  Future<SignUpResult> signUp({required SignUpRequest request}) async {
    await Future.delayed(const Duration(milliseconds: 250));
    User? user = users[request.username];
    if (user != null) {
      throw UsernameExistsException('User already exists.');
    } else {
      User newUser = User(
        sub: Random().nextInt(10000).toString(),
        username: request.username,
        password: request.password,
        email: request.options?.userAttributes['email'],
        phoneNumber: request.options?.userAttributes['phone_number'],
      );
      users[request.username] = newUser;
      currentUser = newUser;
      return CognitoSignUpResult(
        isSignUpComplete: false,
        nextStep: AuthNextSignUpStep(
          signUpStep: 'CONFIRM_SIGN_UP_STEP',
          codeDeliveryDetails: codeDeliveryDetails(newUser),
        ),
      );
    }
  }

  @override
  Future<SignUpResult> confirmSignUp({
    required ConfirmSignUpRequest request,
  }) async {
    await Future.delayed(const Duration(milliseconds: 250));
    if (request.confirmationCode != '123456') {
      throw CodeMismatchException('Incorrect code. Please try again.');
    }
    return CognitoSignUpResult(
      isSignUpComplete: true,
      nextStep: AuthNextSignUpStep(signUpStep: 'DONE'),
    );
  }

  @override
  Future<ResendSignUpCodeResult> resendSignUpCode({
    required ResendSignUpCodeRequest request,
  }) async {
    await Future.delayed(const Duration(milliseconds: 250));
    User? user = users[request.username];
    if (user == null) {
      throw UserNotFoundException('User does not exist.');
    }
    return CognitoResendSignUpCodeResult(codeDeliveryDetails(user));
  }

  @override
  Future<SignInResult> signIn({required SignInRequest request}) async {
    await Future.delayed(const Duration(milliseconds: 250));
    User? user = users[request.username];
    if (user == null) {
      throw UserNotFoundException('User does not exist.');
    }
    if (user.password != request.password) {
      throw NotAuthorizedException('Incorrect username or password.');
    }
    currentUser = user;
    return CognitoSignInResult(
      isSignedIn: isSignedIn(),
      nextStep: AuthNextSignInStep(signInStep: 'DONE'),
    );
  }

  @override
  Future<SignInResult> confirmSignIn({ConfirmSignInRequest? request}) async {
    await Future.delayed(const Duration(milliseconds: 250));
    return CognitoSignInResult(
      isSignedIn: isSignedIn(),
      nextStep: AuthNextSignInStep(signInStep: 'DONE'),
    );
  }

  @override
  Future<SignOutResult> signOut({SignOutRequest? request}) async {
    currentUser = null;
    return SignOutResult();
  }

  @override
  Future<UpdatePasswordResult> updatePassword({
    UpdatePasswordRequest? request,
  }) async {
    return UpdatePasswordResult();
  }

  @override
  Future<ResetPasswordResult> resetPassword({
    ResetPasswordRequest? request,
  }) async {
    await Future.delayed(const Duration(milliseconds: 250));
    if (request == null) {
      throw InvalidStateException('Missing request');
    }
    User? user = users[request.username];
    if (user == null) {
      throw UserNotFoundException('User does not exist.');
    }
    return CognitoResetPasswordResult(
      isPasswordReset: true,
      nextStep: ResetPasswordStep(
        updateStep: 'DONE',
        codeDeliveryDetails: codeDeliveryDetails(user),
      ),
    );
  }

  @override
  Future<UpdatePasswordResult> confirmResetPassword({
    ConfirmResetPasswordRequest? request,
  }) async {
    await Future.delayed(const Duration(milliseconds: 250));
    if (request == null) {
      throw InvalidStateException('Missing request');
    }
    User? user = users[request.username];
    if (user == null) {
      throw UserNotFoundException('User does not exist.');
    }
    if (request.confirmationCode != '123456') {
      throw CodeMismatchException('Incorrect code. Please try again.');
    }
    User updatedUser = user.copyWith(password: request.newPassword);
    users[request.username] = updatedUser;
    currentUser = updatedUser;
    return UpdatePasswordResult();
  }

  @override
  Future<AuthSession> fetchAuthSession({AuthSessionRequest? request}) async {
    return CognitoAuthSession(isSignedIn: isSignedIn());
  }

  @override
  Future<AuthUser> getCurrentUser({AuthUserRequest? request}) async {
    if (currentUser == null) {
      throw SignedOutException('There is no user signed in.');
    } else {
      return AuthUser(
        userId: currentUser!.sub,
        username: currentUser!.username,
      );
    }
  }

  @override
  Future<List<AuthUserAttribute>> fetchUserAttributes({
    FetchUserAttributesRequest? request,
  }) async {
    if (currentUser == null) {
      throw SignedOutException('There is no user signed in.');
    }
    return [
      if (currentUser!.email != null) ...[
        AuthUserAttribute(
          userAttributeKey: CognitoUserAttributeKey.email,
          value: currentUser!.email!,
        ),
        const AuthUserAttribute(
          userAttributeKey: CognitoUserAttributeKey.emailVerified,
          value: 'true',
        ),
      ],
      if (currentUser!.phoneNumber != null) ...[
        AuthUserAttribute(
          userAttributeKey: CognitoUserAttributeKey.phoneNumber,
          value: currentUser!.phoneNumber!,
        ),
        const AuthUserAttribute(
          userAttributeKey: CognitoUserAttributeKey.phoneNumberVerified,
          value: 'true',
        ),
      ],
      AuthUserAttribute(
        userAttributeKey: const CognitoUserAttributeKey.custom('sub'),
        value: currentUser!.sub,
      ),
    ];
  }

  @override
  Future<SignInResult> signInWithWebUI(
      {SignInWithWebUIRequest? request}) async {
    throw InvalidStateException(
      'social sign in is not supported in this demo.',
    );
  }

  @override
  Future<UpdateUserAttributeResult> updateUserAttribute({
    UpdateUserAttributeRequest? request,
  }) async {
    if (currentUser == null) {
      throw SignedOutException('There is no user signed in.');
    }
    return UpdateUserAttributeResult(
      isUpdated: true,
      nextStep: AuthNextUpdateAttributeStep(
        updateAttributeStep: 'DONE',
        codeDeliveryDetails: codeDeliveryDetails(currentUser!),
      ),
    );
  }

  @override
  Future<Map<UserAttributeKey, UpdateUserAttributeResult>>
      updateUserAttributes({
    required UpdateUserAttributesRequest request,
  }) async {
    return {};
  }

  @override
  Future<ConfirmUserAttributeResult> confirmUserAttribute({
    ConfirmUserAttributeRequest? request,
  }) async {
    return ConfirmUserAttributeResult();
  }

  @override
  Future<ResendUserAttributeConfirmationCodeResult>
      resendUserAttributeConfirmationCode({
    ResendUserAttributeConfirmationCodeRequest? request,
  }) async {
    if (currentUser == null) {
      throw SignedOutException('There is no user signed in.');
    }
    return ResendUserAttributeConfirmationCodeResult(
      codeDeliveryDetails: codeDeliveryDetails(currentUser!),
    );
  }

  @override
  Future<void> rememberDevice() async {
    throw UnimplementedError(
      'rememberDevice is not supported in this demo.',
    );
  }

  @override
  Future<void> forgetDevice([AuthDevice? device]) async {
    throw UnimplementedError(
      'forgetDevice is not supported in this demo.',
    );
  }

  @override
  Future<List<AuthDevice>> fetchDevices() async {
    throw UnimplementedError(
      'fetchDevices is not supported in this demo.',
    );
  }

  @override
  Future<void> deleteUser() async {
    throw UnimplementedError(
      'deleteUser is not supported in this demo.',
    );
  }
}

class AuthStreamController {
  StreamController<AuthHubEvent> get authStreamController {
    return _authStreamController;
  }
}

StreamController<AuthHubEvent> _authStreamController =
    StreamController<AuthHubEvent>.broadcast(
  onListen: _onListen,
  onCancel: _onCancel,
);

_onListen() {}

_onCancel() {}

class User {
  final String sub;
  final String username;
  final String password;
  final String? email;
  final String? phoneNumber;

  const User({
    required this.sub,
    required this.username,
    required this.password,
    required this.phoneNumber,
    required this.email,
  });

  User copyWith({
    String? sub,
    String? username,
    String? password,
    String? email,
    String? phoneNumber,
  }) {
    return User(
      sub: sub ?? this.sub,
      username: username ?? this.username,
      password: password ?? this.password,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      email: email ?? this.email,
    );
  }
}

Map<String, User> users = {};

AuthCodeDeliveryDetails codeDeliveryDetails(User user) =>
    AuthCodeDeliveryDetails(
      destination: user.email ?? user.phoneNumber ?? 'S****@g***.com',
    );

bool isSignedIn() => currentUser != null;
User? currentUser;
List<AuthUserAttribute> userAttributes = [];
