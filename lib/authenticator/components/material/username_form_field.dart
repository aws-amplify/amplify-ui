import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../authenticator.dart';

class UsernameFormField extends StatelessWidget {
  const UsernameFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    UsernameFormFieldState state = context.watch<UsernameFormFieldState>();
    return TextFormField(
      initialValue: state.value,
      decoration: InputDecoration(
        labelText: state.label,
        errorText: state.validationMessage,
      ),
      onChanged: (value) {
        state.value = value;
      },
    );
  }
}
