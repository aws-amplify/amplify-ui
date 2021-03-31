import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/cupertino.dart';
import '../models/authenticationState.dart';

class CupertinoAuthenticator extends StatefulWidget {
  CupertinoAuthenticator({@required this.onSignInSuccess});

  final Function onSignInSuccess;
  @override
  _CupertinoAuthenticatorState createState() => _CupertinoAuthenticatorState();
}

class _CupertinoAuthenticatorState extends State<CupertinoAuthenticator> {
  Future signUp(BuildContext context) async {
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
      setState(() {
        _loading = true;
      });
      try {
        Map<String, String> userAttributes = {
          'email': _email.trim(),
        };
        SignUpResult signUpResult = await Amplify.Auth.signUp(
          username: _username.trim(),
          password: _password,
          options: CognitoSignUpOptions(userAttributes: userAttributes),
        );
        setState(() {
          _loading = false;
          _authenticationState = AuthenticationState.confirmSignUp;
        });
      } on AuthException catch (e) {
        print(e.message);
        setState(() {
          _loading = false;
        });
      }
    }
  }

  Future signIn(BuildContext context) async {
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
      setState(() {
        _loading = true;
      });
      try {
        SignInResult signInResult = await Amplify.Auth.signIn(
          username: _username.trim(),
          password: _password,
        );
        setState(() {
          _loading = false;
        });
        if (signInResult.isSignedIn) {
          this.widget.onSignInSuccess();
        }
      } on AuthException catch (e) {
        debugPrint(e.message);
        setState(() {
          _loading = true;
        });
      }
    }
  }

  Future confirmSignUp(BuildContext context) async {
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
      setState(() {
        _loading = true;
      });
      try {
        SignUpResult signUpResult = await Amplify.Auth.confirmSignUp(
          username: _username.trim(),
          confirmationCode: _verificationCode.trim(),
        );
        if (signUpResult.isSignUpComplete) {
          this.signIn(context);
        }
        setState(() {
          _loading = false;
        });
      } on AuthException catch (e) {
        setState(() {
          _loading = true;
        });
      }
    }
  }

  bool _loading = false;
  String _username = '';
  String _email = '';
  String _password = '';
  String _verificationCode = '';
  AuthenticationState _authenticationState = AuthenticationState.signIn;
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // the Form widget is wrapped in a Material widget so that it can be used inside a non-material app
    // this is probably not common use case and is debateble if we even want to support it
    return Container(
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            if (_showUsername(_authenticationState)) ...[
              CupertinoTextFormFieldRow(
                key: Key('username-field'),
                prefix: Text('Username'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a username.';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _username = value;
                  });
                },
              ),
              SizedBox(height: 12.0),
            ],
            if (_showEmail(_authenticationState)) ...[
              CupertinoTextFormFieldRow(
                key: Key('email-field'),
                prefix: Text('Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter an email.';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _email = value;
                  });
                },
              ),
              SizedBox(height: 12.0),
            ],
            if (_showPassword(_authenticationState)) ...[
              CupertinoTextFormFieldRow(
                key: Key('password-field'),
                prefix: Text('Password'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a password.';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _password = value;
                  });
                },
                obscureText: true,
              ),
              // don't apply the spacing if the forgot password button will be displayed
              if (!_showForgotPassword(_authenticationState))
                SizedBox(height: 12.0),
            ],
            if (_showForgotPassword(_authenticationState)) ...[
              Row(
                children: [
                  Text('Forgot your password?'),
                  CupertinoButton(
                    onPressed: () {
                      setState(
                        () {
                          _authenticationState =
                              AuthenticationState.resetPassword;
                        },
                      );
                    },
                    child: Text('Reset Password'),
                  )
                ],
              ),
              SizedBox(height: 12.0),
            ],
            if (_showVerificationCode(_authenticationState)) ...[
              CupertinoTextFormFieldRow(
                key: Key('verification-code-field'),
                prefix: Text('Verification Code'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please the code that was sent to your email.';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _verificationCode = value;
                  });
                },
                obscureText: true,
              ),
              SizedBox(height: 12.0),
            ],
            Row(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildSecondaryCTA(),
                _buildPrimaryCTA(),
              ],
            )
          ],
        ),
      ),
    );
  }

  _buildPrimaryCTA() {
    switch (_authenticationState) {
      case AuthenticationState.signIn:
        return CupertinoButton.filled(
          onPressed: _loading ? null : () => signIn(context),
          child: Text('Sign In'),
        );
      case AuthenticationState.signUp:
        return CupertinoButton.filled(
          onPressed: _loading ? null : () => signUp(context),
          child: Text('Sign Up'),
        );
      case AuthenticationState.resetPassword:
        return CupertinoButton.filled(
          onPressed: _loading ? null : () => print('not implemented'),
          child: Text('Send Code'),
        );
      case AuthenticationState.confirmSignUp:
        return CupertinoButton.filled(
          onPressed: _loading ? null : () => confirmSignUp(context),
          child: Text('Confirm Code'),
        );
      default:
        // return empty container in any other case
        return Container();
    }
  }

  _buildSecondaryCTA() {
    switch (_authenticationState) {
      case AuthenticationState.signIn:
        return Row(
          key: Key('sign-up-button'),
          children: [
            Text('No Account?'),
            CupertinoButton(
              onPressed: () {
                setState(
                  () {
                    _authenticationState = AuthenticationState.signUp;
                  },
                );
              },
              child: Text('Sign Up'),
            ),
          ],
        );
      case AuthenticationState.signUp:
        return Row(
          children: [
            Text('Have an Account?'),
            CupertinoButton(
              key: Key('sign-in-button'),
              onPressed: () {
                setState(
                  () {
                    _authenticationState = AuthenticationState.signIn;
                  },
                );
              },
              child: Text('Sign In'),
            ),
          ],
        );
      case AuthenticationState.resetPassword:
        return CupertinoButton(
          // remove default material padding to left align
          // style: TextButton.styleFrom(padding: EdgeInsets.zero),
          key: Key('back-to-sign-in-button'),
          onPressed: () {
            setState(
              () {
                _authenticationState = AuthenticationState.signIn;
              },
            );
          },
          child: Text('Back to Sign In'),
        );
      default:
        // return empty container in any other case
        return Container();
    }
  }
}

_showUsername(AuthenticationState authenticationState) =>
    authenticationState == AuthenticationState.signIn ||
    authenticationState == AuthenticationState.signUp ||
    authenticationState == AuthenticationState.resetPassword;

_showEmail(AuthenticationState authenticationState) =>
    authenticationState == AuthenticationState.signUp;

_showPassword(AuthenticationState authenticationState) =>
    authenticationState == AuthenticationState.signIn ||
    authenticationState == AuthenticationState.signUp;

_showVerificationCode(AuthenticationState authenticationState) =>
    authenticationState == AuthenticationState.confirmSignUp;

_showForgotPassword(AuthenticationState authenticationState) =>
    authenticationState == AuthenticationState.signIn;
