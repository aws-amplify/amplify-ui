import 'package:flutter/material.dart';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import '../viewUserInfo.dart';

class CustomWorkflowExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final PageController controller = PageController(initialPage: 0);
    return Scaffold(
      appBar: AppBar(
        title: Text('Custom Worflow'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Theme(
          data: Theme.of(context).copyWith(
            textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(
                textStyle: TextStyle(
                  fontSize: 18,
                ),
              ),
            ),
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                padding: EdgeInsets.all(12),
                textStyle: TextStyle(
                  fontSize: 18,
                ),
              ),
            ),
          ),
          child: MaterialAuthenticatorBuilder(
            onSignInSuccess: () => Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => ViewUserInfo(),
              ),
            ),
            onStepChange: (step) {
              if (step == AuthenticatorStep.confirmSignUp) {
                controller.nextPage(
                  duration: Duration(milliseconds: 250),
                  curve: Curves.easeIn,
                );
              }
            },
            builder: (context, state) {
              return PageView(
                controller: controller,
                physics: NeverScrollableScrollPhysics(),
                children: [
                  Column(
                    children: [
                      SizedBox(height: 32),
                      Text(
                        'Welcome!',
                        style: TextStyle(fontSize: 24),
                      ),
                      SizedBox(height: 16),
                      Text(
                        'To get started creating your account, tap the button below.',
                        style: TextStyle(fontSize: 14),
                      ),
                      SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => controller.nextPage(
                          duration: Duration(milliseconds: 250),
                          curve: Curves.easeIn,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Let\'s get started'),
                            SizedBox(width: 4),
                            Icon(Icons.chevron_right)
                          ],
                        ),
                      ),
                    ],
                  ),
                  Column(
                    children: [
                      SizedBox(height: 32),
                      Text(
                        'Let\'s start with your username',
                        style: TextStyle(fontSize: 24),
                      ),
                      SizedBox(height: 16),
                      UsernameFormField(),
                      SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: state.usernameFormFieldState.value.isEmpty
                            ? null
                            : () => controller.nextPage(
                                  duration: Duration(milliseconds: 250),
                                  curve: Curves.easeIn,
                                ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Continue'),
                            SizedBox(width: 4),
                            Icon(Icons.chevron_right)
                          ],
                        ),
                      ),
                      previousPageButton(controller),
                    ],
                  ),
                  Column(
                    children: [
                      SizedBox(height: 32),
                      Text(
                        'What email would you like to use?',
                        style: TextStyle(fontSize: 24),
                      ),
                      SizedBox(height: 16),
                      EmailFormField(),
                      SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: state.emailFormFieldState.value.isEmpty ||
                                !RegExp(r'^\S+@+\S+\.+\S+$')
                                    .hasMatch(state.emailFormFieldState.value)
                            ? null
                            : () => controller.nextPage(
                                  duration: Duration(milliseconds: 250),
                                  curve: Curves.easeIn,
                                ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Continue'),
                            SizedBox(width: 4),
                            Icon(Icons.chevron_right)
                          ],
                        ),
                      ),
                      previousPageButton(controller),
                    ],
                  ),
                  Column(
                    children: [
                      SizedBox(height: 32),
                      Text(
                        'Create a password',
                        style: TextStyle(fontSize: 24),
                      ),
                      SizedBox(height: 16),
                      PasswordFormField(),
                      SizedBox(height: 16),
                      SignUpButton(
                        disabled: state.passwordFormFieldState.value.isEmpty ||
                            state.passwordFormFieldState.value.length < 6,
                      ),
                      previousPageButton(controller),
                    ],
                  ),
                  Column(
                    children: [
                      SizedBox(height: 32),
                      Text(
                        'Verification Code',
                        style: TextStyle(fontSize: 24),
                      ),
                      SizedBox(height: 16),
                      VerificationCodeFormField(),
                      SizedBox(height: 16),
                      ConfirmVerificationCodeButton(),
                    ],
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }

  TextButton previousPageButton(PageController controller) {
    return TextButton(
      onPressed: () => controller.previousPage(
        duration: Duration(milliseconds: 250),
        curve: Curves.easeIn,
      ),
      child: Text('Previous'),
    );
  }
}
