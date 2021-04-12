import 'package:flutter/material.dart';
import 'package:amplify_authenticator/authenticator/components/materialAuthenticator.dart';
import '../viewUserInfo.dart';

class MaterialThemeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Note: This would typically be passed into the MaterialApp() widget in a real world example
    ThemeData themeData = _createCustomTheme();
    return Theme(
      data: themeData,
      child: MaterialAuthenticator(
        child: ViewUserInfo(),
      ),
    );
  }

  ThemeData _createCustomTheme() {
    return ThemeData.from(
      colorScheme: ColorScheme(
        brightness: Brightness.light,
        background: Colors.white,
        error: Colors.red,
        onBackground: Colors.blueGrey,
        onError: Colors.white,
        onPrimary: Colors.white,
        onSecondary: Colors.black,
        onSurface: Colors.black,
        primary: Colors.orange,
        primaryVariant: Colors.orange[700],
        secondary: Colors.yellow,
        secondaryVariant: Colors.yellow[700],
        surface: Colors.white,
      ),
    );
  }
}
