import 'package:flutter/foundation.dart';
import 'package:state_machine/state_machine.dart';

typedef ServiceFn = Future Function(dynamic event);

class StateMachineDefinition {
  String id;
  String initial;
  Map<String, StateDefinition> states;
  Map<String, ServiceFn> services;
  StateMachineDefinition.fromJson(Map<dynamic, dynamic> jsonState) {
    id = jsonState['id'];
    initial = jsonState['initial'];
    states = (jsonState['states'] as Map<dynamic, dynamic>).map((key, value) {
      return MapEntry(key, StateDefinition.fromJson(value));
    });
    services = jsonState['services'];
  }
}

class StateDefinition {
  Map<String, String> on;
  StateDefinitionInvoke invoke;
  StateDefinition.fromJson(Map<dynamic, dynamic> jsonState) {
    on = jsonState['on'];
    invoke = jsonState['invoke'] == null
        ? null
        : StateDefinitionInvoke.fromJson(jsonState['invoke']);
  }
}

class StateDefinitionInvoke {
  String src;
  StateDefinitionInvokeOnDone onDone;
  String onError;
  StateDefinitionInvoke.fromJson(Map<dynamic, dynamic> jsonState) {
    src = jsonState['src'];
    onDone = StateDefinitionInvokeOnDone.fromJson(jsonState['onDone']);
    onError = jsonState['onError'];
  }
}

class StateDefinitionInvokeOnDone {
  String actions;
  String target;
  StateDefinitionInvokeOnDone.fromJson(Map<dynamic, dynamic> jsonState) {
    actions = jsonState['actions'];
    target = jsonState['target'];
  }
}

class GeneratedStateMachine {
  StateMachine stateMachine;
  Map<String, State> states;
  Map<String, StateTransition> stateTransitions;
  GeneratedStateMachine({
    @required this.stateMachine,
    @required this.states,
    @required this.stateTransitions,
  });
}

GeneratedStateMachine generateStateMachine(
  Map<String, dynamic> jsonState,
) {
  StateMachineDefinition stateMachineDefinition =
      StateMachineDefinition.fromJson(jsonState);
  StateMachine machine = StateMachine(stateMachineDefinition.id);
  Map<String, State> states = {};
  Map<String, StateTransition> stateTransitions = {};
  stateMachineDefinition.states.forEach((stateKey, stateValue) {
    State newState = machine.newState(stateKey);
    states[stateKey] = newState;
  });
  stateMachineDefinition.states.forEach((stateKey, stateValue) {
    if (stateValue.on != null) {
      stateValue.on.forEach((toKey, toValue) {
        String stateTransitionKey = stateKey + '-' + toKey;
        StateTransition newStateTransition = machine.newStateTransition(
          stateKey + '-' + toKey,
          [states[stateKey]],
          states[toValue],
        );
        stateTransitions[stateTransitionKey] = newStateTransition;
      });
    }
  });
  stateMachineDefinition.states.forEach((stateKey, stateValue) {
    if (stateValue.invoke != null) {
      states[stateKey].onEnter.listen((event) {
        ServiceFn service =
            stateMachineDefinition.services[stateValue.invoke.src];
        service(event).then((value) {
          stateTransitions[stateKey + "-" + stateValue.invoke.onDone.target]();
        }).catchError((error) {
          stateTransitions[stateKey + "-" + stateValue.invoke.onError]();
        });
      });
    }
  });
  machine.start(states[stateMachineDefinition.initial]);
  debugPrint('states: ' + states.keys.toString());
  debugPrint('stateTransitions: ' + stateTransitions.keys.toString());
  return GeneratedStateMachine(
    stateMachine: machine,
    states: states,
    stateTransitions: stateTransitions,
  );
}
