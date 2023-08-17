import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

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

  static final _router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (BuildContext _, GoRouterState __) {
          return const Center(child: Text('Home'));
        },
      ),
      GoRoute(
        path: '/profile',
        builder: (BuildContext _, GoRouterState __) {
          return const AuthenticatedView(child: Center(child: Text('Profile')));
        },
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      child: MaterialApp.router(
        routerConfig: _router,
      ),
    );
  }
}
