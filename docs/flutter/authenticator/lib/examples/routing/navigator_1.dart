import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    // configure amplify
  }

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      child: MaterialApp(
        initialRoute: '/',
        routes: {
          '/': (BuildContext context) {
            return const Center(child: Text('Home'));
          },
          '/profile': (BuildContext context) {
            return const AuthenticatedView(
              child: Center(child: Text('Profile')),
            );
          },
        },
      ),
    );
  }
}
