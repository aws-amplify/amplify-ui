import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'authenticator_state_machine.dart';

/// AuthenticatorState is an abstraction on top of the state that is managed internally by the state machine
/// for use by consumers of the package
class AuthenticatorState {
  AuthStateMachine _authStateMachine;
  final UsernameFormFieldState usernameFormFieldState;
  final PasswordFormFieldState passwordFormFieldState;
  final EmailFormFieldState emailFormFieldState;
  final VerificationCodeFormFieldState verificationCodeFormFieldState;
  AuthenticatorState({
    @required authStateMachine,
    @required this.usernameFormFieldState,
    @required this.passwordFormFieldState,
    @required this.emailFormFieldState,
    @required this.verificationCodeFormFieldState,
  }) {
    this._authStateMachine = authStateMachine;
  }

  AuthStateMachine get stateMachine => _authStateMachine;

  String get current => _authStateMachine.current.name;

  bool get isAuthenticated => this.current == 'authenticated';

  bool get isSignIn => [
        'signInIdle',
        'signInPending',
        'signInResolved',
        'signInRejected'
      ].contains(this.current);

  bool get isSignUp => [
        'signUpIdle',
        'signUpPending',
        'signUpResolved',
        'signUpRejected'
      ].contains(this.current);

  bool get isConfirmSignUp => [
        'confirmSignUpIdle',
        'confirmSignUpPending',
        'confirmSignUpResolved',
        'confirmSignUpRejected'
      ].contains(this.current);

  bool get isResetPassword => [
        'resetPasswordIdle',
        'resetPasswordPending',
        'resetPasswordResolved',
        'resetPasswordRejected'
      ].contains(this.current);
}

/// AuthFormFieldState is a ChangeNotifier that will notify listeners when any of its properties are updated
class AuthFormFieldState with ChangeNotifier, DiagnosticableTreeMixin {
  AuthFormFieldState({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) {
    this._value = value ?? '';
    this._label = label ?? '';
    this._hint = hint ?? '';
    this._validationMessage = validationMessage;
  }

  String _value;
  String get value => _value;
  set value(String newValue) {
    _value = newValue;
    notifyListeners();
  }

  String _label;
  String get label => _label;
  set label(String newValue) {
    _value = newValue;
    notifyListeners();
  }

  String _hint;
  String get hint => _hint;
  set hint(String newValue) {
    _hint = newValue;
    notifyListeners();
  }

  String _validationMessage;
  String get validationMessage => _validationMessage;
  set validationMessage(String newValue) {
    _validationMessage = newValue;
    notifyListeners();
  }

  // Makes properties readable inside the devtools by listing all of its properties
  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(StringProperty('value', value));
    properties.add(StringProperty('label', label));
    properties.add(StringProperty('hint', hint));
    properties.add(StringProperty('validationMessage', validationMessage));
  }
}

class UsernameFormFieldState extends AuthFormFieldState {
  UsernameFormFieldState({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) : super(
          value: value,
          label: label,
          hint: hint,
          validationMessage: validationMessage,
        );
}

class EmailFormFieldState extends AuthFormFieldState {
  EmailFormFieldState({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) : super(
          value: value,
          label: label,
          hint: hint,
          validationMessage: validationMessage,
        );
}

class PasswordFormFieldState extends AuthFormFieldState {
  PasswordFormFieldState({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) : super(
          value: value,
          label: label,
          hint: hint,
          validationMessage: validationMessage,
        );
}

class VerificationCodeFormFieldState extends AuthFormFieldState {
  VerificationCodeFormFieldState({
    String value,
    String label,
    String hint,
    String validationMessage,
  }) : super(
          value: value,
          label: label,
          hint: hint,
          validationMessage: validationMessage,
        );
}
