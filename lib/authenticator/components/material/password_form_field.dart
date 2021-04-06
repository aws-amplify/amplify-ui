import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../authenticator.dart';

class PasswordFormField extends StatelessWidget {
  const PasswordFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    PasswordFormFieldState state = context.watch<PasswordFormFieldState>();
    return TextFormField(
      initialValue: state.value,
      decoration: InputDecoration(
        labelText: state.label,
        errorText: state.validationMessage,
      ),
      onChanged: (value) {
        state.value = value;
      },
      obscureText: true,
    );
  }
}
