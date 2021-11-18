# AWS Amplify Package - aws-amplify-react-native

AWS Amplify is a JavaScript library for frontend and mobile developers building cloud-enabled applications. The library is a declarative interface across different categories of operations in order to make common tasks easier to add into your application. The default implementation works with Amazon Web Services (AWS) resources but is designed to be open and pluggable for usage with other cloud services that wish to provide an implementation or custom backends.

`aws-amplify-react-native` is one of the AWS Amplify library packages, specially built for React Native App development. Documentation is available [here](https://github.com/aws-amplify/amplify-js/blob/main/README.md)

## Installation

```
yarn add aws-amplify aws-amplify-react-native
```

---

# Authenticator

## Using withAuthenticator HOC

For React Native, the simplest way to add authentication flows into your app is to use the `withAuthenticator` Higher Order Component.

`withAuthenticator` automatically detects the authentication state and updates the UI. If the user is signed in, the underlying component (typically your app's main component) is displayed otherwise signin/signup controls are displayed.

> The default implementation uses the Amplify UI styling, for an example of what that looks like out of the box on web and mobile, see <a href="https://aws-amplify.github.io/media/ui_library" target="_blank">here</a>.

Just add these two lines to your `App.js`:

```javascript
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports'; // if you are using Amplify CLI

Amplify.configure(awsconfig);

// ...

export default withAuthenticator(App);
```

Now, your app has complete flows for user sign-in and registration. Since you have wrapped your **App** with `withAuthenticator`, only signed in users can access your app. The routing for login pages and giving access to your **App** Component will be managed automatically.

`withAuthenticator` component renders your App component after a successful user signed in, and it prevents non-sign-in users to interact with your app. In this case, we need to display a _sign-out_ button to trigger the related process.

To display a sign-out button or customize other, set `includeGreetings = true` in the parameter object. It displays a _greetings section_ on top of your app, and a sign-out button is displayed in the authenticated state. Other customization options are also available as properties to the HOC:

```jsx
export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
  // Show only certain components
  authenticatorComponents: [MyComponents],
  // display federation/social provider buttons
  federated: { myFederatedConfig },
  // customize the UI/styling
  theme: { myCustomTheme },
});
```

## Using the Authenticator Component

The `withAuthenticator` HOC wraps an `Authenticator` component. Using `Authenticator` directly gives you more customization options for your UI.

```jsx
<Authenticator
  // Optionally hard-code an initial state
  authState="signIn"
  // Pass in an already authenticated CognitoUser or FederatedUser object
  authData={CognitoUser | 'username'}
  // Fired when Authentication State changes
  onStateChange={(authState) => console.log(authState)}
  // An object referencing federation and/or social providers
  // The federation here means federation with the Cognito Identity Pool Service
  // *** Only supported on React/Web (Not React Native) ***
  // For React Native use the API Auth.federatedSignIn()
  federated={myFederatedConfig}
  // A theme object to override the UI / styling
  theme={myCustomTheme}
  // Hide specific components within the Authenticator
  // *** Only supported on React/Web (Not React Native)  ***
  hide={[
    Greetings,
    SignIn,
    ConfirmSignIn,
    RequireNewPassword,
    SignUp,
    ConfirmSignUp,
    VerifyContact,
    ForgotPassword,
    TOTPSetup,
    Loading,
  ]}
  // or hide all the default components
  hideDefault={true}
  // Pass in an aws-exports configuration
  amplifyConfig={myAWSExports}
  // Pass in a message map for error strings
  errorMessage={myMessageMap}
>
  // Default components can be customized/passed in as child components. //
  Define them here if you used hideDefault={true}
  <Greetings />
  <SignIn federated={myFederatedConfig} />
  <ConfirmSignIn />
  <RequireNewPassword />
  <SignUp />
  <ConfirmSignUp />
  <VerifyContact />
  <ForgotPassword />
  <TOTPSetup />
  <Loading />
</Authenticator>
```

## Customize your own components

You can provide custom components to the `Authenticator` as child components in React and React Native.

```jsx
import { Authenticator, SignIn } from 'aws-amplify-react-native';

// The override prop tells the Authenticator that the SignUp component is not hidden but overridden
<Authenticator hideDefault={true}>
  <SignIn />
  <MyCustomSignUp override={'SignUp'} />
</Authenticator>;

class MyCustomSignUp extends Component {
  constructor() {
    super();
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn() {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signIn', {});
  }

  render() {
    return (
      <div>
        {/* only render this component when the authState is 'signUp' */}
        {this.props.authState === 'signUp' && (
          <div>
            My Custom SignUp Component
            <button onClick={this.gotoSignIn}>Goto SignIn</button>
          </div>
        )}
      </div>
    );
  }
}
```

You can render the custom component (or not) based on the injected `authState` within your component as well as jump to other states within your component.

```jsx
if (props.onStateChange) props.onStateChange(state, data);
```

> **_The withFederated and Federated components are not supported on React Native_**. Use the API Auth.federatedSignIn() on React Native.

There is also `withGoogle`, `withFacebook`, `withAmazon` components, in case you need to customize a single provider.

### Wrapping your Component

This will render your App component with _Authenticator_:

```javascript
import { Authenticator } from 'aws-amplify-react-native'; // or 'aws-amplify-react-native'
...

class AppWithAuth extends Component {
  render(){
    return (
      <Authenticator>
        <App />
      </Authenticator>
    );
  }
}

export default AppWithAuth;
```

## Show your App After Sign-in

In the previous example, you'll see the App is rendered even before the user is signed-in. To change this behavior, you can use _Authenticator_ properties. When inside `Authenticator`, the App component automatically receives those properties.

**authState** is the current authentication state (a string):

```
 - signIn
 - signUp
 - confirmSignIn
 - confirmSignUp
 - forgotPassword
 - requireNewPassword
 - verifyContact
 - signedIn
```

**authData** - additional data within authState; when the state is `signedIn`, it will return a [`CognitoUser`](https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/index.d.ts#L48) object.

Using the options above, to control the condition for _Authenticator_ to render App component, simply set `_validAuthStates` property:

```javascript
this._validAuthStates = ['signedIn'];
```

Then, in the component's constructor, implement `showComponent(theme) {}` in lieu of the typical `render() {}` method.

## SignUp

The SignUp component provides your users with the ability to sign up. It is included as part of the `Authenticator` component.

Usage:
`<Authenticator signUpConfig={ signUpConfig }/>`

It can also be used as part of the authentication HOC:
`export default withAuthenticator(App, { signUpConfig });`

The SignUp Component accepts a 'signUpConfig' object which allows you to customize it.

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-column="Attribute">header</td>
      <td data-column="Type">string</td>
      <td data-column="Description">the component header</td>
      <td data-column="Default">'Create a new account'</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">signUpFields</td>
      <td data-column="Type">array</td>
      <td data-column="Description">see below</td>
      <td data-column="Default">see below</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">defaultCountryCode</td>
      <td data-column="Type">string</td>
      <td data-column="Description">
        the preselected value in the country code dropdown
      </td>
      <td data-column="Default">'1'</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">hideAllDefaults</td>
      <td data-column="Type">boolean</td>
      <td data-column="Description">
        determines whether all default signup fields are to be hidden. This
        works in conjunction with the signUpFields attribute
      </td>
      <td data-column="Default">
        if there is no signUpFields attribute, defaults to false
      </td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">hiddenDefaults</td>
      <td data-column="Type">array</td>
      <td data-column="Description">
        determines whether particular default fields are hidden
      </td>
      <td data-column="Default">
        N/A (possible values include 'username', 'password', 'phone_number', and
        'email')
      </td>
      <td data-column="Required">no</td>
    </tr>
  </tbody>
</table>

The signUpFields array in turn consist of an array of objects, each describing a field that will appear in sign up form that your users fill out:

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Description</th>
      <th>Possible Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-column="Attribute">label</td>
      <td data-column="Type">string</td>
      <td data-column="Description">label for the input field</td>
      <td data-column="Possible Values">N/A</td>
    </tr>
    <tr>
        <td data-column="Attribute">key</td>
        <td data-column="Type">string</td>
        <td data-column="Description">key name for the attribute as defined in the User Pool</td>
        <td data-column="Possible Values">N/A</td>
    </tr>
    <tr>
        <td data-column="Attribute">required</td>
        <td data-column="Type">boolean</td>
        <td data-column="Description">whether or not the field is required</td>
        <td data-column="Possible Values">N/A</td>
    </tr>
    <tr>
        <td data-column="Attribute">displayOrder</td>
        <td data-column="Type">number</td>
        <td data-column="Description">number indicating the order in which fields will be displayed</td>
        <td data-column="Possible Values">N/A</td>
    </tr>
    <tr>
        <td data-column="Attribute">type</td>
        <td data-column="Type">string</td>
        <td data-column="Description">the type attribute for the html input element</td>
        <td data-column="Possible Values">‘string’, ‘number’, ‘password’, etc</td>
    </tr>
    <tr>
        <td data-column="Attribute">custom</td>
        <td data-column="Type">boolean</td>
        <td data-column="Description">flag which indicates whether or not the field is ‘custom’ in the User Pool</td>
        <td data-column="Possible Values">N/A</td>
    </tr>
  </tbody>
</table>

A Sample signUpFields attribute would look like the following:

```js
const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'My custom email label',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    ... // and other custom attributes
  ]
};

export default withAuthenticator(App, { signUpConfig });
```

## Sign up/in with email/phone number

If the user pool is set to allow email addresses/phone numbers as the username, you can then change the UI components accordingly by using `usernameAttributes` [(learn more about the setup)](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js).

When you are using `email` as the username:

```js
import { withAuthenticator, Authenticator } from 'aws-amplify-react';

// When using Authenticator
class App {
  // ...

  render() {
    return (
      <Authenticator usernameAttributes='email'/>
    );
  }
}

export default App;

// When using withAuthenticator
class App2 {
  // ...
}

export default withAuthenticator(App2, { usernameAttributes: 'email' });
```

When you are using `phone number` as the username:

```js
import { Authenticator, withAuthenticator } from 'aws-amplify-react';

class App {
  // ...

  render() {
    return (
      <Authenticator usernameAttributes='phone_number'/>
    );
  }
}

export default App;

// When using withAuthenticator
class App2 {
  // ...
}

export default withAuthenticator(App2, { usernameAttributes: 'phone_number' });
```

**Note:** If you are using custom signUpFields to customize the `username` field, then you need to make sure either the label of that field is the same value you set in `usernameAttributes` or the key of the field is `username`.

For example:

```js
import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);

class App extends Component {}

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'My user name',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
    {
      label: 'PhoneNumber',
      key: 'phone_number',
      required: true,
      displayOrder: 3,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 4,
      type: 'string',
    },
  ],
};
const usernameAttributes = 'My user name';

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes,
});
```

---

# API - Connect

The API category provides React Native components for working with GraphQL data using the Amplify GraphQL client.

The `<Connect/>` component is used to execute a GraphQL query or mutation. You can execute GraphQL queries by passing your queries in `query` or `mutation` attributes

## Subscription

For subscriptions, you can use the `subscription` and `onSubscriptionMsg` attributes to enable subscriptions

## Mutations

For mutations, a `mutation` function needs to be provided with the `Connect` component. A `mutation` returns a promise that resolves with the result of the GraphQL mutation.

---

# Storage

## S3 Album

`S3Album` renders a list of `S3Image` and `S3Text` objects:

![Image](/images/S3Album_and_code.png)

```jsx
import { S3Album } from 'aws-amplify-react-native';

render() {
    return <S3Album path={path} />
```

To display private objects, supply the `level` property:

```jsx
return <S3Album level="private" path={path} />;
```

To display another user's protected objects, supply that user's `identityId` property as well:

```jsx
return <S3Album level="protected" identityId={identityId} path={path} />;
```

You can use `filter` property customize the path for your album:

```jsx
return (
  <S3Album
    level="private"
    path={path}
    filter={(item) => /jpg/i.test(item.path)}
  />
);
```

**Picker**

Set `picker` property to true on `S3Album`. A `Picker` let user select photos or text files from the device. The selected files will be automatically uploaded to the `path`.

```jsx
<S3Album path={path} picker />
```

By default, photo picker saves images on S3 with filename as the key. To have custom keys, you can provide a callback:

```jsx
function fileToKey(data) {
    const { name, size, type } = data;
    return 'test_' + name;
}

...
    <S3Album path={path} picker fileToKey={fileToKey} />
```

<Callout>

`S3Album` will escape all spaces in key value to underscore. For example, 'a b' will be converted to 'a_b'.

</Callout>

## S3 Image

`S3Image` component renders an _Amazon S3 object key_ as an image:

```jsx
import { S3Image } from 'aws-amplify-react-native';

render() {
    return <S3Image imgKey={key} />
}
```

For private images, supply the `level` property:

```jsx
return <S3Image level="private" imgKey={key} />;
```

To show another user's protected image, supply that user's `identityId` property as well:

```jsx
return <S3Image level="protected" identityId={identityId} imgKey={key} />;
```

To initiate an upload, set the `body` property:

```jsx
import { S3Image } from 'aws-amplify-react';

render() {
    return <S3Image imgKey={key} body={this.state.image_body} />
}

```

To hide the image shown in the S3Image, set `hidden`:

```jsx
import { S3Image } from 'aws-amplify-react';

render() {
    return <S3Image hidden imgKey={key} />
}
```

**Image URL**

`S3Image` converts path to actual URL. To get the URL, listen to the `onLoad` event:

```jsx
<S3Image imgKey={key} onLoad={(url) => console.log(url)} />
```

**Photo Picker**

Set `picker` property to true on `S3Image`. A `PhotoPicker` let the user pick a picture from the device. After users picks an image, the image will be uploaded with `imgKey`.

```jsx
<S3Image imgKey={key} picker />
```

When you set `path`, the _key_ for the image will be the combination of `path` and image file name.

```jsx
<S3Image path={path} picker />
```

To generate a custom key value, you can provide a callback:

```jsx
function fileToKey(data) {
    const { name, size, type } = data;
    return 'test_' + name;
}

...
<S3Image path={path} picker fileToKey={fileToKey} />
```

<Callout>

`S3Image` will escape all spaces in key values to underscore. For example, 'a b' will be converted to 'a_b'.

</Callout>

## Tracking Events

You can automatically track `Storage` operations on the following React components: `S3Album`, `S3Text`, `S3Image` by providing a `track` prop:

```jsx
return <S3Album track />;
```

Enabling tracking will automatically send 'Storage' events to Amazon Pinpoint, and you will be able to see the results in AWS Pinpoint console under _Custom Events_. The event name will be _Storage_, and event details will be displayed in _attributes_ , e.g. Storage -> Method -> Put.

## Customization

### Customize Upload Path

You can customize your upload path by defining prefixes:

```javascript
const customPrefix = {
  public: 'myPublicPrefix/',
  protected: 'myProtectedPrefix/',
  private: 'myPrivatePrefix/',
};

Storage.put('test.txt', 'Hello', {
  customPrefix: customPrefix,
  // ...
})
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

For example, if you want to enable read, write and delete operation for all the objects under path _myPublicPrefix/_, declare it in your IAM policy:

```xml
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
        ],
        "Resource": [
            "arn:aws:s3:::your-s3-bucket/myPublicPrefix/*",
        ]
    }
]
```

If you want to have custom _private_ path prefix like _myPrivatePrefix/_, you need to add it into your IAM policy:

```xml
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
        ],
        "Resource": [
            "arn:aws:s3:::your-s3-bucket/myPrivatePrefix/${cognito-identity.amazonaws.com:sub}/*"
        ]
    }
]
```

This ensures only the authenticated users has the access to the objects under the path.

---

# Interactions - Chatbot

For React, the simplest way to add a conversational UI into your app is to use our _ChatBot_ Component.

ChatBot automatically renders a complete chat messaging interface that can be used out-of-the-box, or it can be customized using theming support.

## Usage

When using React Native, you can use _ChatBot_ with following properties;

```jsx
<ChatBot
  botName={botName}
  welcomeMessage={welcomeMessage}
  onComplete={this.handleComplete}
  clearOnComplete={false}
  styles={StyleSheet.create({
    itemMe: {
      color: 'red',
    },
  })}
/>
```

By default, the ChatBot will allow for only text interaction. You can turn off text interaction by passing prop `textEnabled={false}`.

### Turning on voice interaction

To support voice interaction, the React Native ChatBot component requires installation of peer dependencies and linking of Native Modules. The peer dependencies are: [react-native-voice](https://github.com/wenkesj/react-native-voice), [react-native-sound](https://github.com/zmxv/react-native-sound), and [react-native-fs](https://github.com/itinance/react-native-fs).

After installation, link the native modules by running:

```
react-native link react-native-voice
react-native link react-native-fs
react-native link react-native-sound
```

Include this import at the top of your App.js

```jsx
import voiceLibs from 'aws-amplify-react-native/dist/Interactions/ReactNativeModules';
```

Some configurations of Android will require requesting permissions while others will not - please to refer to the [Android docs](https://developer.android.com/training/permissions/requesting.html)

iOS will require permissions for `NSMicrophoneUsageDescription` and `NSSpeechRecognitionUsageDescription`- you can add this snippet to your Info.plist file for iOS:

```xml
<dict>
  ...
  <key>NSMicrophoneUsageDescription</key>
  <string>Description of why you require the use of the microphone</string>
  <key>NSSpeechRecognitionUsageDescription</key>
  <string>Description of why you require the use of the speech recognition</string>
  ...
</dict>
```

Then, turn on voice interaction by passing `voiceEnabled={true}` with `voiceLibs={voiceLibs}` to Chatbot props. Remember not to disable both voice and text input (don't set both voiceEnabled={false} and textEnabled={false})

In order for voice interaction to work with Amazon Lex, you may have to enable Output voice in the AWS Console. Under the Amazon Lex service, click on your configured Lex chatbot and go to Settings -> General and pick your desired Output voice. Then, click Build. If you have forgotten to enable Output voice, you will get an error like this:

```
ChatBot Error: Invalid Bot Configuration: This bot does not have a Polly voice ID associated with it. For voice interaction with the user, set a voice ID
```

You can also configure `silenceDelay={customTime}` where `customTime` is the silence detection time in milliseconds. The default value is 1000.

The `conversationModeOn` props turns continuous conversation cycle mode on/off for voice interaction.

Here is an example of a configured ChatBot component with voice enabled and conversation mode turned on

```jsx
<ChatBot
  botName={botName}
  welcomeMessage={welcomeMessage}
  onComplete={this.handleComplete}
  clearOnComplete={false}
  styles={StyleSheet.create({
    itemMe: {
      color: 'red',
    },
  })}
  voiceEnabled={true}
  voiceLibs={voiceLibs}
  conversationModeOn={true}
/>
```

Following simple app shows how to use **ChatBot** component in a React Native app;

```javascript
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, StatusBar } from 'react-native';
import Amplify from 'aws-amplify';
import { ChatBot } from 'aws-amplify-react-native';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
});

export default class App extends Component {
  state = {
    botName: 'BookTrip',
    welcomeMessage: 'Welcome, what would you like to do today?',
  };

  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(err, confirmation) {
    if (err) {
      Alert.alert('Error', 'Bot conversation failed', [{ text: 'OK' }]);
      return;
    }

    Alert.alert('Done', JSON.stringify(confirmation, null, 2), [
      { text: 'OK' },
    ]);

    this.setState({
      botName: 'BookTrip',
    });

    return 'Trip booked. Thank you! what would you like to do next?';
  }

  render() {
    const { botName, showChatBot, welcomeMessage } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ChatBot
          botName={botName}
          welcomeMessage={welcomeMessage}
          onComplete={this.handleComplete}
          clearOnComplete={false}
          styles={StyleSheet.create({
            itemMe: {
              color: 'red',
            },
          })}
        />
      </SafeAreaView>
    );
  }
}
```

---

# Customization

## Customize UI Theme

For React, you can create your own theme and use it to render Amplify components:

> Your custom theme must use the selectors from the following [template](https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-react/src/Amplify-UI/Amplify-UI-Theme.tsx)

```javascript
import MyTheme from './MyTheme';

<Authenticator theme={MyTheme} />;
```

Alternatively, you can change a few properties and pass in a theme object from the same file:

```javascript
const MyTheme = {
  signInButtonIcon: { display: 'none' },
  googleSignInButton: { backgroundColor: 'red', borderColor: 'red' },
};

<Authenticator theme={MyTheme} />;
```

For React Native, you must override properties defined in AmplifyTheme.js [here](https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-react-native/src/AmplifyTheme.js)

```javascript
import { AmplifyTheme } from 'aws-amplify-react-native';

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, {
  background: 'orange',
});
const MyTheme = Object.assign({}, AmplifyTheme, {
  sectionHeader: MySectionHeader,
});

<Authenticator theme={MyTheme} />;
```

### Create Your Own UI

To customize the default auth experience even more, you can create your own auth UI. To do this, your component will leverage the following _Authenticator_ properties:

```
- authState
- authData
- onStateChange
```

The following example creates an 'Always On' Auth UI, which continuously shows the current auth state in your app.

```javascript
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';

const AlwaysOn = (props) => {
    return (
        <div>
            <div>I am always here to show current auth state: {props.authState}</div>
            <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
        </div>
    )
}

handleAuthStateChange(state) {
    if (state === 'signedIn') {
        /* Do something when the user has signed-in */
    }
}

render() {
    return (
        <Authenticator hideDefault={true} onStateChange={this.handleAuthStateChange}>
            <SignIn/>
            <SignUp/>
            <ConfirmSignUp/>
            <Greetings/>
            <AlwaysOn/>
        </Authenticator>
    )
}
```
