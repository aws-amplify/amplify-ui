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
        "authenticated": {},
        "signInIdle": {
          "on": {
            "SIGN_UP": "signUpIdle",
            "RESET_PASSWORD": "resetPasswordIdle",
            "SUBMIT": "signInPending",
          }
        },
        "signInPending": {
          "invoke": {
            "src": "signIn",
            "onDone": {
              "actions": "setUser", // TODO: Handle actions
              "target": "signInResolved",
            },
            "onError": "signInRejected",
          }
        },
        "signInResolved": {
          "always": "authenticated",
        },
        "signInRejected": {
          "always": "signInIdle",
        },
        "signUpIdle": {
          "on": {
            "SIGN_IN": "signInIdle",
            "SUBMIT": "signUpPending",
          },
        },
        "signUpPending": {
          "invoke": {
            "src": "signUp",
            "onDone": {
              "actions": "setUser",
              "target": "signUpResolved",
            },
            "onError": "signUpRejected",
          }
        },
        "signUpResolved": {
          // TODO: There should be a condition here, it should not be always
          "always": "confirmSignUpIdle"
        },
        "signUpRejected": {
          "always": "signUpIdle",
        },
        "confirmSignUpIdle": {
          "on": {
            "SUBMIT": "confirmSignUpPending",
          },
        },
        "confirmSignUpPending": {
          "invoke": {
            "src": "confirmSignUp",
            "onDone": {
              "target": "confirmSignUpResolved",
            },
            "onError": "confirmSignUpRejected",
          }
        },
        "confirmSignUpResolved": {
          "always": "authenticated",
        },
        "confirmSignUpRejected": {
          "always": "confirmSignUpIdle",
        },
        "resetPasswordIdle": {
          "on": {
            "SIGN_IN": "signInIdle",
          }
        },
      },
      "services": {
        "signIn": onSignInSubmit,
        "signUp": onSignUpSubmit,
        "confirmSignUp": onConfirmSignUpSubmit,
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
      if (event.to.name == "authenticated") {
        this.onSignInSuccess();
      }
    });
  }

  Map<String, StateMachine.State> states;
  Map<String, StateMachine.StateTransition> stateTransitions;

  bool send(String value, [dynamic payload]) {
    String transitionName = _machine.current.name + '-' + value;
    debugPrint(transitionName);
    if (stateTransitions[transitionName] == null) {
      throw InvalidStateTransition(
        _machine.current.name,
        value,
      );
    }
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

  Future<SignUpResult> onSignUpSubmit(event) {
    // state is read via the current build context
    StateTransitionPayload payload = event.payload;
    BuildContext context = payload.context;
    clearAuthExceptionFields(context);
    String username = context.read<UsernameFormFieldState>().value;
    String email = context.read<EmailFormFieldState>().value;
    String password = context.read<PasswordFormFieldState>().value;
    return authService.signUp(
      username: username,
      email: email,
      password: password,
    );
  }

  Future<SignUpResult> onConfirmSignUpSubmit(event) {
    // state is read via the current build context
    StateTransitionPayload payload = event.payload;
    BuildContext context = payload.context;
    clearAuthExceptionFields(context);
    String username = context.read<UsernameFormFieldState>().value;
    String verificationCode =
        context.read<VerificationCodeFormFieldState>().value;
    return authService.confirmSignUp(
      username: username,
      verificationCode: verificationCode,
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

  // void onSignUpResolved(event) async {
  //   // TODO: transitition to confirm sign up if required
  //   navigateToConfirmSignUp();
  // }

  // void onSignUpRejected(event) async {
  //   setAuthExceptionField(event.payload.context, event.payload.authException);
  //   signUpReset();
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

class InvalidStateTransition implements Exception {
  String currentStateName;
  String eventName;
  InvalidStateTransition(
    this.currentStateName,
    this.eventName,
  );
  String get message =>
      'event: "$eventName" is not a valid event from state: "$currentStateName". No StateTransition exists for this event and state.';
  @override
  String toString() => 'InvalidStateTransition: $message';
}
