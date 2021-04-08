import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_authenticator/authenticator/utilities/exception_utilities.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:state_machine/state_machine.dart' as StateMachine;
import 'package:provider/provider.dart';
import '../authenticator_service.dart' as authService;
import 'authenticator_state.dart';
import 'state_machine_definition.dart';

// AuthStateMachine is a state machine built with the library state_machine
// AuthStateMachine is a ChangeNotifier that will call notifyListeners() on state change
class AuthStateMachine with ChangeNotifier {
  // callback for a successful sign in
  Function onSignInSuccess;
  // an initial step to start on
  AuthenticatorStep initialStep;

  AuthStateMachine({
    @required this.onSignInSuccess,
    @required this.initialStep,
    Function onStateChange,
  }) {
    // minimal state definition that roughly matches xState's Json definition
    Map<String, dynamic> jsonState = {
      "id": "auth",
      "initial": "signInIdle",
      "states": {
        "signInIdle": {
          "on": {
            "SIGN_UP": "signUpIdle",
            "SUBMIT": "signInPending",
          }
        },
        "signInPending": {
          "invoke": {
            "src": "signIn",
            "onDone": {
              "actions": "setUser",
              "target": "signInResolved",
            },
            "onError": "signInRejected",
          }
        },
        "signInResolved": {
          // TODO: Does anything need to happen with this? Currently it is being ignored
          "type": "final"
        },
        "signInRejected": {
          "always": "signInIdle",
        },
        "signUpIdle": {
          "on": {
            "SIGN_IN": "signInIdle",
          },
        },
      },
      "services": {
        "signIn": onSignInSubmit,
      }
    };
    GeneratedStateMachine generatedStateMachine =
        generateStateMachine(jsonState);
    _machine = generatedStateMachine.stateMachine;
    states = generatedStateMachine.states;
    stateTransitions = generatedStateMachine.stateTransitions;

    // notify listners on state change
    _machine.onStateChange.listen((event) {
      debugPrint("current state: " + event.to.name);
      notifyListeners();
      if (event.to.name == "signInResolved") {
        this.onSignInSuccess();
      }
    });
  }

  Map<String, StateMachine.State> states;
  Map<String, StateMachine.StateTransition> stateTransitions;

  bool send(String value, [dynamic payload]) {
    String transitionName = _machine.current.name + '-' + value;
    debugPrint(transitionName);
    StateMachine.StateTransition stateTransition =
        stateTransitions[transitionName];
    return stateTransition(payload);
  }

  Future<SignInResult> onSignInSubmit(event) {
    // state is read via the current build context
    StateTransitionPayload payload = event.payload;
    BuildContext context = payload.context;
    clearAuthExceptionFields(context);
    String username = context.read<UsernameFormFieldState>().value;
    String password = context.read<PasswordFormFieldState>().value;
    return authService.signIn(
      username: username,
      password: password,
    );
  }

  // void onSignInResolved(event) async {
  //   // TODO: Should there be a transition to authenticated?
  //   this.onSignInSuccess();
  // }

  // void onSignInRejected(event) async {
  //   StateTransitionPayload payload = event.payload;
  //   setAuthExceptionField(payload.context, payload.authException);
  //   signInReset();
  // }

  // void onSignUpSubmit(event) async {
  //   // state is read via the current build context
  //   StateTransitionPayload payload = event.payload;
  //   BuildContext context = payload.context;
  //   clearAuthExceptionFields(context);
  //   String username = context.read<UsernameFormFieldState>().value;
  //   String email = context.read<EmailFormFieldState>().value;
  //   String password = context.read<PasswordFormFieldState>().value;
  //   try {
  //     SignUpResult signUpResult = await authService.signUp(
  //       username: username,
  //       email: email,
  //       password: password,
  //     );
  //     signUpResolved();
  //   } on AuthException catch (authException) {
  //     debugPrint(authException.toString());
  //     signUpRejected(StateTransitionPayload(
  //       context: context,
  //       authException: authException,
  //     ));
  //   }
  // }

  // void onSignUpResolved(event) async {
  //   // TODO: transitition to confirm sign up if required
  //   navigateToConfirmSignUp();
  // }

  // void onSignUpRejected(event) async {
  //   setAuthExceptionField(event.payload.context, event.payload.authException);
  //   signUpReset();
  // }

  // void onConfirmSignUpSubmit(event) async {
  //   // state is read via the current build context
  //   StateTransitionPayload payload = event.payload;
  //   BuildContext context = payload.context;
  //   clearAuthExceptionFields(context);
  //   String username = context.read<UsernameFormFieldState>().value;
  //   String verificationCode =
  //       context.read<VerificationCodeFormFieldState>().value;
  //   try {
  //     SignUpResult signInResult = await authService.confirmSignUp(
  //       username: username,
  //       verificationCode: verificationCode,
  //     );
  //     confirmSignUpResolved(event.payload);
  //   } on AuthException catch (authException) {
  //     debugPrint(authException.toString());
  //     confirmSignUpRejected(StateTransitionPayload(
  //       context: context,
  //       authException: authException,
  //     ));
  //   }
  // }

  // void onConfirmSignUpResolved(event) async {
  //   // TODO: Should this be a unique event instead of re-using the sign in submit?
  //   signInSumbit(event.payload);
  // }

  // void onConfirmSignUpRejected(event) async {
  //   setAuthExceptionField(event.payload.context, event.payload.authException);
  //   confirmSignUpRejected();
  // }

  StateMachine.State get current => _machine.current;

  // none of the state definitions are defined
  // they are left in this poc to avoid having to update every location they are referenced
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

// StateTransition can have a payload, but unfortunately that payload will always be a dynamic
// StateTransitionPayload is an attempt to use a uniform class for payloads
class StateTransitionPayload {
  BuildContext context;
  AuthException authException;
  StateTransitionPayload({@required this.context, this.authException});
}
