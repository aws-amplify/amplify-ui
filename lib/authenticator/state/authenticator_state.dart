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
    this.usernameFormFieldState = const FormFieldState(
      label: 'Username',
    ),
    this.emailFormFieldState = const FormFieldState(
      label: 'Email',
    ),
    this.passwordFormFieldState = const FormFieldState(
      label: 'Password',
    ),
    this.verificationCodeFormFieldState = const FormFieldState(
      label: 'Verification Code',
    ),
    @required this.onSignInSuccess,
  });

  final AuthenticatorStep step;
  final bool isloading;
  // AuthException _authException;
  final FormFieldState usernameFormFieldState;
  final FormFieldState emailFormFieldState;
  final FormFieldState passwordFormFieldState;

  final FormFieldState verificationCodeFormFieldState;

  final Function onSignInSuccess;

  AuthenticatorState copyWith({
    AuthenticatorStep step,
    bool isloading,
    FormFieldState usernameFormFieldState,
    FormFieldState emailFormFieldState,
    FormFieldState passwordFormFieldState,
    FormFieldState verificationCodeFormFieldState,
    Function onSignInSuccess,
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
        otherModel.onSignInSuccess == onSignInSuccess;
  }

  @override
  int get hashCode =>
      step.hashCode ^
      isloading.hashCode ^
      usernameFormFieldState.hashCode ^
      emailFormFieldState.hashCode ^
      passwordFormFieldState.hashCode ^
      verificationCodeFormFieldState.hashCode ^
      onSignInSuccess.hashCode;
}

@immutable
class FormFieldState {
  final String value;
  final String label;
  final String hint;
  final String validationMessage;
  const FormFieldState({
    this.value = '',
    this.label = '',
    this.hint = '',
    this.validationMessage,
  });

  FormFieldState copyWith({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) {
    return FormFieldState(
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
    final FormFieldState otherModel = other;
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
