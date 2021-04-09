import 'dart:math';

import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import 'package:amplify_authenticator/authenticator/components/materialAuthenticator.dart';
import '../viewUserInfo.dart';

class AnimationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: MaterialAuthenticatorBuilder(
        builder: (context, state) {
          Map<bool, Widget> stepViewMap = {
            state.isSignIn: MaterialSignInView(),
            state.isSignUp: MaterialSignUpView(),
            state.isConfirmSignUp: MaterialConfirmSignUpView(),
            state.isResetPassword: MaterialForgotPasswordView(),
            state.isAuthenticated: ViewUserInfo(),
          };
          return AnimatedSwitcher(
            duration: Duration(milliseconds: 600),
            transitionBuilder: (widget, animation) => __transitionBuilder(
              widget,
              animation,
              Key(state.current),
            ),
            layoutBuilder: (widget, list) => Stack(
              children: [widget, ...list],
            ),
            child: Container(
              key: Key(state.current),
              child: stepViewMap[true],
            ),
            switchInCurve: Curves.easeIn,
            switchOutCurve: Curves.easeIn.flipped,
          );
        },
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
