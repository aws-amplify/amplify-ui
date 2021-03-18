## hello world

<spark-provider defaults>
<authenticator>

<template v-slot:sign-in>

<sign-in>
<template v-slot:footer="{ info, onSignInButtonClicked}">

<footer data-spark-footer="">
<RenderInfo :info="info"/>
</footer>

</template>
</sign-in>

</template>

</authenticator>
</spark-provider>

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
