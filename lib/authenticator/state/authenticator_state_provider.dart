import 'package:flutter/widgets.dart';
import 'authenticator_actions.dart';
import 'authenticator_state.dart';
import 'authenticator_reducer.dart';

// AuthenticatorStateProvider provides a mechanism to share AuthenticatorState with its children
// This widget should wrap all of the Authenticator Widgets that depend on AuthenticatorState
// The actual implementation is essentially a light weight redux implementation, but that could be changed in the future.
//
// This widget uses an InheritedWidget
class AuthenticatorStateProvider extends StatefulWidget {
  AuthenticatorStateProvider({
    Key key,
    @required this.initialModel,
    this.child,
  })  : assert(initialModel != null),
        super(key: key);

  final AuthenticatorState initialModel;
  final Widget child;

  _AuthenticatorStateProviderState createState() =>
      _AuthenticatorStateProviderState();

  static _AuthenticatorInheritedWidget _getInheritedWidget(
      BuildContext context) {
    final _AuthenticatorInheritedWidget authenticatorInheritedWidget = context
        .dependOnInheritedWidgetOfExactType<_AuthenticatorInheritedWidget>();
    assert(
      authenticatorInheritedWidget != null,
      'No _AuthenticatorInheritedWidget found in context. Ensure that all Authenticator widgets are descendants of an AuthenticatorStateProvider widget.',
    );
    return authenticatorInheritedWidget;
  }

  // return the current AuthenticatorState
  static AuthenticatorState of(BuildContext context) {
    final _AuthenticatorInheritedWidget authenticatorInheritedWidget =
        _getInheritedWidget(context);
    return authenticatorInheritedWidget.modelBindingState.currentModel;
  }

  // dispatch an AuthenticatorAction to update AuthenticatorState
  static void dispatch(
    BuildContext context,
    AuthenticatorAction action, [
    dynamic data,
  ]) async {
    _AuthenticatorInheritedWidget authenticatorInheritedWidget =
        _getInheritedWidget(context);
    final AuthenticatorState state =
        authenticatorInheritedWidget.modelBindingState.currentModel;
    AuthenticatorState newState = authenticatorStateReducer(state, action);
    authenticatorInheritedWidget.modelBindingState.updateModel(newState);
    AuthenticatorAction newAction =
        await authenticatorSideEffectsHandler(action, newState);
    if (newAction != null && newAction is AuthenticatorAction) {
      dispatch(context, newAction);
    }
  }
}

class _AuthenticatorInheritedWidget extends InheritedWidget {
  const _AuthenticatorInheritedWidget({
    Key key,
    this.modelBindingState,
    Widget child,
  }) : super(key: key, child: child);

  final _AuthenticatorStateProviderState modelBindingState;

  @override
  bool updateShouldNotify(_AuthenticatorInheritedWidget oldWidget) => true;
}

class _AuthenticatorStateProviderState
    extends State<AuthenticatorStateProvider> {
  AuthenticatorState currentModel;

  @override
  void initState() {
    super.initState();
    currentModel = widget.initialModel;
  }

  void updateModel(AuthenticatorState newModel) {
    if (newModel != currentModel) {
      setState(() {
        currentModel = newModel;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return _AuthenticatorInheritedWidget(
      modelBindingState: this,
      child: widget.child,
    );
  }
}
