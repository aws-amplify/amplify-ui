# How To Use Spark Authenticator Sign In

## Usage Examples

### Default

```vue
<SparkAuthentication>
  <SparkAuthenticationSignIn defaults> </SparkAuthenticationSignIn>
</SparkAuthentication>

<script setup>
import {
  SparkAuthenticationSignIn,
  SparkAuthentication,
} from "@aws-amplify/spark-vue";

import "@aws-amplify/spark-vue/styles.css";
</script>
```

<SparkAuthentication>
  <SparkAuthenticationSignIn defaults >
  </SparkAuthenticationSignIn>

</SparkAuthentication>

<hr class="my-20"/>

### Sign In Click Event

```html
<SparkAuthentication>
  <SparkAuthenticationSignIn defaults @onSignInPressed="signInPressed">
  </SparkAuthenticationSignIn>
</SparkAuthentication>

<script setup>
  import {
    SparkAuthenticationSignIn,
    SparkAuthentication,
  } from "@aws-amplify/spark-vue";

  import "@aws-amplify/spark-vue/styles.css";
</script>
```

<SparkAuthentication>

<SparkAuthenticationSignIn defaults @onSignInPressed="signInPressed">
</SparkAuthenticationSignIn>

</SparkAuthentication>

<hr class="my-20"/>

### Overriding Form Component

```html
<SparkAuthentication>
  <SparkAuthenticationSignIn defaults>
    <template v-slot:form="{ info }">
      <form class="grid gap-6 p-8 bg-green-200">
        <RenderInfo :info="info"></RenderInfo>
      </form>
    </template>
  </SparkAuthenticationSignIn>
</SparkAuthentication>

<script setup>
  import {
    SparkAuthenticationSignIn,
    SparkAuthentication,
    RenderInfo,
  } from "@aws-amplify/spark-vue";

  import "@aws-amplify/spark-vue/styles.css";
</script>
```

<SparkAuthentication>

<SparkAuthenticationSignIn defaults>

<template v-slot:form="{ info }">
    <form class="grid gap-6 p-8 bg-green-200">

<RenderInfo :info="info"></RenderInfo>

</form>

</template>

</SparkAuthenticationSignIn>

</SparkAuthentication>

<hr class="my-20"/>

### Headless UI version

```html
<SparkAuthentication>
  <SparkAuthenticationSignIn />
</SparkAuthentication>

<script setup>
  import {
    SparkAuthenticationSignIn,
    SparkAuthentication,
  } from "@aws-amplify/spark-vue";
</script>
```

<SparkAuthentication>

<SparkAuthenticationSignIn >

</SparkAuthenticationSignIn>

</SparkAuthentication>

<hr class="my-20" />

## Authentication Sign In API

### Props

| Name                |  Type  |      Default       |                     Description |
| ------------------- | :----: | :----------------: | ------------------------------: |
| signIntoAccountText | string |  '{{signInText}}'  |    Sets text for sign in header |
| fullNameText        | string | '{{fullNameText}}' | Sets text for full name in form |

### Slots

| Name     |                                    Description |
| -------- | ---------------------------------------------: |
| form     |              Replaces the `<form>` DOM Element |
| fullName | Replaces the `<span>` label text for Full name |

### Events

| Name          |                            Description |
| ------------- | -------------------------------------: |
| signInPressed | Emitted when sign in button is clicked |

### CSS Variables

| Name               | Default |
| ------------------ | ------: |
| --background-color |   white |

<script setup>
import "@aws-amplify/spark-vue/styles.css";
import {SparkAuthenticationSignIn, SparkAuthentication, RenderInfo, SIGN_IN_TEXT, FULL_NAME_TEXT}  from "@aws-amplify/spark-vue";


const signInText =  SIGN_IN_TEXT;
const fullNameText = FULL_NAME_TEXT;
const signInPressed = ()=>console.log('parent component sign in pressed');
</script>
<style>


</style>
