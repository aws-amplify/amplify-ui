import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/material.dart';

class ViewUserInfo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Container(),
        title: Text('User Info'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: FutureBuilder(
          future: Amplify.Auth.getCurrentUser(),
          builder: (BuildContext context, AsyncSnapshot<AuthUser> snapshot) {
            if (snapshot.hasError) {
              return Center(
                child: Text(
                    'There was an error fetching the user. Maybe the user is not logged in?'),
              );
            }
            if (snapshot.hasData) {
              return Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(height: 16),
                    Text(
                      'Username: ' + snapshot.data.username,
                      style: Theme.of(context).textTheme.headline5,
                    ),
                    SizedBox(height: 16),
                    ElevatedButton(
                        onPressed: () {
                          return Amplify.Auth.signOut().then((value) {
                            Navigator.of(context).pop();
                          });
                        },
                        child: Text('Sign Out'))
                  ],
                ),
              );
            }
            return Center(
              child: CircularProgressIndicator(),
            );
          },
        ),
      ),
    );
  }
}
