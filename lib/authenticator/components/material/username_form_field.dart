import 'package:flutter/material.dart';

import '../../authenticator.dart';

class UsernameFormField extends StatelessWidget {
  const UsernameFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthenticatorFormFieldState state =
        AuthenticatorStateProvider.of(context).usernameFormFieldState;
    return TextFormField(
      initialValue: state.value,
      decoration: InputDecoration(
        labelText: state.label,
        errorText: state.validationMessage,
      ),
      onChanged: (value) {
        AuthenticatorStateProvider.dispatch(
          context,
          SetUsernameAction(value),
        );
      },
    );
  }
}
