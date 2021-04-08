import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:state_machine/state_machine.dart';

// returns a GeneratedStateMachine (StateMachine + the associated States and StateTransitions)
// given a json state definition
GeneratedStateMachine generateStateMachine(
  Map<String, dynamic> jsonState,
) {
  StateMachineDefinition stateMachineDefinition =
      StateMachineDefinition.fromJson(jsonState);
  StateMachine machine = StateMachine(stateMachineDefinition.id);
  Map<String, State> states = createStates(machine, stateMachineDefinition);
  Map<String, StateTransition> stateTransitions =
      createStateTransitions(machine, stateMachineDefinition, states);
  stateTransitions.addAll(
    createInvokeStateTransitions(machine, stateMachineDefinition, states),
  );
  Map<String, StreamSubscription<StateChange>> stateChangeSubScriptions =
      createStateChangeSubscriptions(
    machine,
    stateMachineDefinition,
    states,
    stateTransitions,
  );
  machine.start(states[stateMachineDefinition.initial]);
  debugPrint('STATES:');
  states.keys.forEach((element) => debugPrint(element));
  debugPrint('STATE TRANSITIONS:');
  stateTransitions.keys.forEach((element) => debugPrint(element));
  return GeneratedStateMachine(
    stateMachine: machine,
    states: states,
    stateTransitions: stateTransitions,
  );
}

// creates a map where the key is the state name and the value is the state_machine State
Map<String, State> createStates(
    StateMachine machine, StateMachineDefinition stateMachineDefinition) {
  return stateMachineDefinition.states.map((stateKey, stateValue) {
    State newState = machine.newState(stateKey);
    return MapEntry(stateKey, newState);
  });
}

// creates a map where the key is the state name + the event name and the value is the state_machine StateTransition
Map<String, StateTransition> createStateTransitions(StateMachine machine,
    StateMachineDefinition stateMachineDefinition, Map<String, State> states) {
  return Map<String, StateTransition>.fromEntries(stateMachineDefinition
      .states.entries
      .where((state) => state.value.on != null)
      .map((state) {
    return state.value.on.entries.map((on) {
      String stateTransitionKey = state.key + '-' + on.key;
      StateTransition newStateTransition = machine.newStateTransition(
        state.key + '-' + on.key,
        [states[state.key]],
        states[on.value],
      );
      return MapEntry(stateTransitionKey, newStateTransition);
    });
  }).reduce((value, element) => [...value, ...element]));
}

// invoke.onDone.target and onDone.onError can transition directly to a new state
// in order to make this possible, the state transition needs to exist
Map<String, StateTransition> createInvokeStateTransitions(
  StateMachine machine,
  StateMachineDefinition stateMachineDefinition,
  Map<String, State> states,
) {
  return Map<String, StateTransition>.fromEntries(stateMachineDefinition
      .states.entries
      .where((state) => state.value.invoke != null)
      .map((state) {
    StateTransition targetStateTransition = machine.newStateTransition(
      state.key + '-to-' + state.value.invoke.onDone.target,
      [states[state.key]],
      states[state.value.invoke.onDone.target],
    );
    StateTransition onErrorStateTransition = machine.newStateTransition(
      state.key + '-to-' + state.value.invoke.onError,
      [states[state.key]],
      states[state.value.invoke.onError],
    );
    return [
      MapEntry(targetStateTransition.name, targetStateTransition),
      MapEntry(onErrorStateTransition.name, onErrorStateTransition),
    ];
  }).reduce((value, element) => [...value, ...element]));
}

// creates a map where the key is the state name and the value is the subscription from listenting entries to that state
Map<String, StreamSubscription<StateChange>> createStateChangeSubscriptions(
  StateMachine machine,
  StateMachineDefinition stateMachineDefinition,
  Map<String, State> states,
  Map<String, StateTransition> stateTransitions,
) {
  return Map<String, StreamSubscription<StateChange>>.fromEntries(
      stateMachineDefinition.states.entries
          .where((state) => state.value.invoke != null)
          .map((state) {
    StreamSubscription<StateChange> subscription =
        states[state.key].onEnter.listen((event) {
      ServiceFn service =
          stateMachineDefinition.services[state.value.invoke.src];
      service(event).then((value) {
        // state transition will have been created by createInvokeStateTransitions
        stateTransitions[
            state.key + "-to-" + state.value.invoke.onDone.target]();
      }).catchError((error) {
        // state transition will have been created by createInvokeStateTransitions
        stateTransitions[state.key + "-to-" + state.value.invoke.onError]();
      });
    });
    return MapEntry(state.key, subscription);
  }));
}

// GeneratedStateMachine is a StateMachine + the associated States and StateTransitions
// accessible by the key name
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

// helper classes and types for parsing the json state

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
