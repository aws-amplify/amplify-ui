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
          // TODO: update this to match ho js handles errors
          "entry": "clearErrorMessages",
          "on": {
            "SIGN_UP": "signUpIdle",
            "RESET_PASSWORD": "resetPasswordIdle",
            "SUBMIT": "signInPending",
          }
        },
        "signInPending": {
          "entry": "clearErrorMessages",
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
          // TODO: update this to match ho js handles errors
          "entry": "setErrorMessages",
          "always": "signInIdle",
        },
        "signUpIdle": {
          "entry": "clearErrorMessages",
          "on": {
            "SIGN_IN": "signInIdle",
            "SUBMIT": "signUpPending",
          },
        },
        "signUpPending": {
          "entry": "clearErrorMessages",
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
          "entry": "setErrorMessages",
          "always": "signUpIdle",
        },
        "confirmSignUpIdle": {
          "entry": "clearErrorMessages",
          "on": {
            "SUBMIT": "confirmSignUpPending",
          },
        },
        "confirmSignUpPending": {
          "entry": "clearErrorMessages",
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
          "entry": "setErrorMessages",
          "always": "confirmSignUpIdle",
        },
        "resetPasswordIdle": {
          "entry": "clearErrorMessages",
          "on": {
            "SIGN_IN": "signInIdle",
          }
        },
      },
      "services": {
        "signIn": onSignInSubmit,
        "signUp": onSignUpSubmit,
        "confirmSignUp": onConfirmSignUpSubmit,
      },
      "actions": {
        "setErrorMessages": (event) {
          setAuthExceptionField(
            event.payload.context,
            event.payload.authException,
          );
        },
        "clearErrorMessages": (event) {
          // TODO: context will be null on the initial state entry
          if (event.payload?.context != null) {
            clearAuthExceptionFields(event.payload.context);
          }
        }
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

  bool send(String value, StateTransitionPayload payload) {
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
