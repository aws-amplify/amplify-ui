# How To Use Spark Authenticator

## Usage Examples

### Default

```vue
<spark-provider defaults>
  <authenticator>

  </authenticator>
</spark-provider>

<script setup>
import { Authenticator, SparkProvider } from "@aws-amplify/spark-vue";

import "@aws-amplify/spark-vue/styles.css";
</script>
```

<spark-provider defaults >

<authenticator>

</authenticator>

</spark-provider>

<hr class="my-20"/>

### Sign In Click Event

```html
<spark-provider defaults>
  <authenticator>
    <template v-slot:sign-in>
      <sign-in
        @sign-in-button-clicked="signInPressed"
        :full-name-text="'blah'"
      />
    </template>
  </authenticator>
</spark-provider>

<script setup>
  import { SignIn, Authenticator, SparkProvider } from "@aws-amplify/spark-vue";

  import "@aws-amplify/spark-vue/styles.css";
</script>
```

<spark-provider defaults >

<authenticator>

<template v-slot:sign-in>

<sign-in @sign-in-button-clicked="signInPressed" :full-name-text="'blah'">
</sign-in>

</template>

</authenticator>

</spark-provider>

<hr class="my-20"/>

### Overriding Form Component

```html
<spark-provider defaults>
  <authenticator>
    <template v-slot:sign-in>
      <sign-in>
        <template v-slot:form="{ info }">
          <form class="grid gap-6 p-8 bg-green-200">
            <RenderInfo :info="info"></RenderInfo>
          </form>
        </template>
      </sign-in>
    </template>
  </authenticator>
</spark-provider>

<script setup>
  import {
    SignIn,
    Authenticator,
    SparkProvider,
    RenderInfo,
  } from "@aws-amplify/spark-vue";

  import "@aws-amplify/spark-vue/styles.css";

  const signInPressed = () => console.log("test");
</script>
```

<spark-provider defaults>
  <authenticator>
  <template v-slot:sign-in>

<sign-in>

  <template v-slot:form="{info}">
    <form class="grid gap-6  p-8  bg-green-200">
    <render-info :info="info"/>
    </form>

  </template>

</sign-in>

  </template>
  </authenticator>
</spark-provider>

<hr class="my-20"/>

### Headless UI version

```html
<spark-provider>
  <authenticator> </authenticator>
</spark-provider>

<script setup>
  import { Authenticator, SparkProvider } from "@aws-amplify/spark-vue";
</script>
```

<spark-provider>

<authenticator>

</authenticator>

</spark-provider>

<hr class="my-20" />

### Update Forgot Password Button

```html
<spark-provider defaults>
  <authenticator>
    <template v-slot:sign-in>
      <sign-in>
        <template v-slot:forgot-password-button="{ onForgotPasswordClicked }">
          <button
            @click.prevent="forgotThePassword(onForgotPasswordClicked)"
            class="outline-black border-solid bg-color-blue"
          >
            Reset Mah Password
          </button>
        </template>
      </sign-in>
    </template>
  </authenticator>
</spark-provider>

<script setup>
  import {
    SignIn,
    Authenticator,
    SparkProvider,
    RenderInfo,
  } from "@aws-amplify/spark-vue";

  import "@aws-amplify/spark-vue/styles.css";

  const forgotThePassword = (fn) => fn();
</script>
```

<spark-provider defaults>
  <authenticator>

  <template v-slot:sign-in>
    <sign-in>
    <template v-slot:forgot-password-button="{ onForgotPasswordClicked }">
      <button @click.prevent="forgotThePassword(onForgotPasswordClicked)" class="outline-black border-solid bg-color-blue">forgot Mah Password</button>
       </template>
    </sign-in>
  </template>

  </authenticator>
</spark-provider>

## `<authenticator/>` Component

### Slots

| Name    |                        Description |
| ------- | ---------------------------------: |
| sign-in | Replaces the `<sign-in>` component |

<hr class="my-20" />

## `<sign-in/>` Component

### Props

_All texts are provided by internationalization_

### Slots

| Name                   |                  Description                   |                           Scoped Slots                           |
| ---------------------- | :--------------------------------------------: | :--------------------------------------------------------------: |
| form                   |       Replaces the `<form>` DOM Element        |            Exposes `{ slotData }` default child data             |
| full-name              | Replaces the `<span>` label text for Full name |                               None                               |
| forgot-password-button |      Replaces the forgot password button       |              Exposes `{ onForgotPasswordClicked }`               |
| sign-in-button         |          Replaces the sign in button           |               Exposes `{ onSignInButtonClicked }`                |
| heading                |           Replaces the heading text            |                               none                               |
| footer                 |      Replaces the `<footer>` DOM element       | Exposes `{ onSignInButtonClicked, info,onCreateAccountClicked }` |

### Events

| Name                    |                                                Description |
| ----------------------- | ---------------------------------------------------------: |
| sign-in-button-clicked  |         Emits and overrides when sign in button is clicked |
| forgot-password-clicked | Emits and overrides when forgot password button is clicked |
| create-account-clicked  |  Emits and overrides when create account button is clicked |

<script setup>
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';


Amplify.configure(aws_exports);
import "@aws-amplify/spark-vue/styles.css";
import {SignIn, SparkProvider, Authenticator, RenderInfo, SIGN_IN_TEXT, FULL_NAME_TEXT}  from "@aws-amplify/spark-vue";


const signInText =  SIGN_IN_TEXT;
const fullNameText = FULL_NAME_TEXT;
const username = 'icystorm+add123@gmail.com';
const password = 'Asdfasdf@1'
const test = async ()=> {
  try {
        const { user } = await Auth.signUp({
            username,
            password,
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }

}
const signInPressed = ()=>console.log('parent component sign in pressed');
const forgotThePassword = async (fn)=>
{
  console.log('do something here then run function')
  //
  test();
  fn();
  console.log('forgot password inner');
}
</script>
<style >


</style>
