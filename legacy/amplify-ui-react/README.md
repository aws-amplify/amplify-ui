# Amplify UI React

Amplify UI Components is an open-source UI toolkit that encapsulates cloud-connected workflows inside of cross-framework UI components.

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

# Authenticator

A simple way to add authentication flows into your app is to use the Authenticator component. The Authenticator component encapsulates an authentication workflow in the framework of your choice and is backed by the cloud resources set up in your Auth cloud resources.

## Usage

### Basic Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyAuthenticator>
    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>
);
```

### Recommended Usage

In most cases you will need to manage the rendering and layout of the Authenticator separately.

JavaScript:

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default AuthStateApp;
```

Typescript:

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const AuthStateApp: React.FunctionComponent = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
      </div>
  ) : (
      <AmplifyAuthenticator />
  );
}

export default AuthStateApp;
```

To enable browser password manager, wrap the Authenticator component with an `AmplifyAuthContainer`.

```jsx
import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
} from '@aws-amplify/ui-react';

<AmplifyAuthContainer>
  <AmplifyAuthenticator />
</AmplifyAuthContainer>;
```

## Properties

`amplify-authenticator` provides the following properties to configure the component.

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">federated</div></th></tr></thead><tbody><tr><th>Description</th><td>Federated credentials &amp; configuration.</td></tr><tr><th>Type</th><td>FederatedConfig</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Callback for Authenticator state machine changes</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>() =&gt; {}</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">hideToast</div></th></tr></thead><tbody><tr><th>Attribute</th><td>hide-toast</td></tr><tr><th>Description</th><td>Hide amplify-toast for auth errors</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>false</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">initialAuthState</div></th></tr></thead><tbody><tr><th>Attribute</th><td>initial-auth-state</td></tr><tr><th>Description</th><td>Initial starting state of the Authenticator component. E.g. If `signup` is passed the default component is set to AmplifySignUp</td></tr><tr><th>Type</th><td>AuthState.ForgotPassword | AuthState.SignIn | AuthState.SignUp</td></tr><tr><th>Default</th><td>AuthState.SignIn</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">usernameAlias</div></th></tr></thead><tbody><tr><th>Attribute</th><td>username-alias</td></tr><tr><th>Description</th><td>Username Alias is used to setup authentication with `username`, `email` or `phone_number`</td></tr><tr><th>Type</th><td>"email" | "phone_number" | "username"</td></tr></tbody></table>

## Slots

`amplify-authenticator` provides the following slots based off of the Web Components slot element.

<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>confirm-sign-in</code></td><td>Content placed inside of the confirm sign in workflow for when a user needs to confirm the account they signed in with</td></tr><tr><td><code>confirm-sign-up</code></td><td>Content placed inside of the confirm sign up workflow for when a user needs to confirm the account they signed up with</td></tr><tr><td><code>forgot-password</code></td><td>Content placed inside of the forgot password workflow for when a user wants to reset their password</td></tr><tr><td><code>greetings</code></td><td>Content placed inside of the greetings navigation for when a user is signed in</td></tr><tr><td><code>loading</code></td><td>Content placed inside of the loading workflow for when the app is loading</td></tr><tr><td><code>require-new-password</code></td><td>Content placed inside of the require new password workflow for when a user is required to update their password</td></tr><tr><td><code>sign-in</code></td><td>Content placed inside of the sign in workflow for when a user wants to sign into their account</td></tr><tr><td><code>sign-up</code></td><td>Content placed inside of the sign up workflow for when a user wants to register a new account</td></tr><tr><td><code>totp-setup</code></td><td>Content placed inside of the totp-setup workflow for when a user opts to use TOTP MFA</td></tr><tr><td><code>verify-contact</code></td><td>Content placed inside of the verify-contact workflow for when a user must verify their contact information</td></tr></tbody></table>

## Custom CSS Properties

`amplify-authenticator` provides the following css properties to modify the style at component level.

<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--background-color</code></td><td>Background color of the container</td></tr><tr><td><code>--border-radius</code></td><td>Border radius of the container</td></tr><tr><td><code>--box-shadow</code></td><td>Bow shadow of the container</td></tr><tr><td><code>--container-align</code></td><td>`align-items` property of a flex container</td></tr><tr><td><code>--container-display</code></td><td>Display option of the container. Defaults to flex.</td></tr><tr><td><code>--container-height</code></td><td>Height of the container. Defaults to 100vh.</td></tr><tr><td><code>--container-justify</code></td><td>`justify-content` property of a flex container</td></tr><tr><td><code>--margin-bottom</code></td><td>Margin below the component</td></tr><tr><td><code>--min-width</code></td><td>Minimum width of the container</td></tr><tr><td><code>--padding</code></td><td>Padding within the component</td></tr><tr><td><code>--width</code></td><td>Width of the container</td></tr></tbody></table>

## Customization

### Custom Form Fields

If you'd like to customize the form fields in the Authenticator Sign In or Sign Up component, you can do so by using the `formFields` property.

The following example highlights the use of Authenticator with customized Sign Up form fields and [authentication with email](#authenticate-with-email-or-phone-number):

```jsx
import React from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from '@aws-amplify/ui-react';

const App = () => {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: 'email',
            label: 'Custom Email Label',
            placeholder: 'Custom email placeholder',
            inputProps: { required: true, autocomplete: 'username' },
          },
          {
            type: 'password',
            label: 'Custom Password Label',
            placeholder: 'Custom password placeholder',
            inputProps: { required: true, autocomplete: 'new-password' },
          },
          {
            type: 'phone_number',
            label: 'Custom Phone Label',
            placeholder: 'Custom phone placeholder',
          },
        ]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  );
};
```

Here is an example of the component in use:

If you are using the `usernameAlias` prop with custom `slots`, keep in mind that you must pass the `usernameAlias` prop value to both the Authenticator and custom slotted component since the slotted component overrides the configuration passed from the Authenticator.

For more details on this customization see the `amplify-form-field` [prop documentation](https://github.com/aws-amplify/amplify-js/tree/main/packages/amplify-ui-components/src/components/amplify-form-field#properties) and the internal [`FormFieldType` interface](https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/components/amplify-auth-fields/amplify-auth-fields-interface.ts#L3).

### Hiding form fields

Often you will not need a default form field, for example the phone number field. To implement this you can define the array of fields you'd like to show (along with the optional field customizations).

In this example we are also managing the auth state to show and hide the Authenticator component based on the authenticated state of the user. This code will also persist the user sign in state on refresh.

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: 'username' },
          { type: 'password' },
          { type: 'email' },
        ]}
      />
    </AmplifyAuthenticator>
  );
};

export default AuthStateApp;
```

### Managing Layout with CSS

Since the UI components are implemented using web components, you can control the top level `amplify-authenticator` component directly using CSS.

```css
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
```

## Components

### Sign In

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifySignIn
    headerText="My Custom Sign In Text"
    slot="sign-in"
  ></AmplifySignIn>
</AmplifyAuthenticator>
```

Properties

amplify-sign-in provides the following properties to configure the component.

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">federated</div></th></tr></thead><tbody><tr><th>Description</th><td>Federated credentials &amp; configuration.</td></tr><tr><th>Type</th><td>FederatedConfig</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">formFields</div></th></tr></thead><tbody><tr><th>Description</th><td>Form fields allows you to utilize our pre-built components such as username field, code field, password field, email field, etc.
by passing an array of strings that you would like the order of the form to be in. If you need more customization, such as changing
text for a label or adjust a placeholder, you can follow the structure below in order to do just that.
```
[
  {
    type: string,
    label: string,
    placeholder: string,
    hint: string | Functional Component | null,
    required: boolean
  }
]
```</td></tr><tr><th>Type</th><td>FormFieldTypes | string[]</td></tr><tr><th>Default</th><td>[]</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSubmit</div></th></tr></thead><tbody><tr><th>Description</th><td>Fires when sign in form is submitted</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt; this.signIn(event)</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>Used for header text in sign in component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_IN_HEADER_TEXT</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">hideSignUp</div></th></tr></thead><tbody><tr><th>Attribute</th><td>hide-sign-up</td></tr><tr><th>Description</th><td>Hides the sign up link</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>false</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">submitButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>submit-button-text</td></tr><tr><th>Description</th><td>Used for the submit button text in sign in component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_IN_ACTION</td></tr></tbody></table>

<table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">usernameAlias</div></th></tr></thead><tbody><tr><th>Attribute</th><td>username-alias</td></tr><tr><th>Description</th><td>Username Alias is used to setup authentication with `username`, `email` or `phone_number`</td></tr><tr><th>Type</th><td>"email" | "phone_number" | "username"</td></tr><tr><th>Default</th><td>'username'</td></tr></tbody></table>

### Custom CSS Properties

`amplify-sign-in` provides the following css properties to modify the style at component level.

<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--footer-color</code></td><td>Font color of the footer</td></tr><tr><td><code>--footer-font-family</code></td><td>Font family of the footer</td></tr><tr><td><code>--footer-font-size</code></td><td>Font size of the footer</td></tr><tr><td><code>--footer-weight</code></td><td>Font weight of the footer</td></tr></tbody></table>

### Slots

`amplify-sign-in` provides the following slots based off of the Web Components slot element.

<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>federated-buttons</code></td><td>Content above form fields used for sign in federation buttons</td></tr><tr><td><code>footer</code></td><td>Content is place in the footer of the component</td></tr><tr><td><code>header-subtitle</code></td><td>Subtitle content placed below header text</td></tr><tr><td><code>primary-footer-content</code></td><td>Content placed on the right side of the footer</td></tr><tr><td><code>secondary-footer-content</code></td><td>Content placed on the left side of the footer</td></tr></tbody></table>

### Sign Up

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifySignUp
    headerText="My Custom Sign Up Text"
    slot="sign-up"
  ></AmplifySignUp>
</AmplifyAuthenticator>
```

#### Properties

amplify-sign-up provides the following properties to configure the component.

<div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">formFields</div></th></tr></thead><tbody><tr><th>Description</th><td>Form fields allows you to utilize our pre-built components such as username field, code field, password field, email field, etc.
by passing an array of strings that you would like the order of the form to be in. If you need more customization, such as changing
text for a label or adjust a placeholder, you can follow the structure below in order to do just that.
```
[
  {
    type: string,
    label: string,
    placeholder: string,
    hint: string | Functional Component | null,
    required: boolean
  }
]
```</td></tr><tr><th>Type</th><td>FormFieldTypes | string[]</td></tr><tr><th>Default</th><td>[]</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component
e.g. SignIn -&gt; 'Create Account' link -&gt; SignUp</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSignUp</div></th></tr></thead><tbody><tr><th>Description</th><td>Override for handling the Auth.SignUp API call</td></tr><tr><th>Type</th><td>(params: SignUpParams) =&gt; Promise&lt;ISignUpResult&gt;</td></tr><tr><th>Default</th><td>params =&gt; this.authSignUp(params)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSubmit</div></th></tr></thead><tbody><tr><th>Description</th><td>Fires when sign up form is submitted</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt; this.signUp(event)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">haveAccountText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>have-account-text</td></tr><tr><th>Description</th><td>Used for the submit button text in sign up component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_UP_HAVE_ACCOUNT_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>Used for header text in sign up component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_UP_HEADER_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">signInText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>sign-in-text</td></tr><tr><th>Description</th><td>Text used for the sign in hyperlink</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_IN_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">submitButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>submit-button-text</td></tr><tr><th>Description</th><td>Used for the submit button text in sign up component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_UP_SUBMIT_BUTTON_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">usernameAlias</div></th></tr></thead><tbody><tr><th>Attribute</th><td>username-alias</td></tr><tr><th>Description</th><td>Username Alias is used to setup authentication with `username`, `email` or `phone_number`</td></tr><tr><th>Type</th><td>"email" | "phone_number" | "username"</td></tr><tr><th>Default</th><td>'username'</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">validationErrors</div></th></tr></thead><tbody><tr><th>Attribute</th><td>validation-errors</td></tr><tr><th>Description</th><td>Engages when invalid actions occur, such as missing field, etc.</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div>

#### Custom CSS Properties

`amplify-sign-up` provides the following <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" rel="noopener noreferrer" target="_blank">css properties</a> to modify the style at component level.

<div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--footer-color</code></td><td>Font color of the footer</td></tr><tr><td><code>--footer-font-family</code></td><td>Font family of the footer</td></tr><tr><td><code>--footer-font-size</code></td><td>Font size of the footer</td></tr><tr><td><code>--footer-weight</code></td><td>Font weight of the footer</td></tr></tbody></table></div>

####Slots

`amplify-sign-up` provides the following slots based off of the Web Components slot element.

<div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>footer</code></td><td>Content placed in the footer of the component</td></tr><tr><td><code>header-subtitle</code></td><td>Subtitle content placed below header text</td></tr><tr><td><code>primary-footer-content</code></td><td>Content placed on the right side of the footer</td></tr><tr><td><code>secondary-footer-content</code></td><td>Content placed on the left side of the footer</td></tr></tbody></table></div>

### Sign Out

**Usage**

```jsx
<div>
  My App
  <AmplifySignOut buttonText="Custom Text"></AmplifySignOut>
</div>
```

<div><h4>Properties</h4><p><code>amplify-sign-out</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">buttonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>button-text</td></tr><tr><th>Description</th><td>Text inside of the Sign Out button</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_OUT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div></div>

<div><h4>Slots</h4><p><code>amplify-sign-out</code>&nbsp;provides the following slots based off of the&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot" rel="noopener noreferrer" target="_blank">Web Components slot</a>&nbsp;element.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>sign-out</code></td><td>The sign out button element</td></tr></tbody></table></div></div>

### Confirm Sign In

**Usage**

<FilterContent framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyConfirmSignIn
    headerText="My Custom Confirm Sign In Text"
    slot="confirm-sign-in"
  ></AmplifyConfirmSignIn>
</AmplifyAuthenticator>
```

<div><h4>Properties</h4><p><code>amplify-confirm-sign-in</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">formFields</div></th></tr></thead><tbody><tr><th>Description</th><td>Form fields allows you to utilize our pre-built components such as username field, code field, password field, email field, etc.
by passing an array of strings that you would like the order of the form to be in. If you need more customization, such as changing
text for a label or adjust a placeholder, you can follow the structure below in order to do just that.
```
[
  {
    type: string,
    label: string,
    placeholder: string,
    hint: string | Functional Component | null,
    required: boolean
  }
]
```</td></tr><tr><th>Type</th><td>FormFieldTypes | string[]</td></tr><tr><th>Default</th><td>this.defaultFormFields</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSubmit</div></th></tr></thead><tbody><tr><th>Description</th><td>Fires when confirm sign in form is submitted</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt; this.confirm(event)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>Used for header text in confirm sign in component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CONFIRM_SMS_CODE</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">submitButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>submit-button-text</td></tr><tr><th>Description</th><td>Used for the submit button text in confirm sign in component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CONFIRM</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">user</div></th></tr></thead><tbody><tr><th>Description</th><td>Cognito user signing in</td></tr><tr><th>Type</th><td>CognitoUserInterface</td></tr></tbody></table></div></div>

### Confirm Sign Up

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifyConfirmSignUp
    headerText="My Custom Confirm Sign Up Text"
    slot="confirm-sign-up"
  ></AmplifyConfirmSignUp>
</AmplifyAuthenticator>
```

<div><h4>Properties</h4><p><code>amplify-confirm-sign-up</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">formFields</div></th></tr></thead><tbody><tr><th>Description</th><td>Form fields allows you to utilize our pre-built components such as username field, code field, password field, email field, etc.
by passing an array of strings that you would like the order of the form to be in. If you need more customization, such as changing
text for a label or adjust a placeholder, you can follow the structure below in order to do just that.
```
[
  {
    type: string,
    label: string,
    placeholder: string,
    hint: string | Functional Component | null,
    required: boolean
  }
]
```</td></tr><tr><th>Type</th><td>FormFieldTypes | string[]</td></tr><tr><th>Default</th><td>[]</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this components
e.g. SignIn -&gt; 'Create Account' link -&gt; SignUp</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSubmit</div></th></tr></thead><tbody><tr><th>Description</th><td>Fires when sign up form is submitted</td></tr><tr><th>Type</th><td>(submitEvent: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt;
		this.confirmSignUp(event)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>Used for header text in confirm sign up component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CONFIRM_SIGN_UP_HEADER_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">submitButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>submit-button-text</td></tr><tr><th>Description</th><td>Used for the submit button text in confirm sign up component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">user</div></th></tr></thead><tbody><tr><th>Description</th><td>Used for the username to be passed to resend code</td></tr><tr><th>Type</th><td>CognitoUserInterface</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">usernameAlias</div></th></tr></thead><tbody><tr><th>Attribute</th><td>username-alias</td></tr><tr><th>Description</th><td>Username Alias is used to setup authentication with `username`, `email` or `phone_number`</td></tr><tr><th>Type</th><td>"email" | "phone_number" | "username"</td></tr><tr><th>Default</th><td>'username'</td></tr></tbody></table></div></div>

### Forgot Password

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifyForgotPassword
    headerText="My Custom Forgot Password Text"
    slot="forgot-password"
  ></AmplifyForgotPassword>
</AmplifyAuthenticator>
```

<div><h4>Properties</h4><p><code>amplify-forgot-password</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">formFields</div></th></tr></thead><tbody><tr><th>Description</th><td>The form fields displayed inside of the forgot password form</td></tr><tr><th>Type</th><td>FormFieldTypes | string[]</td></tr><tr><th>Default</th><td>[]</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSend</div></th></tr></thead><tbody><tr><th>Description</th><td>The function called when making a request to reset password</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt; this.send(event)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSubmit</div></th></tr></thead><tbody><tr><th>Description</th><td>The function called when submitting a new password</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt; this.submit(event)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>The header text of the forgot password section</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.RESET_YOUR_PASSWORD</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">sendButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>send-button-text</td></tr><tr><th>Description</th><td>The text displayed inside of the send code button for the form</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SEND_CODE</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">submitButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>submit-button-text</td></tr><tr><th>Description</th><td>The text displayed inside of the submit button for the form</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SUBMIT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">usernameAlias</div></th></tr></thead><tbody><tr><th>Attribute</th><td>username-alias</td></tr><tr><th>Description</th><td>Username Alias is used to setup authentication with `username`, `email` or `phone_number`</td></tr><tr><th>Type</th><td>"email" | "phone_number" | "username"</td></tr><tr><th>Default</th><td>'username'</td></tr></tbody></table></div></div>

### Require New Password

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifyRequireNewPassword
    headerText="My Custom Require New Password Text"
    slot="require-new-password"
  ></AmplifyRequireNewPassword>
</AmplifyAuthenticator>
```

<div><h4>Properties</h4><p><code>amplify-require-new-password</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">formFields</div></th></tr></thead><tbody><tr><th>Description</th><td>The form fields displayed inside of the forgot password form</td></tr><tr><th>Type</th><td>FormFieldTypes</td></tr><tr><th>Default</th><td>[
		{
			type: AuthFormField.Password,
			required: true,
			handleInputChange: event =&gt; this.handlePasswordChange(event),
			label: I18n.get(Translations.NEW_PASSWORD_LABEL),
			placeholder: I18n.get(Translations.NEW_PASSWORD_PLACEHOLDER),
			inputProps: {
				'data-test': 'require-new-password-password-input',
			},
		},
	]</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleSubmit</div></th></tr></thead><tbody><tr><th>Description</th><td>The function called when submitting a new password</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr><tr><th>Default</th><td>event =&gt;
		this.completeNewPassword(event)</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>The header text of the forgot password section</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CHANGE_PASSWORD</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">submitButtonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>submit-button-text</td></tr><tr><th>Description</th><td>The text displayed inside of the submit button for the form</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CHANGE_PASSWORD_ACTION</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">user</div></th></tr></thead><tbody><tr><th>Description</th><td>Used for the username to be passed to resend code</td></tr><tr><th>Type</th><td>CognitoUserInterface</td></tr></tbody></table></div></div>

### TOTP Setup

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifyTotpSetup
    headerText="My Custom TOTP Setup Text"
    slot="totp-setup"
  ></AmplifyTotpSetup>
</AmplifyAuthenticator>
```

<div><h4>Properties</h4><p><code>amplify-totp-setup</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleComplete</div></th></tr></thead><tbody><tr><th>Description</th><td>This is run after totp setup is complete. Useful if using this as standalone.</td></tr><tr><th>Type</th><td>(user: CognitoUserInterface) =&gt; void | Promise&lt;void&gt;</td></tr><tr><th>Default</th><td>this.onTOTPEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-text</td></tr><tr><th>Description</th><td>Used for header text in totp setup component</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.TOTP_HEADER_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">issuer</div></th></tr></thead><tbody><tr><th>Attribute</th><td>issuer</td></tr><tr><th>Description</th><td>Used for customizing the issuer string in the qr code image</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.TOTP_ISSUER</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">standalone</div></th></tr></thead><tbody><tr><th>Attribute</th><td>standalone</td></tr><tr><th>Description</th><td>Set this to true if this component is running outside the default `amplify-authenticator` usage</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>false</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">user</div></th></tr></thead><tbody><tr><th>Description</th><td>Used in order to configure TOTP for a user</td></tr><tr><th>Type</th><td>CognitoUserInterface</td></tr></tbody></table></div></div>

### Verify Contact

**Usage**

```jsx
<AmplifyAuthenticator>
  <AmplifyVerifyContact
    headerText="My Custom Verify Contact Text"
    slot="verify-contact"
  ></AmplifyVerifyContact>
</AmplifyAuthenticator>
```

<div><h4>Properties</h4><p><code>amplify-verify-contact</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Authentication state handler</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">user</div></th></tr></thead><tbody><tr><th>Description</th><td>User with unverified contact information</td></tr><tr><th>Type</th><td>CognitoUserInterface</td></tr></tbody></table></div></div>

### Greetings

**Usage**

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifyGreetings } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const GreetingsApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default GreetingsApp;
```

<div><h4>Properties</h4><p><code>amplify-greetings</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">logo</div></th></tr></thead><tbody><tr><th>Description</th><td>Logo displayed inside of the header</td></tr><tr><th>Type</th><td>FunctionalComponent&lt;{}&gt;</td></tr><tr><th>Default</th><td>null</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">username</div></th></tr></thead><tbody><tr><th>Attribute</th><td>username</td></tr><tr><th>Description</th><td>Username displayed in the greetings</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>null</td></tr></tbody></table></div></div>

<div><h4>Custom CSS Properties</h4><p><code>amplify-greetings</code>&nbsp;provides the following&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" rel="noopener noreferrer" target="_blank">css properties</a>&nbsp;to modify the style at component level.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--background-color</code></td><td>Background color of the container</td></tr><tr><td><code>--border-color</code></td><td>Border color of the container</td></tr><tr><td><code>--font-family</code></td><td>Font family of the text</td></tr></tbody></table></div></div>

<div><h4>Slots</h4><p><code>amplify-greetings</code>&nbsp;provides the following slots based off of the&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot" rel="noopener noreferrer" target="_blank">Web Components slot</a>&nbsp;element.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>greetings-message</code></td><td>Content placed in the greetings text</td></tr><tr><td><code>logo</code></td><td>Left-justified content placed at the start of the greetings bar</td></tr><tr><td><code>nav</code></td><td>Right-justified content placed at the end of the greetings bar</td></tr></tbody></table></div></div>

### withAuthenticator

The `withAuthenticator` is a higher-order component (HoC) that wraps `AmplifyAuthenticator`. You'll also notice the `AmplifySignOut` component. This is an optional component if you'd like to render a sign out button.

**Usage**

```jsx
import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <div>
    <AmplifySignOut />
    My App
  </div>
);

export default withAuthenticator(App);
```

You can also pass in any of the [AmplifyAuthenticator props](#props-attr-amplify-authenticator):

```jsx
export withAuthenticator(App, {initialAuthState: 'signup'});
```

## Methods & Enums

### AuthState

`AuthState` is an enum with the following values:

```js
enum AuthState {
  SignUp = 'signup',
  SignOut = 'signout',
  SignIn = 'signin',
  Loading = 'loading',
  SignedOut = 'signedout',
  SignedIn = 'signedin',
  SigningUp = 'signingup',
  ConfirmSignUp = 'confirmSignUp',
  confirmingSignUpCustomFlow = 'confirmsignupcustomflow',
  ConfirmSignIn = 'confirmSignIn',
  confirmingSignInCustomFlow = 'confirmingsignincustomflow',
  VerifyingAttributes = 'verifyingattributes',
  ForgotPassword = 'forgotpassword',
  ResetPassword = 'resettingpassword',
  SettingMFA = 'settingMFA',
  TOTPSetup = 'TOTPSetup',
  CustomConfirmSignIn = 'customConfirmSignIn',
  VerifyContact = 'verifyContact'
}
```

**Usage**

```js
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

onAuthUIStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log('user successfully signed in!');
  }
});
```

### onAuthUIStateChange

`onAuthUIStateChange` is a function that will fire whenever the state of the Authentication UI component changes.

**Usage**

```js
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

onAuthUIStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log('user successfully signed in!');
    console.log('user data: ', authData);
  }
  if (!authData) {
    console.log('user is not signed in...');
  }
});
```

### handleAuthStateChange

Similar to `onAuthUIStateChange`, `handleAuthStateChange` is a function you can attach to UI components that will fire whenever the state of the UI component changes.

**Usage**

```js
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';

handleAuthStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log('user successfully signed in!');
    console.log('user data: ', authData);
  }
  if (authData) {
    console.log('authData: ', authData);
  }
});

<AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange} />;
```

## Use Cases

### Manage Auth State and Conditional app rendering

JavaScript:

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default AuthStateApp;
```

TypeScript:

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const AuthStateApp: React.FunctionComponent = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
      </div>
  ) : (
      <AmplifyAuthenticator />
  );
}

export default AuthStateApp;
```

### Authenticate with email or phone number

The `amplify-authenticator` component has the ability to sign in / sign up with `email` or `phone_number` instead of default `username`.

To achieve this, you first need to setup the userpool to allow email or phone number as the username [using the cli workflow](/cli/auth/overview#configuring-auth-without-social-providers) or through the [Cognito Console](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases-settings-option-2). To reflect this in the `amplify-authenticator` component, you can use the `usernameAlias` property. It can take one of the three values - `email`, `phone_number` or `username`. Default is set to `username`.

```jsx
<AmplifyAuthenticator usernameAlias="email"></AmplifyAuthenticator>
```

### Override Sign Up

You can override the call to [`signUp`](/lib/auth/emailpassword) function with `handleSignUp` property. For example, you can add a [custom attribute](/lib/auth/emailpassword) like so:

_App.jsx_

```jsx
import { Auth } from 'aws-amplify';

const handleSignUp = async (formData) => {
  const param = {
    ...formData,
    attributes: {
      ...formData.attributes,
      'custom:favorite_flavor': 'Cookie Dough',
    },
  };
  const data = await Auth.signUp(param);
  return data;
};

<AmplifyAuthenticator>
  <AmplifySignUp slot="sign-up" handleSignUp={handleSignUp}></AmplifySignUp>
</AmplifyAuthenticator>;
```

## Migration

To migrate from using the `aws-amplify-<framework>` library to the latest `@aws-amplify/ui-<framework>` library use the steps below:

### Installation

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

### Usage

```diff
- import { Authenticator } from 'aws-amplify-react';
+ import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyAuthenticator>
- <Authenticator>
    <div>
      My App
+     <AmplifySignOut />
    </div>
+ </AmplifyAuthenticator>;
- </Authenticator>
);
```

If you are using `withAuthenticator`:

```diff
- import { withAuthenticator } from 'aws-amplify-react';
+ import { withAuthenticator } from '@aws-amplify/ui-react';
```

```jsx
export default withAuthenticator(App);
```

### Breaking changes for withAuthenticator

We have deprecated some of the properties passed into `withAuthenticator`. If you were providing additional options to `withAuthenticator` (e.g. `includeGreetings`, `authenticatorComponents`, `federated`, `theme`), these have changed. Refer to the updated list of [Properties here](/ui/auth/authenticator/q/framework/react#props-attr-amplify-authenticator).

The previous `withAuthenticator` component would render a Greetings and Sign Out button at the top of your app after logging in. If you would like to add a Greetings or Sign Out button to your app you can add the [`AmplifyGreetings`](#greetings) or [`AmplifySignOut`](#sign-out) component to your app. Visit the [`withAuthenticator` example](#withauthenticator) above to see this.

---

# Sign Out

```jsx
<AmplifySignOut buttonText="Custom Text"></AmplifySignOut>
```

**Usage**

```jsx
<AmplifySignOut buttonText="Custom Text"></AmplifySignOut>
```

<div><a href="#props-attr-amplify-sign-out" class=""><h2 id="props-attr-amplify-sign-out">Properties</h2></a><p><code>amplify-sign-out</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">buttonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>button-text</td></tr><tr><th>Description</th><td>Text inside of the Sign Out button</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.SIGN_OUT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleAuthStateChange</div></th></tr></thead><tbody><tr><th>Description</th><td>Auth state change handler for this component</td></tr><tr><th>Type</th><td>(nextAuthState: AuthState, data?: object) =&gt; void</td></tr><tr><th>Default</th><td>dispatchAuthStateChangeEvent</td></tr></tbody></table></div></div>

<div><a href="#props-slots-amplify-sign-out" class=""><h2 id="props-slots-amplify-sign-out">Slots</h2></a><p><code>amplify-sign-out</code>&nbsp;provides the following slots based off of the&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot" rel="noopener noreferrer" target="_blank">Web Components slot</a>&nbsp;element.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>sign-out</code></td><td>The sign out button element</td></tr></tbody></table></div></div>

---

# Select MFA Type

**Usage**

```jsx
// Required in order to not have the default message of "Less than two mfa types available"
const MFATypeOptions = {
  SMS: true,
  Optional: true,
  TOTP: true,
};

<AmplifySelectMfaType MFATypes={MFATypeOptions}></AmplifySelectMfaType>;
```

---

# Interactions - Chatbot

A simple way to add a conversational UI into your app is to use our ChatBot Component.

ChatBot automatically renders a complete chat messaging interface that can be used out-of-the-box, or it can be customized using theming support.

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyChatbot } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyChatbot
    botName="yourBotName"
    botTitle="My ChatBot"
    welcomeMessage="Hello, how can I help you?"
  />
);
```

<div><a href="#props-attr-amplify-chatbot" class=""><h2 id="props-attr-amplify-chatbot">Properties</h2></a><p><code>amplify-chatbot</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">botName</div></th></tr></thead><tbody><tr><th>Attribute</th><td>bot-name</td></tr><tr><th>Description</th><td>Name of the bot</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">botTitle</div></th></tr></thead><tbody><tr><th>Attribute</th><td>bot-title</td></tr><tr><th>Description</th><td>Text placed in the top header</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.CHATBOT_TITLE</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">clearOnComplete</div></th></tr></thead><tbody><tr><th>Attribute</th><td>clear-on-complete</td></tr><tr><th>Description</th><td>Clear messages when conversation finishes</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>false</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">conversationModeOn</div></th></tr></thead><tbody><tr><th>Attribute</th><td>conversation-mode-on</td></tr><tr><th>Description</th><td>Continue listening to users after they send the message</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>false</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">silenceThreshold</div></th></tr></thead><tbody><tr><th>Attribute</th><td>silence-threshold</td></tr><tr><th>Description</th><td>Noise threshold between -1 and 1. Anything below is considered a silence.</td></tr><tr><th>Type</th><td>number</td></tr><tr><th>Default</th><td>0.2</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">silenceTime</div></th></tr></thead><tbody><tr><th>Attribute</th><td>silence-time</td></tr><tr><th>Description</th><td>Amount of silence (in ms) to wait for</td></tr><tr><th>Type</th><td>number</td></tr><tr><th>Default</th><td>1500</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">textEnabled</div></th></tr></thead><tbody><tr><th>Attribute</th><td>text-enabled</td></tr><tr><th>Description</th><td>Whether text chat is enabled</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>true</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">voiceEnabled</div></th></tr></thead><tbody><tr><th>Attribute</th><td>voice-enabled</td></tr><tr><th>Description</th><td>Whether voice chat is enabled</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>false</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">welcomeMessage</div></th></tr></thead><tbody><tr><th>Attribute</th><td>welcome-message</td></tr><tr><th>Description</th><td>Greeting message displayed to users</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div></div>

## Use Cases

### Setting Up Voice Chat

In order for voice input to work with Amazon Lex, you may have to enable output voice in [AWS Management Console](https://console.aws.amazon.com/console/home). Under the Amazon Lex service, click on your configured Lex chatbot and go to settings -> General and pick your desired output voice.

### Listening to Chat Fulfillment

Once a conversation session is finished, `amplify-chatbot` emits a custom event `chatCompleted` that your app can listen to:

```js
function App() {
  const handleChatComplete = (event) => {
    const { data, err } = event.detail;
    if (data) console.log('Chat fulfilled!', JSON.stringify(data));
    if (err) console.error('Chat failed:', err);
  };

  useEffect(() => {
    const chatbotElement = document.querySelector('amplify-chatbot');
    chatbotElement.addEventListener('chatCompleted', handleChatComplete);
    return function cleanup() {
      chatbotElement.removeEventListener('chatCompleted', handleChatComplete);
    };
  }, []);
}
```

<div><a href="#props-css-amplify-chatbot" class=""><h2 id="props-css-amplify-chatbot">Custom CSS Properties</h2></a><p><code>amplify-chatbot</code>&nbsp;provides the following&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" rel="noopener noreferrer" target="_blank">css properties</a>&nbsp;to modify the style at component level.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--bot-background-color</code></td><td>Background color of bot messages</td></tr><tr><td><code>--bot-dot-color</code></td><td>Base color of bot loading message animation</td></tr><tr><td><code>--bot-text-color</code></td><td>Text color of bot messages</td></tr><tr><td><code>--header-color</code></td><td>Text color within the header</td></tr><tr><td><code>--header-size</code></td><td>Text size within the header</td></tr><tr><td><code>--height</code></td><td>Height of the container</td></tr><tr><td><code>--user-background-color</code></td><td>Background color of user messages</td></tr><tr><td><code>--user-dot-color</code></td><td>Base color of user loading message animation</td></tr><tr><td><code>--user-text-color</code></td><td>Text color of user messages</td></tr><tr><td><code>--width</code></td><td>Width of the container</td></tr></tbody></table></div></div>

<div><a href="#props-slots-amplify-chatbot"><h2 id="props-slots-amplify-chatbot">Slots</h2></a><p><code>amplify-chatbot</code>&nbsp;provides the following slots based off of the&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot" rel="noopener noreferrer" target="_blank">Web Components slot</a>&nbsp;element.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>header</code></td><td>Title content placed at the top</td></tr></tbody></table></div></div>

## Migration

To migrate from the legacy chatbot component to the latest chatbot component, use the steps below:

**Installation**

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

**Usage**

```
- import { ChatBot } from 'aws-amplify-react';
+ import { AmplifyChatbot } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyChatbot botName="yourBotName" />
- <ChatBot botName="yourBotName" />

);
```

If you were using onComplete prop previously, you need to use eventListener described above.

---

# Storage - S3 Album

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3Album } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => <AmplifyS3Album />;
```

<div><a href="#props-attr-amplify-s3-album"><h2 id="props-attr-amplify-s3-album">Properties</h2></a><p><code>amplify-s3-album</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">contentType</div></th></tr></thead><tbody><tr><th>Attribute</th><td>content-type</td></tr><tr><th>Description</th><td>The content type header used when uploading to S3</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>'binary/octet-stream'</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">fileToKey</div></th></tr></thead><tbody><tr><th>Description</th><td>Callback used to generate custom key value</td></tr><tr><th>Type</th><td>(data: object) =&gt; string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">filter</div></th></tr></thead><tbody><tr><th>Description</th><td>Filter to be applied on album list</td></tr><tr><th>Type</th><td>(list: StorageObject[]) =&gt; StorageObject[]</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleOnError</div></th></tr></thead><tbody><tr><th>Description</th><td>Function executed when error occurs for the s3-image</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleOnLoad</div></th></tr></thead><tbody><tr><th>Description</th><td>Function executed when s3-image loads</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">identityId</div></th></tr></thead><tbody><tr><th>Attribute</th><td>identity-id</td></tr><tr><th>Description</th><td>Cognito identity id of the another user's image list</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">level</div></th></tr></thead><tbody><tr><th>Attribute</th><td>level</td></tr><tr><th>Description</th><td>The access level of the files</td></tr><tr><th>Type</th><td>AccessLevel.Private | AccessLevel.Protected | AccessLevel.Public</td></tr><tr><th>Default</th><td>AccessLevel.Public</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">path</div></th></tr></thead><tbody><tr><th>Attribute</th><td>path</td></tr><tr><th>Description</th><td>String representing directory location of image files to be listed</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">picker</div></th></tr></thead><tbody><tr><th>Attribute</th><td>picker</td></tr><tr><th>Description</th><td>Boolean to enable or disable picker</td></tr><tr><th>Type</th><td>boolean</td></tr><tr><th>Default</th><td>true</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">pickerText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>picker-text</td></tr><tr><th>Description</th><td>Picker button text</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.PICKER_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">sort</div></th></tr></thead><tbody><tr><th>Description</th><td>Sort to be applied on album list</td></tr><tr><th>Type</th><td>(list: StorageObject[]) =&gt; StorageObject[]</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">track</div></th></tr></thead><tbody><tr><th>Attribute</th><td>track</td></tr><tr><th>Description</th><td>Whether or not to use track the get/put of the listing of images</td></tr><tr><th>Type</th><td>boolean</td></tr></tbody></table></div></div>

<div><a href="#props-css-amplify-s3-album"><h2 id="props-css-amplify-s3-album">Custom CSS Properties</h2></a><p><code>amplify-s3-album</code>&nbsp;provides the following&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" rel="noopener noreferrer" target="_blank">css properties</a>&nbsp;to modify the style at component level.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--overlay-bg-color</code></td><td>Image overlay color on hover</td></tr></tbody></table></div></div>

## Migration

To migrate from using the aws-amplify-<framework> library to the latest @aws-amplify/ui-<framework> library use the steps below:

**Installation**

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

**Usage**

```diff
- import { S3Album } from 'aws-amplify-react';
+ import { AmplifyS3Album } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3Album />
- <S3Album />

);
```

# Storage - S3 Image

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => <AmplifyS3Image imgKey="example.png" />;
```

<div><a href="#props-attr-amplify-s3-image"><h2 id="props-attr-amplify-s3-image">Properties</h2></a><p><code>amplify-s3-image</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">alt</div></th></tr></thead><tbody><tr><th>Attribute</th><td>alt</td></tr><tr><th>Description</th><td>String representing the alternate image text</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">body</div></th></tr></thead><tbody><tr><th>Description</th><td>Image body content to be uploaded</td></tr><tr><th>Type</th><td>object</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">contentType</div></th></tr></thead><tbody><tr><th>Attribute</th><td>content-type</td></tr><tr><th>Description</th><td>The content type header used when uploading to S3</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>'binary/octet-stream'</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleOnError</div></th></tr></thead><tbody><tr><th>Description</th><td>Function executed when error occurs for the image</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">handleOnLoad</div></th></tr></thead><tbody><tr><th>Description</th><td>Function executed when image loads</td></tr><tr><th>Type</th><td>(event: Event) =&gt; void</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">identityId</div></th></tr></thead><tbody><tr><th>Attribute</th><td>identity-id</td></tr><tr><th>Description</th><td>Cognito identity id of the another user's image</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">imgKey</div></th></tr></thead><tbody><tr><th>Attribute</th><td>img-key</td></tr><tr><th>Description</th><td>The key of the image object in S3</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">imgProps</div></th></tr></thead><tbody><tr><th>Description</th><td>Attributes to be placed on the img element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes</td></tr><tr><th>Type</th><td>{ [x: string]: any; [x: number]: any; }</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">level</div></th></tr></thead><tbody><tr><th>Attribute</th><td>level</td></tr><tr><th>Description</th><td>The access level of the image</td></tr><tr><th>Type</th><td>AccessLevel.Private | AccessLevel.Protected | AccessLevel.Public</td></tr><tr><th>Default</th><td>AccessLevel.Public</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">path</div></th></tr></thead><tbody><tr><th>Attribute</th><td>path</td></tr><tr><th>Description</th><td>String representing directory location to image file</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">track</div></th></tr></thead><tbody><tr><th>Attribute</th><td>track</td></tr><tr><th>Description</th><td>Whether or not to use track on get/put of the image</td></tr><tr><th>Type</th><td>boolean</td></tr></tbody></table></div></div>

<div><a href="#props-css-amplify-s3-image"><h2 id="props-css-amplify-s3-image">Custom CSS Properties</h2></a><p><code>amplify-s3-image</code>&nbsp;provides the following&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" rel="noopener noreferrer" target="_blank">css properties</a>&nbsp;to modify the style at component level.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--height</code></td><td>Image height</td></tr><tr><td><code>--width</code></td><td>Image width</td></tr></tbody></table></div></div>

## Use Cases

### Getting files from protected access level

Protected files from S3 bucket can be accessed by anyone other than the owner by using the `identityId` of the owner.

```jsx
const App = () => (
  <AmplifyS3Image
    level="protected"
    imgKey="example.png"
    identityId="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
  />
);
```

## Migration

To migrate from using the aws-amplify-<framework> library to the latest @aws-amplify/ui-<framework> library use the steps below:

**Installation**

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

**Usage**

```diff
- import { S3Image } from 'aws-amplify-react';
+ import { AmplifyS3Image } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3Image imgKey="example.png" />
- <S3Image imgKey="example.png" />

);
```

If you were using S3Image with picker property enabled, please see the documentation for S3ImagePicker.

# Storage - S3 Image Picker

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => <AmplifyS3ImagePicker />;
```

<div><a href="#props-attr-amplify-s3-image-picker"><h2 id="props-attr-amplify-s3-image-picker">Properties</h2></a><p><code>amplify-s3-image-picker</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">buttonText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>button-text</td></tr><tr><th>Description</th><td>Upload Button Text as string</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.IMAGE_PICKER_BUTTON_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">contentType</div></th></tr></thead><tbody><tr><th>Attribute</th><td>content-type</td></tr><tr><th>Description</th><td>The content type header used when uploading to S3</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>'binary/octet-stream'</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">fileToKey</div></th></tr></thead><tbody><tr><th>Description</th><td>Callback used to generate custom key value</td></tr><tr><th>Type</th><td>(data: object) =&gt; string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerHint</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-hint</td></tr><tr><th>Description</th><td>Header Hint value in string</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.IMAGE_PICKER_HINT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">headerTitle</div></th></tr></thead><tbody><tr><th>Attribute</th><td>header-title</td></tr><tr><th>Description</th><td>Title string value</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.IMAGE_PICKER_TITLE</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">identityId</div></th></tr></thead><tbody><tr><th>Attribute</th><td>identity-id</td></tr><tr><th>Description</th><td>Cognito identity id of the another user's image</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">level</div></th></tr></thead><tbody><tr><th>Attribute</th><td>level</td></tr><tr><th>Description</th><td>The access level of the image</td></tr><tr><th>Type</th><td>AccessLevel.Private | AccessLevel.Protected | AccessLevel.Public</td></tr><tr><th>Default</th><td>AccessLevel.Public</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">path</div></th></tr></thead><tbody><tr><th>Attribute</th><td>path</td></tr><tr><th>Description</th><td>String representing directory location to image file</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">placeholderHint</div></th></tr></thead><tbody><tr><th>Attribute</th><td>placeholder-hint</td></tr><tr><th>Description</th><td>Placeholder hint that goes under the placeholder image</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.IMAGE_PICKER_PLACEHOLDER_HINT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">track</div></th></tr></thead><tbody><tr><th>Attribute</th><td>track</td></tr><tr><th>Description</th><td>Whether or not to use track the get/put of the image</td></tr><tr><th>Type</th><td>boolean</td></tr></tbody></table></div></div>

## Migration

To migrate from using the aws-amplify-<framework> library to the latest @aws-amplify/ui-<framework> library use the steps below:

**Installation**

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

**Usage**

```diff
- import { S3Image } from 'aws-amplify-react';
+ import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3ImagePicker />
- <S3Image picker/>

);
```

If you want to use S3Image without picker property enabled, please see the documentation for S3Image.

# Storage - S3 Text

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3Text } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => <AmplifyS3Text textKey="example.txt" />;
```

<div><a href="#props-attr-amplify-s3-text"><h2 id="props-attr-amplify-s3-text">Properties</h2></a><p><code>amplify-s3-text</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">body</div></th></tr></thead><tbody><tr><th>Description</th><td>Text body content to be uploaded</td></tr><tr><th>Type</th><td>object</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">contentType</div></th></tr></thead><tbody><tr><th>Attribute</th><td>content-type</td></tr><tr><th>Description</th><td>The content type header used when uploading to S3</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>'text/*'</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">fallbackText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>fallback-text</td></tr><tr><th>Description</th><td>Fallback content</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.TEXT_FALLBACK_CONTENT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">identityId</div></th></tr></thead><tbody><tr><th>Attribute</th><td>identity-id</td></tr><tr><th>Description</th><td>Cognito identity id of the another user's text file</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">level</div></th></tr></thead><tbody><tr><th>Attribute</th><td>level</td></tr><tr><th>Description</th><td>The access level of the text file</td></tr><tr><th>Type</th><td>AccessLevel.Private | AccessLevel.Protected | AccessLevel.Public</td></tr><tr><th>Default</th><td>AccessLevel.Public</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">path</div></th></tr></thead><tbody><tr><th>Attribute</th><td>path</td></tr><tr><th>Description</th><td>String representing directory location to text file</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">textKey</div></th></tr></thead><tbody><tr><th>Attribute</th><td>text-key</td></tr><tr><th>Description</th><td>The key of the text object in S3</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">track</div></th></tr></thead><tbody><tr><th>Attribute</th><td>track</td></tr><tr><th>Description</th><td>Whether or not to use track the get/put of the text file</td></tr><tr><th>Type</th><td>boolean</td></tr></tbody></table></div></div>

<div><a href="#props-css-amplify-s3-text"><h2 id="props-css-amplify-s3-text">Custom CSS Properties</h2></a><p><code>amplify-s3-text</code>&nbsp;provides the following&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" rel="noopener noreferrer" target="_blank">css properties</a>&nbsp;to modify the style at component level.</p><div><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>--border-color</code></td><td>Border color of the text container</td></tr><tr><td><code>--container-color</code></td><td>Background color of the text container</td></tr><tr><td><code>--font-size</code></td><td>Font size of the text</td></tr><tr><td><code>--text-color</code></td><td>Font color of the text</td></tr></tbody></table></div></div>

## Use Cases

### Getting files from protected access level

Protected files from S3 bucket can be accessed by anyone other than the owner by using the `identityId` of the owner.

```jsx
const App = () => (
  <AmplifyS3Text
    level="protected"
    textKey="example.txt"
    identityId="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
  />
);
```

## Migration

To migrate from using the aws-amplify-<framework> library to the latest @aws-amplify/ui-<framework> library use the steps below:

**Installation**

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

**Usage**

```diff
- import { S3Text } from 'aws-amplify-react';
+ import { AmplifyS3Text } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3Text textKey="example.txt" />
- <S3Text textKey="example.txt" />

);
```

If you were using S3Text with picker property enabled, please see the documentation for S3TextPicker.

# Storage - S3 Text Picker

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react@v1
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3TextPicker } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => <AmplifyS3TextPicker />;
```

<div><a href="#props-attr-amplify-s3-text-picker"><h2 id="props-attr-amplify-s3-text-picker">Properties</h2></a><p><code>amplify-s3-text-picker</code>&nbsp;provides the following properties to configure the component.</p><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">contentType</div></th></tr></thead><tbody><tr><th>Attribute</th><td>content-type</td></tr><tr><th>Description</th><td>The content type header used when uploading to S3</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>'text/*'</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">fallbackText</div></th></tr></thead><tbody><tr><th>Attribute</th><td>fallback-text</td></tr><tr><th>Description</th><td>Fallback content for aplify-s3-text</td></tr><tr><th>Type</th><td>string</td></tr><tr><th>Default</th><td>Translations.PICKER_TEXT</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">fileToKey</div></th></tr></thead><tbody><tr><th>Description</th><td>Callback used to generate custom key value</td></tr><tr><th>Type</th><td>(data: object) =&gt; string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">identityId</div></th></tr></thead><tbody><tr><th>Attribute</th><td>identity-id</td></tr><tr><th>Description</th><td>Cognito identity id of the another user's text file</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">level</div></th></tr></thead><tbody><tr><th>Attribute</th><td>level</td></tr><tr><th>Description</th><td>The access level of the text file</td></tr><tr><th>Type</th><td>AccessLevel.Private | AccessLevel.Protected | AccessLevel.Public</td></tr><tr><th>Default</th><td>AccessLevel.Public</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">path</div></th></tr></thead><tbody><tr><th>Attribute</th><td>path</td></tr><tr><th>Description</th><td>String representing directory location to text file</td></tr><tr><th>Type</th><td>string</td></tr></tbody></table></div><div><table class="css-3gdh26"><thead><tr><th colspan="2"><div class="css-15ao077">track</div></th></tr></thead><tbody><tr><th>Attribute</th><td>track</td></tr><tr><th>Description</th><td>Whether or not to use track the get/put of the text file</td></tr><tr><th>Type</th><td>boolean</td></tr></tbody></table></div></div>

## Migration

To migrate from using the aws-amplify-<framework> library to the latest @aws-amplify/ui-<framework> library use the steps below:

**Installation**

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

**Usage**

```diff
- import { S3Text } from 'aws-amplify-react';
+ import { AmplifyS3TextPicker } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3TextPicker />
- <S3Text picker/>

);
```

If you want to use S3Text without picker property enabled, please see the documentation for S3Text.

# Storage - Tracking Events

You can automatically track `Storage` operations on the following components: `AmplifyS3Album`, `AmplifyS3Text`, `AmplifyS3Image`, `AmplifyS3TextPicker`, `AmplifyS3ImagePicker` by providing a `track` prop:

```jsx
return <AmplifyS3Image track />;
```

Enabling tracking will automatically send 'Storage' events to Amazon Pinpoint, and you will be able to see the results in AWS Pinpoint console under _Custom Events_. The event name will be _Storage_, and event details will be displayed in _attributes_ , e.g. Storage -> Method -> Put.

---

# Customization

Theming for the UI components can be achieved by using CSS Variables. You can enable theming in your app by overriding the below mentioned CSS variable values. To do that, add the following code in root css file.

```
:root {
  --amplify-primary-color: #ff6347;
  --amplify-primary-tint: #ff7359;
  --amplify-primary-shade: #e0573e;
}
```

## Supported CSS Custom properties

### For Typography

| Custom Properties       | Default Value                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `--amplify-font-family` | 'Amazon Ember', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif' |
| `--amplify-text-xxs`    | 0.75rem                                                                                      |
| `--amplify-text-xs`     | 0.81rem                                                                                      |
| `--amplify-text-sm`     | 0.875rem                                                                                     |
| `--amplify-text-md`     | 1rem                                                                                         |
| `--amplify-text-lg`     | 1.5rem                                                                                       |
| `--amplify-text-xl`     | 2rem                                                                                         |
| `--amplify-text-xxl`    | 2.5rem                                                                                       |

### For Colors

| Custom Properties              | Default Value        |
| ------------------------------ | -------------------- |
| `--amplify-primary-color`      | #ff9900              |
| `--amplify-primary-contrast`   | var(--amplify-white) |
| `--amplify-primary-tint`       | #ffac31              |
| `--amplify-primary-shade`      | #e88b01              |
| `--amplify-secondary-color`    | #152939              |
| `--amplify-secondary-contrast` | var(--amplify-white) |
| `--amplify-secondary-tint`     | #31465f              |
| `--amplify-secondary-shade`    | #1F2A37              |
| `--amplify-tertiary-color`     | #5d8aff              |
| `--amplify-tertiary-contrast`  | var(--amplify-white) |
| `--amplify-tertiary-tint`      | #7da1ff              |
| `--amplify-tertiary-shade`     | #537BE5              |
| `--amplify-grey`               | #828282              |
| `--amplify-light-grey`         | #c4c4c4              |
| `--amplify-white`              | #ffffff              |
| `--amplify-red`                | #dd3f5b              |

## Customizing CSS

You can control top level components directly using CSS. For instance, to control the layout of the `amplify-authenticator`, we can specify the properties directly inside of its selector.

```css
amplify-authenticator {
  background: tomato;
  padding: 5px;
}
```

The top level control is available for the following components. _**Note:**_ The components needs to be rolled out in the client in order to enable this CSS update.

- `amplify-sign-in`
- `amplify-confirm-sign-in`
- `amplify-sign-up`
- `amplify-confirm-sign-up`
- `amplify-forgot-password`
- `amplify-require-new-password`
- `amplify-verify-contact`
- `amplify-totp-setup`

## Translations

Customizing text and adding language translations can be done via the `I18n` module:

```js
import { I18n } from 'aws-amplify';
import { Translations } from '@aws-amplify/ui-components';

I18n.putVocabulariesForLanguage('en-US', {
  [Translations.SIGN_IN_HEADER_TEXT]: 'Custom Sign In Header Text',
  [Translations.SIGN_IN_ACTION]: 'Custom Click Here to Sign In',
});
```

A complete list of all translatable strings can be found in [`Translations.ts`](https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/common/Translations.ts).
