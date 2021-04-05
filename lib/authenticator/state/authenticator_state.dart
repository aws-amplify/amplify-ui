import 'package:flutter/foundation.dart';

enum AuthenticatorStep {
  signIn,
  signUp,
  confirmSignUp,
  resetPassword,
}

@immutable
class AuthenticatorState {
  const AuthenticatorState({
    this.step = AuthenticatorStep.signIn,
    this.isloading = false,
    this.usernameFormFieldState = const AuthenticatorFormFieldState(
      label: 'Username',
    ),
    this.emailFormFieldState = const AuthenticatorFormFieldState(
      label: 'Email',
    ),
    this.passwordFormFieldState = const AuthenticatorFormFieldState(
      label: 'Password',
    ),
    this.verificationCodeFormFieldState = const AuthenticatorFormFieldState(
      label: 'Verification Code',
    ),
    @required this.onSignInSuccess,
    this.onStepChange,
  });

  final AuthenticatorStep step;
  final bool isloading;
  // AuthException _authException;
  final AuthenticatorFormFieldState usernameFormFieldState;
  final AuthenticatorFormFieldState emailFormFieldState;
  final AuthenticatorFormFieldState passwordFormFieldState;

  final AuthenticatorFormFieldState verificationCodeFormFieldState;

  final Function onSignInSuccess;
  final Function(AuthenticatorStep) onStepChange;

  AuthenticatorState copyWith({
    AuthenticatorStep step,
    bool isloading,
    AuthenticatorFormFieldState usernameFormFieldState,
    AuthenticatorFormFieldState emailFormFieldState,
    AuthenticatorFormFieldState passwordFormFieldState,
    AuthenticatorFormFieldState verificationCodeFormFieldState,
    Function onSignInSuccess,
    Function(AuthenticatorStep) onStepChange,
  }) {
    return AuthenticatorState(
      step: step ?? this.step,
      isloading: isloading ?? this.isloading,
      usernameFormFieldState:
          usernameFormFieldState ?? this.usernameFormFieldState,
      emailFormFieldState: emailFormFieldState ?? this.emailFormFieldState,
      passwordFormFieldState:
          passwordFormFieldState ?? this.passwordFormFieldState,
      verificationCodeFormFieldState:
          verificationCodeFormFieldState ?? this.verificationCodeFormFieldState,
      onSignInSuccess: onSignInSuccess ?? this.onSignInSuccess,
      onStepChange: onStepChange ?? this.onStepChange,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final AuthenticatorState otherModel = other;
    return otherModel.step == step &&
        otherModel.isloading == isloading &&
        otherModel.usernameFormFieldState == usernameFormFieldState &&
        otherModel.emailFormFieldState == emailFormFieldState &&
        otherModel.passwordFormFieldState == passwordFormFieldState &&
        otherModel.verificationCodeFormFieldState ==
            verificationCodeFormFieldState &&
        otherModel.onSignInSuccess == onSignInSuccess &&
        otherModel.onStepChange == onStepChange;
  }

  @override
  int get hashCode =>
      step.hashCode ^
      isloading.hashCode ^
      usernameFormFieldState.hashCode ^
      emailFormFieldState.hashCode ^
      passwordFormFieldState.hashCode ^
      verificationCodeFormFieldState.hashCode ^
      onSignInSuccess.hashCode ^
      onStepChange.hashCode;
}

@immutable
class AuthenticatorFormFieldState {
  final String value;
  final String label;
  final String hint;
  final String validationMessage;
  const AuthenticatorFormFieldState({
    this.value = '',
    this.label = '',
    this.hint = '',
    this.validationMessage,
  });

  AuthenticatorFormFieldState copyWith({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) {
    return AuthenticatorFormFieldState(
      value: value ?? this.value,
      label: label ?? this.label,
      hint: hint ?? this.hint,
      // '' is used to clear the validation message
      // null needs to fallback to the current validation messsage so it cannot be used as an idicator to set the value to null
      validationMessage: validationMessage == ''
          ? null
          : validationMessage ?? this.validationMessage,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final AuthenticatorFormFieldState otherModel = other;
    return otherModel.value == value &&
        otherModel.label == label &&
        otherModel.hint == hint &&
        otherModel.validationMessage == validationMessage;
  }

  @override
  int get hashCode =>
      value.hashCode ^
      label.hashCode ^
      hint.hashCode ^
      validationMessage.hashCode;
}
