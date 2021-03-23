## Sign Up Tester

<spark-provider defaults>
<authenticator>

<template v-slot:sign-in>

<sign-up>

</sign-up>

</template>

</authenticator>
</spark-provider>

<script setup>
import "@aws-amplify/spark-vue/styles.css";
import {SignIn, SignUp, SparkProvider, Authenticator, RenderInfo, SIGN_IN_TEXT, FULL_NAME_TEXT}  from "@aws-amplify/spark-vue";


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
