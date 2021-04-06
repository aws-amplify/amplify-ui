import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:state_machine/state_machine.dart' as StateMachine;
import 'package:provider/provider.dart';
import '../authenticator_service.dart' as authService;
import 'authenticator_state.dart';

// AuthStateMachine is a state machine built with the library state_machine
// AuthStateMachine is a ChangeNotifier that will call notifyListeners() on state change
class AuthStateMachine with ChangeNotifier {
  // callback for a successful sign in
  Function onSignInSuccess;

  AuthStateMachine({@required this.onSignInSuccess, Function onStateChange}) {
    _machine = StateMachine.StateMachine('auth');

    isIdle = _machine.newState('isIdle');

    isAuthenticated = _machine.newState('isAuthenticated');

    isSignInIdle = _machine.newState('isSignInIdle');
    isSignInPending = _machine.newState('isSignInPending');
    isSignInResolved = _machine.newState('isSignInResolved');
    isSignInRejected = _machine.newState('isSignInRejected');

    isSignUpIdle = _machine.newState('isSignUpIdle');
    isSignUpPending = _machine.newState('isSignUpPending');
    isSignUpResolved = _machine.newState('isSignUpResolved');
    isSignUpRejected = _machine.newState('isSignUpRejected');

    isConfirmSignUpIdle = _machine.newState('isConfirmSignUpIdle');
    isConfirmSignUpPending = _machine.newState('isConfirmSignUpPending');
    isConfirmSignUpResolved = _machine.newState('isConfirmSignUpResolved');
    isConfirmSignUpRejected = _machine.newState('isConfirmSignUpRejected');

    isResetPasswordIdle = _machine.newState('isResetPasswordIdle');
    isResetPasswordPending = _machine.newState('isResetPasswordPending');
    isResetPasswordResolved = _machine.newState('isResetPasswordResolved');
    isResetPasswordRejected = _machine.newState('isResetPasswordRejected');

    isSignOut = _machine.newState('signOut');

    // navigation transitions
    navigateToSignUp = _machine.newStateTransition(
      'navigateToSignUp',
      [isSignInIdle, isResetPasswordIdle],
      isSignUpIdle,
    );

    navigateToSignIn = _machine.newStateTransition(
      'navigateToSignIn',
      [isSignUpIdle, isResetPasswordIdle],
      isSignInIdle,
    );

    navigateToConfirmSignUp = _machine.newStateTransition(
      'navigateToConfirmSignUp',
      [isSignUpResolved],
      isConfirmSignUpIdle,
    );

    navigateToResetPassword = _machine.newStateTransition(
      'navigateToResetPassword',
      [isSignInIdle],
      isResetPasswordIdle,
    );

    // sign in transitions
    signInSumbit = _machine.newStateTransition(
      'signInSumbit',
      [isSignInIdle, isConfirmSignUpResolved],
      isSignInPending,
    )..stream.listen(onSignInSubmit);

    signInResolved = _machine.newStateTransition(
      'signInResolved',
      [isSignInPending],
      isSignInResolved,
    )..stream.listen(onSignInResolved);

    signInRejected = _machine.newStateTransition(
      'signInRejected',
      [isSignInPending],
      isSignInRejected,
    )..stream.listen(onSignInRejected);

    signInReset = _machine.newStateTransition(
      'signInReset',
      [isSignInResolved, isSignInRejected],
      isSignInIdle,
    );

    // sign up transitions
    signUpSumbit = _machine.newStateTransition(
      'signUpSumbit',
      [isSignUpIdle],
      isSignUpPending,
    )..stream.listen(onSignUpSubmit);

    signUpResolved = _machine.newStateTransition(
      'signUpResolved',
      [isSignUpPending],
      isSignUpResolved,
    )..stream.listen(onSignUpResolved);

    signUpRejected = _machine.newStateTransition(
      'signUpRejected',
      [isSignUpPending],
      isSignUpRejected,
    )..stream.listen(onSignUpRejected);

    signUpReset = _machine.newStateTransition(
      'signUpReset',
      [isSignUpResolved, isSignUpRejected],
      isSignUpIdle,
    );

    // confirm sign up transitions
    confirmSignUpSumbit = _machine.newStateTransition(
      'confirmSignUpSumbit',
      [isConfirmSignUpIdle],
      isConfirmSignUpPending,
    )..stream.listen(onConfirmSignUpSubmit);

    confirmSignUpResolved = _machine.newStateTransition(
      'confirmSignUpResolved',
      [isConfirmSignUpPending],
      isConfirmSignUpResolved,
    )..stream.listen(onConfirmSignUpResolved);

    confirmSignUpRejected = _machine.newStateTransition(
      'confirmSignUpRejected',
      [isConfirmSignUpPending],
      isConfirmSignUpRejected,
    )..stream.listen(onConfirmSignUpRejected);

    confirmSignUpReset = _machine.newStateTransition(
      'confirmSignUpReset',
      [isConfirmSignUpResolved, isConfirmSignUpRejected],
      isConfirmSignUpIdle,
    );

    // notify listners on state change
    _machine.onStateChange.listen((event) {
      debugPrint("current state: " + event.to.name);
      notifyListeners();
    });

    _machine.start(isSignInIdle);
  }

  void onSignInSubmit(event) async {
    // state is read via the current build context
    StateTransitionPayload payload = event.payload;
    BuildContext context = payload.context;
    String username = context.read<UsernameFormFieldState>().value;
    String password = context.read<PasswordFormFieldState>().value;
    try {
      SignInResult signInResult = await authService.signIn(
        username: username,
        password: password,
      );
      signInResolved();
    } on AuthException catch (authException) {
      debugPrint(authException.toString());
      signInRejected(StateTransitionPayload(
        context: context,
        authException: authException,
      ));
    }
  }

  void onSignInResolved(event) async {
    // TODO: Should there be a transition to authenticated?
    this.onSignInSuccess();
  }

  void onSignInRejected(event) async {
    StateTransitionPayload payload = event.payload;
    setAuthExceptionField(payload.context, payload.authException);
    signInReset();
  }

  void onSignUpSubmit(event) async {
    // state is read via the current build context
    StateTransitionPayload payload = event.payload;
    BuildContext context = payload.context;
    String username = context.read<UsernameFormFieldState>().value;
    String email = context.read<EmailFormFieldState>().value;
    String password = context.read<PasswordFormFieldState>().value;
    try {
      SignUpResult signUpResult = await authService.signUp(
        username: username,
        email: email,
        password: password,
      );
      signUpResolved();
    } on AuthException catch (authException) {
      debugPrint(authException.toString());
      signUpRejected(StateTransitionPayload(
        context: context,
        authException: authException,
      ));
    }
  }

  void onSignUpResolved(event) async {
    // TODO: transitition to confirm sign up if required
    navigateToConfirmSignUp();
  }

  void onSignUpRejected(event) async {
    setAuthExceptionField(event.payload.context, event.payload.authException);
    signUpReset();
  }

  void onConfirmSignUpSubmit(event) async {
    // state is read via the current build context
    StateTransitionPayload payload = event.payload;
    BuildContext context = payload.context;
    String username = context.read<UsernameFormFieldState>().value;
    String verificationCode =
        context.read<VerificationCodeFormFieldState>().value;
    try {
      SignUpResult signInResult = await authService.confirmSignUp(
        username: username,
        verificationCode: verificationCode,
      );
      confirmSignUpResolved(event.payload);
    } on AuthException catch (authException) {
      debugPrint(authException.toString());
      confirmSignUpRejected(StateTransitionPayload(
        context: context,
        authException: authException,
      ));
    }
  }

  void onConfirmSignUpResolved(event) async {
    // TODO: Should this be a unique event instead of re-using the sign in submit?
    signInSumbit(event.payload);
  }

  void onConfirmSignUpRejected(event) async {
    setAuthExceptionField(event.payload.context, event.payload.authException);
    confirmSignUpRejected();
  }

  StateMachine.State get current => _machine.current;

  StateMachine.State isIdle;

  StateMachine.State isAuthenticated;

  StateMachine.State isSignInIdle;
  StateMachine.State isSignInPending;
  StateMachine.State isSignInResolved;
  StateMachine.State isSignInRejected;

  bool get isSignIn =>
      isSignInIdle() ||
      isSignInPending() ||
      isSignInResolved() ||
      isSignInRejected();

  StateMachine.State isSignUpIdle;
  StateMachine.State isSignUpPending;
  StateMachine.State isSignUpResolved;
  StateMachine.State isSignUpRejected;

  bool get isSignUp =>
      isSignUpIdle() ||
      isSignUpPending() ||
      isSignUpResolved() ||
      isSignUpRejected();

  StateMachine.State isConfirmSignUpIdle;
  StateMachine.State isConfirmSignUpPending;
  StateMachine.State isConfirmSignUpResolved;
  StateMachine.State isConfirmSignUpRejected;

  bool get isConfirmSignUp =>
      isConfirmSignUpIdle() ||
      isConfirmSignUpPending() ||
      isConfirmSignUpResolved() ||
      isConfirmSignUpRejected();

  StateMachine.State isResetPasswordIdle;
  StateMachine.State isResetPasswordPending;
  StateMachine.State isResetPasswordResolved;
  StateMachine.State isResetPasswordRejected;

  bool get isResetPassword =>
      isResetPasswordIdle() ||
      isResetPasswordPending() ||
      isResetPasswordResolved() ||
      isResetPasswordRejected();

  StateMachine.State isSignOut;

  // navigation transitions
  StateMachine.StateTransition navigateToSignUp;
  StateMachine.StateTransition navigateToSignIn;
  StateMachine.StateTransition navigateToConfirmSignUp;
  StateMachine.StateTransition navigateToResetPassword;

  // sign in transitions
  StateMachine.StateTransition signInSumbit;
  StateMachine.StateTransition signInReset;
  StateMachine.StateTransition signInResolved;
  StateMachine.StateTransition signInRejected;

  // sign up transitions
  StateMachine.StateTransition signUpSumbit;
  StateMachine.StateTransition signUpReset;
  StateMachine.StateTransition signUpResolved;
  StateMachine.StateTransition signUpRejected;

  // confirm sign up transitions
  StateMachine.StateTransition confirmSignUpSumbit;
  StateMachine.StateTransition confirmSignUpReset;
  StateMachine.StateTransition confirmSignUpResolved;
  StateMachine.StateTransition confirmSignUpRejected;

  StateMachine.StateMachine _machine;

  @override
  String toString() => _machine.toString();
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

class StateTransitionPayload {
  BuildContext context;
  AuthException authException;
  StateTransitionPayload({@required this.context, this.authException});
}
