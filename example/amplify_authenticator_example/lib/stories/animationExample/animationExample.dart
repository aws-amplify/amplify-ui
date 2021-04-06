import 'dart:math';

import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import 'package:amplify_authenticator/authenticator/components/materialAuthenticator.dart';
import '../viewUserInfo.dart';

class AnimationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Animation Example'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        // MaterialAuthenticatorBuilder is used instead of MaterialAuthenticator in this example to
        // create a custom transition between each view in the authencation flow
        child: MaterialAuthenticatorBuilder(
          onSignInSuccess: () => Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => ViewUserInfo(),
            ),
          ),
          builder: (context, state) {
            Widget child = MaterialSignInView();
            Key childKey = Key('sign-in-view');
            if (state.isSignUp) {
              child = MaterialSignUpView();
              childKey = Key('sign-up-view');
            }
            if (state.isConfirmSignUp) {
              child = MaterialConfirmSignUpView();
              childKey = Key('confirm-sign-up-view');
            }
            if (state.isResetPassword) {
              child = MaterialForgotPasswordView();
              childKey = Key('forgot-password-view');
            }
            return AnimatedSwitcher(
              duration: Duration(milliseconds: 600),
              transitionBuilder: (widget, animation) => __transitionBuilder(
                widget,
                animation,
                childKey,
              ),
              layoutBuilder: (widget, list) => Stack(
                children: [widget, ...list],
              ),
              child: Card(
                key: childKey,
                color: Colors.indigo[50],
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Container(
                    height: 500,
                    child: child,
                  ),
                ),
              ),
              switchInCurve: Curves.easeIn,
              switchOutCurve: Curves.easeIn.flipped,
            );
          },
        ),
      ),
    );
  }
}

Widget __transitionBuilder(
  Widget widget,
  Animation<double> animation,
  Key key,
) {
  final flipAnimation = Tween(begin: pi, end: 0.0).animate(animation);
  return AnimatedBuilder(
    animation: flipAnimation,
    child: widget,
    builder: (context, widget) {
      final bool isUnder = key != widget.key;
      double tilt = ((animation.value - 0.5).abs() - 0.5) * 0.003;
      tilt *= isUnder ? -1.0 : 1.0;
      final double value =
          isUnder ? min(flipAnimation.value, pi / 2) : flipAnimation.value;
      return Transform(
        transform: Matrix4.rotationY(value)..setEntry(3, 0, tilt),
        child: widget,
        alignment: Alignment.center,
      );
    },
  );
}
