# How To Use Spark Authenticator

## Usage Examples

### Default

```vue
<SparkProvider defaults>
  <Authenticator>

  </Authenticator>
</SparkProvider>

<script setup>
import { Authenticator, SparkProvider } from "@aws-amplify/spark-vue";

import "@aws-amplify/spark-vue/styles.css";
</script>
```

<SparkProvider defaults >

<Authenticator>

</Authenticator>

</SparkProvider>

<hr class="my-20"/>

### Sign In Click Event

```html
<SparkProvider defaults>
  <Authenticator>
    <template v-slot:sign-in>
      <SignIn
        @sign-in-button-clicked="signInPressed"
        :full-name-text="'blah'"
      />
    </template>
  </Authenticator>
</SparkProvider>

<script setup>
  import { SignIn, Authenticator, SparkProvider } from "@aws-amplify/spark-vue";

  import "@aws-amplify/spark-vue/styles.css";
</script>
```

<SparkProvider defaults >

<Authenticator>

<template v-slot:sign-in>

<SignIn @sign-in-button-clicked="signInPressed" :full-name-text="'blah'">
</SignIn>

</template>

</Authenticator>

</SparkProvider>

<hr class="my-20"/>

### Overriding Form Component

```html
<SparkProvider defaults>
  <Authenticator>
    <template v-slot:sign-in>
      <SignIn>
        <template v-slot:form="{ info }">
          <form class="grid gap-6 p-8 bg-green-200">
            <RenderInfo :info="info"></RenderInfo>
          </form>
        </template>
      </SignIn>
    </template>
  </Authenticator>
</SparkProvider>

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

<SparkProvider defaults>
  <Authenticator>
  <template v-slot:sign-in>

<SignIn>

  <template v-slot:form="{info}">
    <form class="grid gap-6  p-8  bg-green-200">
    <RenderInfo :info="info"/>
    </form>

  </template>

</SignIn>

  </template>
  </Authenticator>
</SparkProvider>

<hr class="my-20"/>

### Headless UI version

```html
<SparkProvider>
  <Authenticator> </Authenticator>
</SparkProvider>

<script setup>
  import { Authenticator, SparkProvider } from "@aws-amplify/spark-vue";
</script>
```

<SparkProvider>

<Authenticator>

</Authenticator>

</SparkProvider>

<hr class="my-20" />

### Update Forgot Password Button

```html
<SparkProvider defaults>
  <Authenticator>
    <template v-slot:sign-in>
      <SignIn>
        <template v-slot:forgot-password-button="{ onForgotPasswordClicked }">
          <button
            @click.prevent="forgotThePassword(onForgotPasswordClicked)"
            class="outline-black border-solid bg-color-blue"
          >
            Reset Mah Password
          </button>
        </template>
      </SignIn>
    </template>
  </Authenticator>
</SparkProvider>

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

<SparkProvider defaults>
  <Authenticator>

  <template v-slot:sign-in>
    <SignIn>
    <template v-slot:forgot-password-button="{ onForgotPasswordClicked }">
      <button @click.prevent="forgotThePassword(onForgotPasswordClicked)" class="outline-black border-solid bg-color-blue">forgot Mah Password</button>
       </template>
    </SignIn>
  </template>

  </Authenticator>
</SparkProvider>

## Authenticator Component

### Slots

| Name    |                        Description |
| ------- | ---------------------------------: |
| sign-in | Replaces the `<sign-in>` component |

<hr class="my-20" />

## SignIn Component

### Props

| Name           |  Type  |      Default       |                     Description |
| -------------- | :----: | :----------------: | ------------------------------: |
| sign-in-text   | string |  '{{signInText}}'  |    Sets text for sign in header |
| full-name-text | string | '{{fullNameText}}' | Sets text for full name in form |

### Slots

| Name                   |                  Description                   |               Scoped Slots                |
| ---------------------- | :--------------------------------------------: | :---------------------------------------: |
| form                   |       Replaces the `<form>` DOM Element        | Exposes `{ slotData }` default child data |
| full-name              | Replaces the `<span>` label text for Full name |                   None                    |
| forgot-password-button |      Replaces the forgot password button       |   Exposes `{ onForgotPasswordClicked }`   |
| sign-in-button         |          Replaces the sign in button           |    Exposes `{ onSignInButtonClicked }`    |

### Events

| Name                   |                                        Description |
| ---------------------- | -------------------------------------------------: |
| sign-in-button-clicked | Emits and overrides when sign in button is clicked |

<script setup>
import "@aws-amplify/spark-vue/styles.css";
import {SignIn, SparkProvider, Authenticator, RenderInfo, SIGN_IN_TEXT, FULL_NAME_TEXT}  from "@aws-amplify/spark-vue";


const signInText =  SIGN_IN_TEXT;
const fullNameText = FULL_NAME_TEXT;
const signInPressed = ()=>console.log('parent component sign in pressed');
const forgotThePassword = (fn)=>
{
  console.log('do something here then run function')
  //
  fn();
  console.log('forgot password inner');
}
</script>
<style >


</style>
