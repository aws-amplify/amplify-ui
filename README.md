# amplify_authenticator

## Set up

- Install and set up [flutter](https://flutter.dev/docs/get-started/install) and complete platform setup for iOS or Android if you have not already done so.
- [Set up your IDE](https://flutter.dev/docs/get-started/editor) for flutter development if you have not already done so.
- Run the project on an iOS simulator or Android Emulator. See info under **Run the App** in the [flutter test drive docs](https://flutter.dev/docs/get-started/test-drive?tab=androidstudio) if you are not familair with how to do this.

## Project overview

The project was created as a standard flutter app (using `flutter create`). All the cource code is under `/lib`. `/lib/authenticator` contains the authenitcator code that would be included in a package that customers would import and consume. `/lib/stories` contains the the customer use cases for an Authenticator widget. Each directory represents one use case. `main.dart` configures amplify auth and displays a list of buttons that will open the different use cases.

I have copied the code from the stories into the readme to make it easy to view. Long term, it would probably make sense to look into something like [Dashbook](https://github.com/erickzanardo/dashbook), [storybook_flutter](https://github.com/ookami-kb/storybook_flutter), or the tooling that the flutter team uses in their own component docs which takes comments from the code and turns them into live code examples.

If this were to actually be published as a package, it would probably make sense to move the code under `/lib/stories` into separate examples projects. They are included in the main project for ease of development.

## TODO

Other than continuing to support additonal customer use cases, below are some things that are not yet supported

- Forgot password flow: Sign up, confirm account, and sign in all work as expected. Forgot password
- Animations: The form doesn't have any animations. Since the form is essentialy just a list of items that get removed/added, [AnimatedList](https://api.flutter.dev/flutter/widgets/AnimatedList-class.html) could probably be used. There could be some default animations, with the ability for users to provide their own.
- Cupertino design: This is not one of the customer use cases, but it would probably be something flutter devs would want. [Cupertino](https://flutter.dev/docs/development/ui/widgets/cupertino) widgets match the design of iOS.

## Stories

Each of the code snippets below depnds on amplify being configured in the clients application. In this project, that is done in `main.dart`. The configuration could in theory be done inside the Authenticator component, but it seems more straight forward to just require the consumers to configure Amplify outside of the component.

### Basic Material Example

> A customer using Material design can import and authenticator and it will use the default material styles

See Example: [materialAuthenticatorExample.dart](./lib/stories/material/materialAuthenticatorExample.dart)

```dart
import 'package:amplify_authenticator/stories/viewUserInfo.dart';
import 'package:flutter/material.dart';
import 'package:amplify_authenticator/components/MaterialAuthenticator.dart';

class MaterialAuthenticatorExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Material Example'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: MaterialAuthenticator(
          onSignInSuccess: () => Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => ViewUserInfo(),
            ),
          ),
        ),
      ),
    );
  }
}
```

<img src="screenshots/materialExample.png" alt="Default Material Example" width="500"/>

### Custom Material Example

> A customer using Material design with a custom theme can import and authenticator and it will use the appropriate styles

See Example: [materialThemeExample.dart](./lib/stories/materialTheme/materialThemeExample.dart)

```dart
import 'package:amplify_authenticator/stories/viewUserInfo.dart';
import 'package:flutter/material.dart';
import 'package:amplify_authenticator/components/MaterialAuthenticator.dart';

class MaterialThemeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Note: This would typically be passed into the MaterialApp() widget in a real world example
    ThemeData themeData = ThemeData.from(
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
    return Theme(
      data: themeData,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Material Example'),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
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
    );
  }
}

```

<img src="screenshots/materialThemeExample.png" alt="Material Theme Example" width="500"/>
