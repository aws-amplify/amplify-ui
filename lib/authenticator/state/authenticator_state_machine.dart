import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:flutter/foundation.dart';
import 'package:state_machine/state_machine.dart';
import '../authenticator_service.dart' as authService;

// AuthStateMachine is a state machine built with the library state_machine
// AuthStateMachine is a ChangeNotifier that will call notifyListeners() on state change
class AuthStateMachine with ChangeNotifier {
  // callback for a successful sign in
  Function onSignInSuccess;

  AuthStateMachine({@required this.onSignInSuccess, Function onStateChange}) {
    _machine = StateMachine('auth');

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
      debugPrint(event.to.name);
      notifyListeners();
    });

    _machine.start(isSignInIdle);
  }

  void onSignInSubmit(event) async {
    // sign in with event payload
    String username = event.payload['username'];
    String password = event.payload['password'];
    try {
      SignInResult signInResult = await authService.signIn(
        username: username,
        password: password,
      );
      signInResolved();
    } on AuthException catch (e) {
      debugPrint(e.toString());
      signInRejected(e);
    }
  }

  void onSignInResolved(event) async {
    // TODO: Should there be a transition to authenticated?
    this.onSignInSuccess();
  }

  void onSignInRejected(event) async {
    // TODO: set errors and then reset
    signInReset();
  }

  void onSignUpSubmit(event) async {
    // sign up with event payload
    String username = event.payload['username'];
    String email = event.payload['email'];
    String password = event.payload['password'];
    try {
      SignUpResult signUpResult = await authService.signUp(
        username: username,
        email: email,
        password: password,
      );
      signUpResolved();
    } on AuthException catch (e) {
      debugPrint(e.toString());
      signUpRejected(e);
    }
  }

  void onSignUpResolved(event) async {
    // TODO: transitition to confirm sign up if required
    navigateToConfirmSignUp();
  }

  void onSignUpRejected(event) async {
    // TODO: set errors and then reset
    signUpReset();
  }

  void onConfirmSignUpSubmit(event) async {
    // confirm sign up with event payload
    String username = event.payload['username'];
    String verificationCode = event.payload['verificationCode'];
    try {
      SignUpResult signInResult = await authService.confirmSignUp(
        username: username,
        verificationCode: verificationCode,
      );
      confirmSignUpResolved(event.payload);
    } on AuthException catch (e) {
      debugPrint(e.toString());
      confirmSignUpRejected(e);
    }
  }

  void onConfirmSignUpResolved(event) async {
    // TODO: Should this be a unique event instead of re-using the sign in submit?
    signInSumbit(event.payload);
  }

  void onConfirmSignUpRejected(event) async {
    // TODO: set errors and then reset
    confirmSignUpRejected();
  }

  State get current => _machine.current;

  State isIdle;

  State isAuthenticated;

  State isSignInIdle;
  State isSignInPending;
  State isSignInResolved;
  State isSignInRejected;

  bool get isSignIn =>
      isSignInIdle() ||
      isSignInPending() ||
      isSignInResolved() ||
      isSignInRejected();

  State isSignUpIdle;
  State isSignUpPending;
  State isSignUpResolved;
  State isSignUpRejected;

  bool get isSignUp =>
      isSignUpIdle() ||
      isSignUpPending() ||
      isSignUpResolved() ||
      isSignUpRejected();

  State isConfirmSignUpIdle;
  State isConfirmSignUpPending;
  State isConfirmSignUpResolved;
  State isConfirmSignUpRejected;

  bool get isConfirmSignUp =>
      isConfirmSignUpIdle() ||
      isConfirmSignUpPending() ||
      isConfirmSignUpResolved() ||
      isConfirmSignUpRejected();

  State isResetPasswordIdle;
  State isResetPasswordPending;
  State isResetPasswordResolved;
  State isResetPasswordRejected;

  bool get isResetPassword =>
      isResetPasswordIdle() ||
      isResetPasswordPending() ||
      isResetPasswordResolved() ||
      isResetPasswordRejected();

  State isSignOut;

  // navigation transitions
  StateTransition navigateToSignUp;
  StateTransition navigateToSignIn;
  StateTransition navigateToConfirmSignUp;
  StateTransition navigateToResetPassword;

  // sign in transitions
  StateTransition signInSumbit;
  StateTransition signInReset;
  StateTransition signInResolved;
  StateTransition signInRejected;

  // sign up transitions
  StateTransition signUpSumbit;
  StateTransition signUpReset;
  StateTransition signUpResolved;
  StateTransition signUpRejected;

  // confirm sign up transitions
  StateTransition confirmSignUpSumbit;
  StateTransition confirmSignUpReset;
  StateTransition confirmSignUpResolved;
  StateTransition confirmSignUpRejected;

  StateMachine _machine;

  @override
  String toString() => _machine.toString();
}
