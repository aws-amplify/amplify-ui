import 'package:flutter/material.dart';

import '../../authenticator.dart';

class EmailFormField extends StatelessWidget {
  const EmailFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthenticatorFormFieldState state =
        AuthenticatorStateProvider.of(context).emailFormFieldState;
    return TextFormField(
      initialValue: state.value,
      decoration: InputDecoration(
        labelText: state.label,
        errorText: state.validationMessage,
      ),
      onChanged: (value) {
        AuthenticatorStateProvider.dispatch(
          context,
          SetEmailAction(value),
        );
      },
    );
  }
}
