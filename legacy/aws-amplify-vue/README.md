# AWS Amplify Package - aws-amplify-vue

[![npm version](https://badge.fury.io/js/aws-amplify-vue.svg)](https://badge.fury.io/js/aws-amplify-vue)

The `aws-amplify-vue` package is a set of Vue components which integrates your Vue application with the AWS-Amplify library. The package supports Vue applications using version 2.5 or above, and was created using the Vue 3.0 CLI.

## Configuration

In your Vue app, install the following:

```bash
npm i aws-amplify
npm i aws-amplify-vue
```

Then, alter main.js:

```javascript
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules);

// It's important that you instantiate the Vue instance after calling Vue.use!

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

In App.vue:

```
<script>
import { components } from 'aws-amplify-vue'

export default {
  name: 'app',
  components: {
    ...<yourOtherComponents>,
    ...components
  }
}
</script>

```

## AmplifyEventBus

The aws-amplify-vue package implements a Vue EventBus for emitted and listening to events within its components. The events emitted by the components are listed within the documentation for each individual component.

To listen to these events within one of your components, import the EventBus:

```javascript
import { AmplifyEventBus } from 'aws-amplify-vue';
```

Then, register an event listener (potentially within a lifecycle hook):

```javascript
AmplifyEventBus.$on('authState', (info) => {
  console.log(
    `Here is the auth event that was just emitted by an Amplify component: ${info}`
  );
});
```

## AmplifyPlugin

The aws-amplify-vue package provides a Vue plugin to access the Amplify library. You installed the plugin when you set up your application:

`Vue.use(AmplifyPlugin, AmplifyModules)`

This makes the Amplify library available to the aws-amplify-vue components as well as your application. Please note that you can restrict the modules that are made available to the plugin by passing only specific modules in the second argument of `Vue.use` call.

### Using the AmplifyPlugin

To call the Amplify library, simply use `this.$Amplify.` followed by whichever module you wish to use.

## Authentication Components

### Authenticator

The Authenticator component provides basic login/logout functionality for your application, as well confirmation steps for new user registration and user login. It uses the following components as children:

- SignIn
- ConfirmSignIn
- SignUp
- ConfirmSignUp
- ForgotPassword

Usage: `<amplify-authenticator></amplify-authenticator>`

Config:

```
<amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
```

| Attribute                                                 | Type   |
| --------------------------------------------------------- | ------ |
| [confirmSignInConfig](#confirmsignin)                     | object |
| [confirmSignUpConfig](#confirmsignup)                     | object |
| [forgotPasswordConfig](#forgotpassword)                   | object |
| [signInConfig](#signinconfig)                             | object |
| [signUpConfig](#signupconfig)                             | object |
| [usernameAttributes](#Sign-up/in-with-email/phone-number) | string |

\* The attributes above reference the config objects for the components that are nested inside Authenticator. See the individual components for details.

Events: None

### SignIn

The SignIn component provides your users with the ability to sign in.

Usage: `<amplify-sign-in></amplify-sign-in>`

Config:

```
<amplify-sign-in v-bind:signInConfig="signInConfig"></amplify-sign-in>
```

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
      <td data-column="Default">'Sign In'</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">username</td>
      <td data-column="Type">string</td>
      <td data-column="Description">the default value of the username field</td>
      <td data-column="Default">''</td>
      <td data-column="Required">no</td>
    </tr>
  </tbody>
</table>

Events:

- `AmplifyEventBus.$emit('authState', 'signedIn')`: Emitted when a user successfully signs in without answering an MFA challenge.
- `AmplifyEventBus.$emit('authState', 'confirmSignIn')`: Emitted when a user successfully provides their credentials but is then asked to answer and MFA challenge.
- `AmplifyEventBus.$emit('authState', 'forgotPassword')`: Emitted when a user clicks the 'Forgot Password' button.
- `AmplifyEventBus.$emit('authState', 'signUp')`: Emitted when a user clicks 'Back to Sign Up'.

### ConfirmSignIn

The ConfirmSignIn component provides your users with the ability to answer an MFA challenge.

Usage: `<amplify-confirm-sign-in></amplify-confirm-sign-in>`

Config:

```
<amplify-confirm-sign-in v-bind:confirmSignInConfig="confirmSignInConfig"></amplify-confirm-sign-in>
```

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
        <td data-column="Default">'Confirm Sign In'</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
          <td data-column="Attribute">user</td>
          <td data-column="Type">object</td>
          <td data-column="Description">the user who is stepping through the signin process</td>
          <td data-column="Default">N/A</td>
          <td data-column="Required">yes</td>
      </tr>
    </tbody>
  </table>

Events:

- `AmplifyEventBus.$emit('authState', 'signedIn')`: Emitted when a user successfully answers their MFA challenge.
- `AmplifyEventBus.$emit('authState', 'signIn');`: Emitted when a user clicks 'Back to Sign In'.

### SignUp

The SignUp component provides your users with the ability to sign up.

Usage: `<amplify-sign-up></amplify-sign-up>`

Config:

```
<amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
```

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

The signUpFields array in turn consist of an array of objects, each describing a field that will appear in sign up form that your users fill out (see below).

Events:

- `AmplifyEventBus.$emit('authState', 'confirmSignUp')`: Emitted when a user successfully enters their information but has not yet completed a required verification step.
- `AmplifyEventBus.$emit('authState', 'signIn')`: Emitted when a user successfully provides their information and does not need to complete a required verification step, or when they click 'Back to Sign In'.

### ConfirmSignUp

The ConfirmSignUp component provides your users with the ability to verify their identity.

Usage: `<amplify-confirm-sign-up></amplify-confirm-sign-up>`

Config:

```
<amplify-confirm-sign-up v-bind:confirmSignUpConfig="confirmSignUpConfig"></amplify-confirm-sign-up>
```

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

Events:

- `AmplifyEventBus.$emit('authState', 'signIn')`: Emitted when a user successfully completes their verification step or clicks 'Back to Sign In'.

### ForgotPassword

The ForgotPassword component provides your users with the ability to reset their password.

Usage: `<amplify-forgot-password></amplify-forgot-password>`

Config:

```
<amplify-forgot-password v-bind:forgotPasswordConfig="forgotPasswordConfig"></amplify-forgot-password>
```

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
        <td data-column="Default">'Forgot Password'</td>
        <td data-column="Required">no</td>
      </tr>
    </tbody>
</table>

Events:

- `AmplifyEventBus.$emit('authState', 'signIn')`: Emitted when a user successfully resets their password or clicks 'Back to Sign In'.

### SignOut

The SignOut component provides your users with the ability to sign out.

Usage: `<amplify-sign-out></amplify-sign-out>`

Config:

```
<amplify-sign-out v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
```

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
        <td data-column="Attribute">msg</td>
        <td data-column="Type">string</td>
        <td data-column="Description">message displayed above the sign out button</td>
        <td data-column="Default">null</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
          <td data-column="Attribute">signOutButton</td>
          <td data-column="Type">string</td>
          <td data-column="Description">text that appears in the sign out button</td>
          <td data-column="Default">'Sign Out'</td>
          <td data-column="Required">no</td>
      </tr>
    </tbody>
  </table>

Events:

- `AmplifyEventBus.$emit('authState', 'signedOut')`: Emitted when a user successfully signs out.

### SetMFA

The SetMFA component provides your users with the ability to set their preferred Multifactor Authentication (MFA) method. It has the ability to show three options - SMS Text Message, TOTP, or None (depending on the options that you pass into it).

Usage: `<amplify-set-mfa></amplify-set-mfa>`

Config:

```
<amplify-set-mfa v-bind:mfaConfig="mfaConfig"></amplify-set-mfa>
```

<table>
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Type</th>
        <th>Description</th>
        <th>Default</th>
        <th>Possible Values</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-column="Attribute">mfaDescription</td>
        <td data-column="Type">string</td>
        <td data-column="Description">description of MFA for your users</td>
        <td data-column="Default">AWS Multi-Factor Authentication (MFA) adds an extra layer of protection on top of your user name and password.</td>
        <td data-column="Possible Values">N/A</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
        <td data-column="Attribute">mfaTypes</td>
        <td data-column="Type">array</td>
        <td data-column="Description">an array of MFA types which will result in a radio button selection</td>
        <td data-column="Default">[]</td>
        <td data-column="Possible Values">‘SMS’, ‘TOTP’, ‘None’</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
        <td data-column="Attribute">tokenInstructions</td>
        <td data-column="Type">string</td>
        <td data-column="Description">instructions for decoding the QR code used with TOTP</td>
        <td data-column="Default">‘Scan the QR Code with your phone camera or authentication app to get the MFA code.’	</td>
        <td data-column="Possible Values">N/A</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
        <td data-column="Attribute">smsDescription</td>
        <td data-column="Type">string</td>
        <td data-column="Description">label for SMS radio button</td>
        <td data-column="Default">‘SMS text messaging (receive a code on your mobile device)’</td>
        <td data-column="Possible Values">N/A</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
        <td data-column="Attribute">totpDescription</td>
        <td data-column="Type">string</td>
        <td data-column="Description">label for TOTP radio button</td>
        <td data-column="Default">‘One-time password (use a QR code and MFA app to save a token on your mobile device)’</td>
        <td data-column="Possible Values">N/A</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
        <td data-column="Attribute">noMfaDescription</td>
        <td data-column="Type">string</td>
        <td data-column="Description">label for None radio button</td>
        <td data-column="Default">‘Do not enable MFA’</td>
        <td data-column="Possible Values">N/A</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
          <td data-column="Attribute">cancelHandler</td>
          <td data-column="Type">function</td>
          <td data-column="Description">function called when user clicks on ‘Cancel’ button</td>
          <td data-column="Default">N/A</td>
          <td data-column="Possible Values">N/A</td>
          <td data-column="Required">no</td>
        </tr>
    </tbody>
  </table>

Events: None

### SignUp Fields

The `aws-amplify-vue` SignUp component allows you to programmatically define the user input fields that are displayed to the user. Information entered into these fields will populate the user's record in your User Pool.

Usage:

```
<amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
```

#### SignUp Field Attributes

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

The following example will replace all the default sign up fields with the ones defined in the `signUpFields` array. It will also indicate that the `Email` field will be used to sign up with.

`MyComponent.vue`:

```html
<template>
  <div>
    <amplify-authenticator
      v-bind:authConfig="authConfig"
    ></amplify-authenticator>
  </div>
</template>
<script>
  export default {
    name: 'MyComponent',
    props: [],
    data() {
      return {
        authConfig: {
          signUpConfig: {
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
                signUpWith: true,
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
                label: 'Custom Attribute',
                key: 'custom_attr',
                required: false,
                displayOrder: 4,
                type: 'string',
                custom: true,
              },
            ],
          },
        },
      };
    },
  };
</script>
```

### Sign up/in with email/phone number

If the user pool is set to allow email addresses/phone numbers as the username, you can then change the UI components accordingly by using `usernameAttributes`.

Setting `usernameAttributes` to `email` when signing up/in with email address.
Setting `usernameAttributes` to `phone_number` when signing up/in with phone number.

Note: if you are using custom signUpFields to customize the `username` field, then you need to make sure either the label of that field is the same value you set in `usernameAttributes` or the key of the field is `username`.

For example:

```html
<template>
  <div>
    <amplify-authenticator
      v-bind:authConfig="authConfig"
    ></amplify-authenticator>
  </div>
</template>
<script>
  export default {
    name: 'MyComponent',
    props: [],
    data() {
      return {
        authConfig: {
          usernameAttributes: 'My user name',
          signUpConfig: {
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
          },
        },
      };
    },
  };
</script>
```

## API Components

### Connect

The Connect component can be used to execute a GraphQL query, subscription, or mutation. You can execute GraphQL queries by passing your queries in `query` or `mutation` attributes. For example:

```html
<template>
  <div class="home">
    <amplify-connect :query="listTodosQuery">
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Loading...</div>

        <div v-else-if="errors.length > 0">{{ errors }}</div>

        <div v-else-if="data">
          <TodoList :items="data.listTodos.items"></TodoList>
        </div>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
  import { components } from 'aws-amplify-vue';
  import TodoList from '@/components/TodoList.vue';

  const ListTodosQuery = `query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }`;

  export default {
    components: {
      TodoList,
      ...components,
    },
    computed: {
      listTodosQuery() {
        return this.$Amplify.graphqlOperation(ListTodosQuery);
      },
    },
  };
</script>
```

You can also subscribe to changes in query data via the `subscription` and `onSubscriptionMsg` attributes:

```html
<template>
  <div class="home">
    <amplify-connect
      :query="listTodosQuery"
      :subscription="createTodoSubscription"
      :onSubscriptionMsg="onCreateTodo"
    >
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Loading...</div>

        <div v-else-if="errors.length > 0">{{ errors }}</div>

        <div v-else-if="data">
          <TodoList :items="data.listTodos.items"></TodoList>
        </div>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
  import { components } from 'aws-amplify-vue';
  import TodoList from '@/components/TodoList.vue';

  const ListTodosQuery = `query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }`;

  const OnCreateTodoSubscription = `subscription OnCreateTodo {
      onCreateTodo {
        id
        name
      }
    }`;

  export default {
    name: 'home',
    components: {
      TodoList,
      ...components,
    },
    computed: {
      listTodosQuery() {
        return this.$Amplify.graphqlOperation(ListTodosQuery);
      },
      createTodoSubscription() {
        return this.$Amplify.graphqlOperation(OnCreateTodoSubscription);
      },
    },
    methods: {
      onCreateTodo(prevData, newData) {
        console.log('New todo from subscription...');
        const newTodo = newData.onCreateTodo;
        prevData.data.listTodos.items.push(newTodo);
        return prevData.data;
      },
    },
  };
</script>
```

The Connect component also supports mutations by passing a GraphQL query and (optionally) variables via the `mutation` attribute. Call the provided `mutate` method to trigger the operation. `mutation` returns a promise that resolves with the result of the GraphQL mutation, use `@done` to listen for it to complete.

```html
<template>
  <div>
    <amplify-connect :mutation="createTodoMutation" @done="onCreateFinished">
      <template slot-scope="{ loading, mutate, errors }">
        <input v-model="name" placeholder="item name" />
        <input v-model="description" placeholder="item description" />
        <button :disabled="loading" @click="mutate">Create Todo</button>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
  import { components } from 'aws-amplify-vue';

  const CreateTodoMutation = `mutation CreateTodo($name: String!, $description: String) {
    createTodo(input: { name: $name, description: $description }) {
      id
      name
    }
  }`;

  export default {
    name: 'NewTodo',
    components: {
      ...components,
    },
    data() {
      return {
        name: '',
        description: '',
      };
    },
    computed: {
      createTodoMutation() {
        return this.$Amplify.graphqlOperation(CreateTodoMutation, {
          name: this.name,
          description: this.description,
        });
      },
    },
    methods: {
      onCreateFinished() {
        console.log('Todo created!');
      },
    },
  };
</script>
```

## Storage Components

### PhotoPicker

The PhotoPicker component provides your users to select and preview a file for upload to S3.

Usage: `<amplify-photo-picker></amplify-photo-picker>`

Config:

```
<amplify-photo-picker v-bind:photoPickerConfig="photoPickerConfig"></amplify-photo-picker>
```

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
        <td data-column="Default">'File Upload'</td>
        <td data-column="Required">no</td>
      </tr>
      <tr>
          <td data-column="Attribute">title</td>
          <td data-column="Type">string</td>
          <td data-column="Description">text displayed in the upload button</td>
          <td data-column="Default">'Upload'</td>
          <td data-column="Required">no</td>
      </tr>
      <tr>
        <td data-column="Attribute">accept</td>
        <td data-column="Type">string</td>
        <td data-column="Description">a string representing the ‘accept’ attribute in the html input element</td>
        <td data-column="Default">'*/*'</td>
        <td data-column="Required">no</td>
    </tr>
    <tr>
        <td data-column="Attribute">path</td>
        <td data-column="Type">string</td>
        <td data-column="Description">S3 path for the file upload</td>
        <td data-column="Default">N/A</td>
        <td data-column="Required">yes</td>
    </tr>
    <tr>
        <td data-column="Attribute">defaultName</td>
        <td data-column="Type">string</td>
        <td data-column="Description">the name of the file when uploaded to S3</td>
        <td data-column="Default">the original file name</td>
        <td data-column="Required">no</td>
    </tr>
    <tr>
        <td data-column="Attribute">storageOptions</td>
        <td data-column="Type">object</td>
        <td data-column="Description">the options object that will be passed to s3 category functions</td>
        <td data-column="Default">none</td>
        <td data-column="Required">no</td>
    </tr>
    </tbody>
</table>

The storageOptions prop object is passed as the 'options' parameter to the .put request. This can be used to set the 'level' of the objects being uploaded (i.e. 'protected', 'private', or 'public').

Events:

- `AmplifyEventBus.$emit('fileUpload', img)`: Emitted when a file is uploaded (includes the image path)

### S3Album

The S3Album component displays the image files from the provided S3 path.

Usage: `<amplify-s3-album path="uploads"></amplify-s3-album>`

Props:

The S3Album component accepts a 'path' prop (mandatory). It can also accept a s3AlbumConfig prop object which is passed as the 'options' parameter to the .get request. This can be used to set the 'level' of the objects being requested (i.e. 'protected', 'private', or 'public').

Events: None

### S3Image

The S3Image component displays a single image from the provided path.

Usage: `<amplify-s3-image imagePath="path"></amplify-s3-image>`

Props:

The S3Image component does not have a config object like most other amplify-vue components. Instead it receives the S3 image path as a string. The path is required.

Events: None

## Interaction Components

### Chatbot

The Chatbot component allows your users to interact with an Amazon Lex chatbot.

Usage: `<amplify-chatbot></amplify-chatbot>`

Config:

```
<amplify-chatbot v-bind:chatbotConfig="chatbotConfig"></amplify-chatbot>
```

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
      <td data-column="Attribute">bot</td>
      <td data-column="Type">string</td>
      <td data-column="Description">
        the name of the chatbot as defined in your Amplify configuration under
        “aws_bots_config.name”
      </td>
      <td data-column="Default">N/A</td>
      <td data-column="Required">yes</td>
    </tr>
    <tr>
      <td data-column="Attribute">clearComplete</td>
      <td data-column="Type">boolean</td>
      <td data-column="Description">
        specifies whether the chat messages clear out at the end of the chat
        session
      </td>
      <td data-column="Default">true</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">botTitle</td>
      <td data-column="Type">string</td>
      <td data-column="Description">
        the name of the chatbot component in your frontend app
      </td>
      <td data-column="Default">'Chatbot'</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">conversationModeOn</td>
      <td data-column="Type">boolean</td>
      <td data-column="Description">turns voice conversation mode on/off</td>
      <td data-column="Default">false</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">voiceConfig</td>
      <td data-column="Type">object</td>
      <td data-column="Description">
        modifies the silence detection parameters
      </td>
      <td data-column="Default">
        {`{
          silenceDetectionConfig: {
            time: 2000,
            amplitude: 0.2,
          },
        }`}
      </td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">voiceEnabled</td>
      <td data-column="Type">boolean</td>
      <td data-column="Description">turns user voice input on/off</td>
      <td data-column="Default">false</td>
      <td data-column="Required">no</td>
    </tr>
    <tr>
      <td data-column="Attribute">textEnabled</td>
      <td data-column="Type">boolean</td>
      <td data-column="Description">turns user text input on/off</td>
      <td data-column="Default">true</td>
      <td data-column="Required">no</td>
    </tr>
  </tbody>
</table>

Note: In order for voice input to work with Amazon Lex, you may have to enable Output voice in the AWS Console. Under the Amazon Lex service, click on your configured Lex chatbot and go to Settings -> General and pick your desired Output voice. Then, click Build. If you have forgotten to enable Output voice, you will get an error like this:

```
ChatBot Error: Invalid Bot Configuration: This bot does not have a Polly voice ID associated with it. For voice interaction with the user, set a voice ID
```

If not in your aws-exports file, the bot can also be defined in the AWS configure method:

```
 Interactions: {
    bots: {
      "BookTrip": {
        "name": "BookTrip",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
```

Events:

- `AmplifyEventBus.$emit('chatComplete', this.options.botTitle)`: Emitted when a chat session has been completed (only if the clearComplete options is 'true')

## XR Components

### Sumerian Scene

The Sumerian Scene component provides you with a prebuilt UI for loading and displaying Amazon Sumerian scenes inside of your website.

<Callout>

Note: The UI component will inherit the height and width of the direct parent DOM element. Make sure to set the width and height styling on the parent DOM element to your desired size.

</Callout>
<br/>

Usage: `<amplify-sumerian-scene></amplify-sumerian-scene>`

Options:

```javascript
// scene-name: the configured friendly scene you would like to load
<amplify-sumerian-scene scene-name="scene1"></amplify-sumerian-scene>
```

See the [XR documentation](https://docs.amplify.aws/lib/xr/getting-started) for information on creating and publishing a Sumerian scene.
