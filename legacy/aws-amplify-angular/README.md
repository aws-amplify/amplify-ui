# AWS Amplify Package - aws-amplify-angular

AWS Amplify is a JavaScript library for frontend and mobile developers building cloud-enabled applications. The library is a declarative interface across different categories of operations in order to make common tasks easier to add into your application. The default implementation works with Amazon Web Services (AWS) resources but is designed to be open and pluggable for usage with other cloud services that wish to provide an implementation or custom backends.

`aws-amplify-angular` is one of the AWS Amplify library packages, provide building blocks for Angular App development. Documentation is available [here](https://aws-amplify.github.io/docs/js/angular)

The `aws-amplify-angular` package is a set of Angular components and an Angular provider which helps integrate your application with the AWS-Amplify library. It supports Angular 5.0 and above.

<Callout>

Angular 9 is not supported in the legacy version of the Angular UI Components. If you app in using Angular 9, please see our new [Angular UI Component package](https://docs.amplify.aws/ui/q/framework/angular).

</Callout>

## Installation

Install `aws-amplify` and `aws-amplify-angular` npm packages into your Angular app.

```bash
npm install aws-amplify aws-amplify-angular
```

### Angular 6-8 Support

Currently, the newest versions of Angular (6+) do not include shims for 'global' or 'process' which were provided in previous versions. Add the following to your `polyfills.ts` file to recreate them:

```javascript
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

Please also note that the AWS Amplify Angular components do not yet support Ivy.

### Setup

Create a backend configuration with the Amplify CLI and import the generated configuration file.

In this example we will enable Authentication with Amazon Cognito User Pools as well as Amazon S3 Storage. This will create an `aws-exports.js` configuration file under your projects `src` directory.

Ensure you have installed and configured the [Amplify CLI](https://docs.amplify.aws/cli/start/install)

```bash
amplify init
amplify add auth
amplify add storage
amplify push
```

Visit the [Authentication Guide](https://docs.amplify.aws/lib/auth/getting-started) and [Storage Guide](https://docs.amplify.aws/lib/storage/getting-started) to learn more about enabling and configuring these categories.

After creating your backend a configuration file will be generated in your configured source directory you identified in the `amplify init` command.

When working with underlying `aws-js-sdk`, the "node" package should be included in _types_ compiler option. update your `src/tsconfig.app.json`:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

## Importing the Amplify Angular Module and the Amplify Provider

The 'aws-amplify-angular' package allows you to access the Amplify JS library as an Angular provider. You have two options to choose from:

1. Configure the provider with the entire Amplify JS library
2. Configure the provider with only select Amplify JS library.

Option 1 is appropriate when you plan to use every Amplify JS module or if you are not concerned about bundle size. Option 2 is appropriate when bundle size is a concern.

### Option 1: Configuring the Amplify provider with every Amplify JS module

Import the configuration file and load it in `main.ts`:

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts` import the Amplify Module and Service:

```javascript
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

@NgModule({
  ...
  imports: [
    ...
    AmplifyAngularModule
  ],
  ...
  providers: [
    ...
    AmplifyService
  ]
  ...
});
```

### Option 2: Configuring the Amplify provider with specified Amplify JS modules

Import the configuration file and load it in `main.ts`:

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts` import the Amplify Module, Service, and Amplify Modules helper. Additionally, import the amplify modules that you want to access via your Amplify provider.

These modules will then be passed into the AmplifyModules helper.

```javascript
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import { Auth, Interactions, Storage } from 'aws-amplify';

@NgModule({
  ...
  imports: [
    ...
    AmplifyAngularModule
  ],
  ...
    providers: [
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth,
          Storage,
          Interactions
        });
      }
    }
  ],
  ...
});
```

## Using Amplify Service

The `AmplifyService` provides AWS Amplify core categories and authentication state through dependency injection and observers.

### Using Dependency Injection

To use _AmplifyService_ with [dependency injection](https://angular.io/guide/dependency-injection-in-action), inject it into the constructor of any component or service anywhere in your application.

```javascript
import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor( private amplifyService: AmplifyService ) {}

}
```

### Using Categories

You can access Categories via the built-in service provider:

```javascript
import { Component } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private amplifyService:AmplifyService ) {

      /** now you can access category APIs:
       * this.amplifyService.auth();          // AWS Amplify Auth
       * this.amplifyService.analytics();     // AWS Amplify Analytics
       * this.amplifyService.storage();       // AWS Amplify Storage
       * this.amplifyService.api();           // AWS Amplify API
       * this.amplifyService.cache();         // AWS Amplify Cache
       * this.amplifyService.pubsub();        // AWS Amplify PubSub
       **/
  }

}
```

## Styles

To use the aws-amplify-angular components you will need to install '@aws-amplify/ui'.

Add the following to your styles.css file to use the default styles:
`@import '~aws-amplify-angular/Theme.css';`

You can use custom styling for components by importing your custom _styles.css_ that overrides the <a href="https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-angular/theme.css" target="_blank">default styles</a>.

---

# Authenticator

AWS Amplifies provides UI components that you can use in your view templates.

The Authenticator component creates an drop-in user authentication experience. Add the `amplify-authenticator` component to your `app.component.html` view:

```html
<amplify-authenticator></amplify-authenticator>
```

### SignUp Configuration

The SignUp component provides your users with the ability to sign up. It is included as part of the `authenticator` component, but can also be used in isolation:

Usage:
`<amplify-auth-sign-up [signUpConfig]="signUpConfig"></amplify-auth-sign-up>`
or
`<amplify-authenticator [signUpConfig]="signUpConfig"></amplify-authenticator>`

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
        <td data-column="Default">'Confirm Sign Up'</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
          <td data-column="Attribute">username</td>
          <td data-column="Type">string</td>
          <td data-column="Description">the username of the user who is signing up</td>
          <td data-column="Default">''</td>
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

The following example will replace all the default sign up fields with the ones defined in the `signUpFields` array.
In `app.component.ts`:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
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
        label: 'Phone Number',
        key: 'phone_number',
        required: true,
        displayOrder: 3,
        type: 'string',
      },
      {
        label: 'Custom Attribute',
        key: 'custom_attr',
        required: false,
        displayOrder: 4,
        type: 'string',
        custom: true,
      },
    ],
  };
}
```

In `app.component.html`:

```html
<amplify-authenticator [signUpConfig]="signUpConfig"></amplify-authenticator>
```

### Sign up/in with email/phone number

If the user pool is set to allow email addresses/phone numbers as the username, you can then change the UI components accordingly by using `usernameAttributes`.

In `app.component.ts`:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  usernameAttributes = 'email';
}
```

In `app.component.html`:
`<amplify-authenticator [usernameAttributes]="usernameAttributes"></amplify-authenticator>`

The `usernameAttributes` should be either `email` or `phone_number` based on your user pool setting.

Note: if you are using custom signUpFields to customize the `username` field, then you need to make sure either the label of that field is the same value you set in `usernameAttributes` or the key of the field is `username`.

For example:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  usernameAttributes: 'My user name',
  signUpConfig = {
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
        type: 'password'
      },
      {
        label: 'PhoneNumber',
        key: 'phone_number',
        required: true,
        displayOrder: 3,
        type: 'string'
      },
      {
        label: 'Custom Attribute',
        key: 'custom_attr',
        required: false,
        displayOrder: 4,
        type: 'string',
        custom: true
      }
    ]
  }
```

---

### Replacing Authentication Components With Custom Components

The child components displayed within the Authenticator can be hidden or replaced with custom components.

Usage:
`<amplify-authenticator [hide]="['Greetings']"></amplify-authenticator>`

#### Using Authentication Components Without the Authenticator

The child components displayed within the Authenticator can be used as standalone components. This could be useful in situations where, for example, you want to display your own components for specific pieces of the registration and authentication flow.

These components include:

```javascript
<amplify-auth-confirm-sign-in>
<amplify-auth-confirm-sign-up>
<amplify-auth-forgot-password>
<amplify-auth-greetings>
<amplify-auth-require-new-password>
<amplify-auth-sign-in>
<amplify-auth-sign-up>
```

Each of these components expects to receive the authState object, which consists of a 'state' string and a 'user' object. The authState is an observable managed by the amplifyService, so make sure that your own custom components set the authState appropriately.

Example:

```javascript
this.amplifyService.setAuthState({ state: 'confirmSignIn', user });
```

---

# Storage

## Photo Picker

The Photo Picker component will render a file upload control that will allow choosing a local image and uploading it to Amazon S3. Once an image is selected, a base64 encoded image preview will be displayed automatically. To render photo picker in an Angular view, use _amplify-photo-picker_ component:

```html
<amplify-photo-picker
  path="pics"
  (picked)="onImagePicked($event)"
  (loaded)="onImageLoaded($event)"
>
</amplify-photo-picker>
```

- `(picked)` - Emitted when an image is selected. The event will contain the `File` object which can be used for upload.
- `(loaded)` - Emitted when an image preview has been rendered and displayed.
- `path` - An optional S3 image path (prefix).
- `storageOptions` - An object passed within the ‘options’ property in the Storage.put request. This can be used to set the permissions ‘level’ property of the objects being uploaded i.e. ‘private’, ‘protected’, or ‘public’.

[Learn more about S3 permissions.](/lib/storage/configureaccess)

## S3 Album

The Album component will display a list of images from the configured S3 Storage bucket. Use the _amplify-s3-album_ component in your Angular view:

```html
<amplify-s3-album path="pics" (selected)="onAlbumImageSelected($event)">
</amplify-s3-album>
```

- `options` - object which is passed as the 'options' parameter to the .get request. This can be used to set the 'level' of the objects being requested (i.e. 'protected', 'private', or 'public')
- `(selected)` - event used to retrieve the S3 signed URL of the clicked image:

```javascript
onAlbumImageSelected( event ) {
      window.open( event, '_blank' );
}
```

---

# Interactions

## Chatbot

The `amplify-interactions` component provides you with a drop-in Chat component that supports seven properties:

1. `bot`: The name of the Amazon Lex Chatbot

2. `clearComplete`: Indicates whether or not the messages should be cleared at the
   end of the conversation.

3. `complete`: Dispatched when the conversation is completed.
4. `voiceConfig`: If needed, you can also pass `voiceConfig` from your app component to modify the silence detection parameters, like in this example:

```js
customVoiceConfig = {
  silenceDetectionConfig: {
    time: 2000,
    amplitude: 0.2,
  },
};
```

5. `voiceEnabled`: Enables voice user input. Defaults to `false`

Note: In order for voice input to work with Amazon Lex, you may have to enable Output voice in the AWS Console. Under the Amazon Lex service, click on your configured Lex chatbot and go to Settings -> General and pick your desired Output voice. Then, click Build. If you have forgotten to enable Output voice, you will get an error like this:

```
ChatBot Error: Invalid Bot Configuration: This bot does not have a Polly voice ID associated with it. For voice interaction with the user, set a voice ID
```

6. `textEnabled`: Enables text user input Defaults to `true`
7. `conversationModeOn`: Turns voice conversation mode on/off. Defaults to `off`

```html
<amplify-interactions
  bot="yourBotName"
  clearComplete="true"
  (complete)="onBotComplete($event)"
  [conversationModeOn]="false"
  [voiceConfig]="{customVoiceConfig}"
  [voiceEnabled]="true"
  [textEnabled]="true"
>
</amplify-interactions>
```

See the [Interactions documentation](/lib/interactions/getting-started) for information on creating an Amazon Lex Chatbot.

---

# XR

## Sumerian Scene

The `amplify-sumerian-scene` component provides you with a prebuilt UI for loading and displaying Amazon Sumerian scenes inside of your website:

<Callout>

Note: The UI component will inherit the height and width of the direct parent DOM element. Make sure to set the width and height styling on the parent DOM element to your desired size.

</Callout>
<br/>

```javascript
// sceneName: the configured friendly scene you would like to load
<amplify-sumerian-scene sceneName="scene1"></amplify-sumerian-scene>
```

See the [XR documentation](/lib/xr/getting-started) for information on creating and publishing a Sumerian scene.
