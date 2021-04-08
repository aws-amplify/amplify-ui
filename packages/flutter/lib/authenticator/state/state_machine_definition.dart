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
    createImplicitStateTransitions(machine, stateMachineDefinition, states),
  );
  Map<String, StreamSubscription<StateChange>> stateChangeSubScriptions =
      createStateChangeSubscriptions(
    machine,
    stateMachineDefinition,
    states,
    stateTransitions,
  );
  State initialState = getState(
    states,
    stateMachineDefinition.initial,
    errorMessage:
        'Invalid initial state. "${stateMachineDefinition.initial}" is not defined.',
  );
  machine.start(initialState);
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
      StateTransition newStateTransition = createStateTransiton(
        machine,
        states,
        state.key + '-' + on.key,
        state.key,
        on.value,
      );
      return MapEntry(newStateTransition.name, newStateTransition);
    });
  }).reduce((value, element) => [...value, ...element]));
}

// state.invoke.onDone.target, state.invoke.onError, and state.always create implied state
// transitions that are valid. These transitions need to be created or the transitions will fail
Map<String, StateTransition> createImplicitStateTransitions(
  StateMachine machine,
  StateMachineDefinition stateMachineDefinition,
  Map<String, State> states,
) {
  List<MapEntry<String, StateTransition>> invokeImplicitStateTransitions =
      stateMachineDefinition.states.entries
          .where((state) => state.value.invoke != null)
          .map((state) {
    StateTransition targetStateTransition = createStateTransiton(
      machine,
      states,
      state.key + '-to-' + state.value.invoke.onDone.target,
      state.key,
      state.value.invoke.onDone.target,
    );
    StateTransition onErrorStateTransition = createStateTransiton(
      machine,
      states,
      state.key + '-to-' + state.value.invoke.onError,
      state.key,
      state.value.invoke.onError,
    );
    return [
      MapEntry(targetStateTransition.name, targetStateTransition),
      MapEntry(onErrorStateTransition.name, onErrorStateTransition),
    ];
  }).reduce((value, element) => [...value, ...element]);
  List<MapEntry<String, StateTransition>> alwaysImplicitStateTransitions =
      stateMachineDefinition.states.entries
          .where((state) => state.value.always != null)
          .map((state) {
    StateTransition newStateTransition = createStateTransiton(
      machine,
      states,
      state.key + '-to-' + state.value.always,
      state.key,
      state.value.always,
    );
    return MapEntry(newStateTransition.name, newStateTransition);
  }).toList();
  return Map<String, StateTransition>.fromEntries([
    ...invokeImplicitStateTransitions,
    ...alwaysImplicitStateTransitions,
  ]);
}

// creates a map where the key is the state name and the value is the subscription from listenting entries to that state
Map<String, StreamSubscription<StateChange>> createStateChangeSubscriptions(
  StateMachine machine,
  StateMachineDefinition stateMachineDefinition,
  Map<String, State> states,
  Map<String, StateTransition> stateTransitions,
) {
  // subscriptions from state.invoke.onDone and state.invoke.onError
  List<MapEntry<String, StreamSubscription<StateChange>>> invokeSubscriptions =
      stateMachineDefinition.states.entries
          .where((state) => state.value.invoke != null)
          .map((state) {
    StreamSubscription<StateChange> subscription =
        getState(states, state.key).onEnter.listen((event) {
      ServiceFn service =
          stateMachineDefinition.services[state.value.invoke.src];
      service(event).then((value) {
        // state transition will have been created by createImplicitStateTransitions
        String stateTransitionName =
            state.key + "-to-" + state.value.invoke.onDone.target;
        getStateTransition(stateTransitions, stateTransitionName)();
      }).catchError((error) {
        // state transition will have been created by createImplicitStateTransitions
        String stateTransitionName =
            state.key + "-to-" + state.value.invoke.onError;
        getStateTransition(stateTransitions, stateTransitionName)();
      });
    });
    return MapEntry(state.key, subscription);
  }).toList();
  // subscriptions from state.always
  List<MapEntry<String, StreamSubscription<StateChange>>> alwaysSubscriptions =
      stateMachineDefinition.states.entries
          .where((state) => state.value.always != null)
          .map((state) {
    StreamSubscription<StateChange> subscription =
        getState(states, state.key).onEnter.listen((event) {
      String stateTransitionName = state.key + "-to-" + state.value.always;
      getStateTransition(stateTransitions, stateTransitionName)();
    });
    return MapEntry(state.key, subscription);
  }).toList();
  return Map<String, StreamSubscription<StateChange>>.fromEntries([
    ...invokeSubscriptions,
    ...alwaysSubscriptions,
  ]);
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
  String always;
  StateDefinition.fromJson(Map<dynamic, dynamic> jsonState) {
    on = jsonState['on'];
    invoke = jsonState['invoke'] == null
        ? null
        : StateDefinitionInvoke.fromJson(jsonState['invoke']);
    always = jsonState['always'];
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

State getState(Map<String, State> states, String name, {String errorMessage}) {
  if (states[name] == null) {
    throw InvalidStateScheme(errorMessage ?? 'State: "$name" is not defined.');
  }
  return states[name];
}

StateTransition getStateTransition(
    Map<String, StateTransition> stateTransitions, String name,
    [String reason]) {
  if (stateTransitions[name] == null) {
    throw InvalidStateScheme(
        reason ?? 'StateTransition: "$name" is not not defined.');
  }
  return stateTransitions[name];
}

StateTransition createStateTransiton(
  StateMachine machine,
  Map<String, State> states,
  String stateTransitionName,
  String fromStateName,
  String toStateName,
) {
  State fromState = getState(
    states,
    fromStateName,
    errorMessage:
        'Cannot create StateTransition with name "$stateTransitionName". From state: "$fromStateName" is not defined.',
  );
  State toState = getState(
    states,
    toStateName,
    errorMessage:
        'Cannot create StateTransition with name "$stateTransitionName". To state: "$toStateName" is not defined.',
  );
  return machine.newStateTransition(
    stateTransitionName,
    [fromState],
    toState,
  );
}

class InvalidStateScheme implements Exception {
  String reason;
  InvalidStateScheme(
    this.reason,
  );
  String get message => 'The JSON scheme was invalid. $reason';
  @override
  String toString() => 'InvalidStateScheme: $message';
}
