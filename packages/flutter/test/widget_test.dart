import 'package:amplify_authenticator/authenticator/components/material/sign_in_view.dart';
import 'package:amplify_authenticator/authenticator/components/material/sign_up_view.dart';
import 'package:amplify_authenticator/authenticator/components/materialAuthenticator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('MaterialAuthenticator smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: MaterialAuthenticator(
          onSignInSuccess: () => print('success'),
        ),
      ),
    ));

    // Verify that MaterialSignInView is visible by defaul & MaterialSignUpView is not
    expect(find.byType(MaterialSignInView), findsOneWidget);
    expect(find.byType(MaterialSignUpView), findsNothing);
  });
}
