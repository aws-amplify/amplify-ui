import 'package:flutter/material.dart';

import '../../authenticator.dart';

class PasswordFormField extends StatelessWidget {
  const PasswordFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AuthenticatorFormFieldState state =
        AuthenticatorStateProvider.of(context).passwordFormFieldState;
    return TextFormField(
      initialValue: state.value,
      decoration: InputDecoration(
        labelText: state.label,
        errorText: state.validationMessage,
      ),
      onChanged: (value) {
        AuthenticatorStateProvider.dispatch(
          context,
          SetPasswordAction(value),
        );
      },
      obscureText: true,
    );
  }
}
