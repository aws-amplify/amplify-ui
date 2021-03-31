import 'package:amplify_authenticator/stories/viewUserInfo.dart';
import 'package:flutter/material.dart';
import 'package:amplify_authenticator/authenticator/components/materialAuthenticator.dart';

const _primary = const Color(0xFFFAAAAA);
const _secondary = const Color(0xFF5C83C9);
const _error = const Color(0xFFC5032B);
const _surface = const Color(0xFFFFFBFA);

class MaterialCustomeStylesExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // This is an example of how the authneticator widget will inherit and use the Material ThemeData
    // Note: these themes could (and probably should) be applied app wide (provided to MaterialApp()),
    // but can also be applied locally like in this example
    ThemeData themeData = ThemeData.from(
      colorScheme: ColorScheme(
        brightness: Brightness.light,
        background: _surface,
        error: _error,
        onBackground: Colors.blueGrey,
        onError: Colors.white,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: Colors.black,
        primary: _primary,
        primaryVariant: _primary,
        secondary: _secondary,
        secondaryVariant: _secondary,
        surface: _surface,
      ),
    ).copyWith(
      textTheme: Theme.of(context).textTheme.copyWith(
            bodyText2: Theme.of(context).textTheme.bodyText2.copyWith(
                  fontSize: 18,
                ),
          ),
      inputDecorationTheme: InputDecorationTheme(
        contentPadding: EdgeInsets.all(16),
        border: OutlineInputBorder(
          borderRadius: const BorderRadius.all(
            Radius.circular(30),
          ),
          gapPadding: 0,
        ),
      ),
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
          padding: EdgeInsets.symmetric(
            horizontal: 24,
            vertical: 8,
          ),
          textStyle: TextStyle(
            fontSize: 18,
          ),
        ),
      ),
    );
    return Theme(
      data: themeData,
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Material Custom Styles',
            style: TextStyle(color: Colors.white),
          ),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: MaterialAuthenticator(
                    onSignInSuccess: () => Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ViewUserInfo(),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
