import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import 'package:amplify_authenticator/authenticator/components/materialAuthenticator.dart';
import '../viewUserInfo.dart';

class ConfirmPasswordExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: MaterialAuthenticatorBuilder(
        builder: (context, state) {
          if (state.isSignIn) {
            return MaterialSignInView();
          }
          if (state.isSignUp) {
            return CustomMaterialSignUpView(state: state);
          }
          if (state.isConfirmSignUp) {
            return MaterialConfirmSignUpView();
          }
          if (state.isResetPassword) {
            return MaterialForgotPasswordView();
          }
          return ViewUserInfo();
        },
      ),
    );
  }
}

class CustomMaterialSignUpView extends StatefulWidget {
  CustomMaterialSignUpView({
    Key key,
    @required this.state,
  }) : super(key: key);

  final AuthenticatorState state;

  @override
  _CustomMaterialSignUpViewState createState() =>
      _CustomMaterialSignUpViewState();
}

class _CustomMaterialSignUpViewState extends State<CustomMaterialSignUpView> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Up'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              UsernameFormField(),
              SizedBox(height: 12.0),
              EmailFormField(),
              SizedBox(height: 12.0),
              PasswordFormField(),
              SizedBox(height: 12.0),
              ConfirmPasswordFormField(state: widget.state),
              SizedBox(height: 12.0),
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SignInLink(),
                  CustomSignUpButton(
                    state: widget.state,
                    validate: () => _formKey.currentState.validate(),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}

class ConfirmPasswordFormField extends StatelessWidget {
  const ConfirmPasswordFormField({
    Key key,
    @required this.state,
  }) : super(key: key);
  final AuthenticatorState state;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      decoration: InputDecoration(
        labelText: 'Confirm Password',
      ),
      validator: (value) {
        if (value != state.passwordFormFieldState.value) {
          return 'The two passwords do not match';
        }
        return null;
      },
      obscureText: true,
    );
  }
}

// TODO: if the out of the box SignUpButton allowed for a validate function to
// be passed in, this could be accomplished without the need for a custom button
class CustomSignUpButton extends StatelessWidget {
  const CustomSignUpButton({
    Key key,
    @required this.state,
    this.validate,
  }) : super(key: key);

  final AuthenticatorState state;
  final bool Function() validate;

  @override
  Widget build(BuildContext context) {
    Function onPressed = () {
      if (validate()) {
        return state.sumbit(context);
      }
    };
    return ElevatedButton(
      onPressed: onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Sign Up'),
        ],
      ),
    );
  }
}
