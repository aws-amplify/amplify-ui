import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../authenticator/state/authenticator_state.dart';

class EmailFormField extends StatelessWidget {
  const EmailFormField({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    EmailFormFieldState state = context.watch<EmailFormFieldState>();
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
