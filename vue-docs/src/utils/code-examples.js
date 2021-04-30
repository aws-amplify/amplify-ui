const defaultExample = `
    <authenticator> </authenticator>


  <script setup>
  import { Authenticator } from "@aws-amplify/spark-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `;
const overrideForgotPassword = `
      <authenticator>
        <template #sign-in-forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>

  <script setup>
  import {  Authenticator } from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `;
const overrideSignInButton = `
      <authenticator>
        <template #sign-in-button>
          <button class="text-white p-3 rounded-sm bg-blue-600">New Sign In Button</button>
        </template>
      </authenticator>

  <script setup>
  import {  Authenticator } from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `;
const headless = `
      <authenticator headless></authenticator>

    <script setup>
    import { Authenticator } from "@aws-amplify/ui-vue";
    <\/script>
    `;
const footer = `
      <authenticator>
        <template #sign-in-footer="{ info }">
          <h3>New Footer Details</h3>
          <footer data-amplify-footer>
            <render-info :info="info"></render-info>
          </footer>
        </template>
      </authenticator>

    <script setup>
    import { Authenticator, RenderInfo } from
                            "@aws-amplify/ui-vue";
    <\/script>
    `;

const confirmPassword = `
      <authenticator @sign-up-submit="over">
        <template #sign-up-fields>
          <sign-up-name-control />
          <sign-up-password-control />
          <div class="">
            <h3>Confirm Password</h3>
            <input
              type="password"
              name="confirm_password"
              class="block w-full mt-1 border-gray-300 rounded shadow-sm border p-2"
            />
            <div v-if="error" class="text-red-700">
              Passwords do not match.
            </div>
          </div>
          <sign-up-email-control />
          <sign-up-phone-control />
        </template>
      </authenticator>

    <script setup>
    import { Authenticator, SignUp,
     SignUpNameControl, SignUpPasswordControl, SignUpPhoneControl,
     SignUpEmailControl  } from "@aws-amplify/ui-vue";

    const over = event => {
      const formData = new FormData(event.target);
      const values = Object.fromEntries(formData);
      if (values.password !== values.confirm_password) {
        error.value = true;
      } else {
       error.value = false;
        const phoneS = \`\${values.phone_number_prefix}\${values.phone_number}\`.replace(
          /[^A-Z0-9+]/gi,
          ""
        );
        delete values.phone_number_prefix;
        delete values.confirm_password;
        send({
          type: "SUBMIT",
          data: { ...values, phone_number: phoneS }
        });
      }
    };

    <\/script>
    
    `;

const slotTable =
  " | Name                   |                  Description                   |                           Scoped Slots                           |      Component              |   \n" +
  " | ---------------------- | :--------------------------------------------: | :--------------------------------------------------------------: | :--------------------------: | \n" +
  " | form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ info, onSignInSubmit, onCreateAccountClicked, onForgotPasswordClicked }**         | **<sign-in>**               | \n" +
  " | name              | Replaces the **<span>** label text for Username or Email or Phone Number |                               None                             | **<sign-in>**               | \n" +
  " | forgot-password-button |      Replaces the forgot password button       |              Exposes  **{ onForgotPasswordClicked }**            | **<sign-in>**               | \n" +
  " | sign-in-button         |          Replaces the sign in button           |               Exposes **{ onSignInSubmit }**              | **<sign-in>**               | \n" +
  "| heading                |           Replaces the heading text            |                               none                               | **<sign-in>**                | \n" +
  "| footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInSubmit, info, onCreateAccountClicked }** | **<sign-in>**           | \n" +
  " | additional-fields      | Space below password input   |                               None                             | **<sign-in>**               | \n" +
  " | signup-fields      | Replaces Sign Up Fields|                               Exposes **{ info }**                              | **<sign-up>**               | \n" +
  " | footer      | Replaces footer at the bottom | Exposes **{info, onHaveAccountClicked, onSignUpSubmit}**                             | **<sign-up>** | \n" +
  " | footer-left      | Replaces the footer on the left  | Exposes **{ onHaveAccountClicked }** | **<sign-up>**               | \n" +
  " | footer-right      | Replaces the footer on the right | Exposes **{ onSignUpSubmit }**   | **<sign-up>**               | \n" +
  " | footer      | Replaces footer at the bottom | Exposes **{info, onBackToSignInClicked, onConfirmSignUpSubmit}**                             | **<confirm-sign-up>** | \n" +
  "| sign-in | Replaces sign-in                    |   None |  **<authenticator>**         | \n" +
  "| sign-up | Replaces sign-up                    |    None |  **<authenticator>**         | \n" +
  "| confirm-sign-up | Replaces confirm-sign-up                    |  None  |  **<authenticator>**         | \n" +
  "| sign-in-button | Replaces the sign in button                    |    Exposes **{ onSignInSubmit }**                        |  **<authenticator>**         | \n" +
  "| sign-in-forgot-password-button | Replaces the forgot password button                    |    Exposes **{ onForgotPasswordClicked }**                        |  **<authenticator>**         | \n" +
  "| sign-in-heading                |           Replaces the heading text            |                               none                               | **<authenticator>**                | \n" +
  "| sign-in-footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInSubmit, info, onCreateAccountClicked }** | **<authenticator>**           | \n" +
  " | sign-in-form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ info, onSignInSubmit, onCreateAccountClicked, onForgotPasswordClicked }**         | **<authenticator>**               | \n" +
  " | sign-in-name              | Replaces the **<span>** label text for Full name |                               None                             | **<authenticator>**               | \n" +
  " | sign-up-fields      | Replaces Sign Up fields   |                               Exposes **{ info }** default child data                             | **<authenticator>**               | \n" +
  " | sign-up-footer      | Replaces footer at the bottom | Exposes **{info, onHaveAccountClicked, onSignUpSubmit}**                             | **<authenticator>** | \n" +
  " | sign-up-footer-left      | Replaces the footer on the left  | Exposes **{ onHaveAccountClicked }** | **<authenticator>**               | \n" +
  " | sign-up-footer-right      | Replaces the footer on the right | Exposes **{ onSignUpSubmit }**   | **<authenticator>**               | \n";

const eventTable =
  "| Name                    |                                                Description | Component | \n" +
  "| ----------------------- | :---------------------------------------------------------: | :----------------: \n" +
  "| sign-in-submit  |         Emits and overrides when sign in button is submitted | **<sign-in>**    | \n" +
  "| forgot-password-clicked | Emits and overrides when forgot password button is clicked | **<sign-in>**    |\n" +
  "| create-account-clicked  |  Emits and overrides when create account button is clicked | **<sign-in>**    |\n" +
  "| sign-up-submit  |  Emits and overrides when sign up button is submitted | **<sign-up>**    |\n" +
  "| have-account-clicked    |  Emits and overrides when have account button is clicked | **<sign-up>**    |\n" +
  "| confirm-sign-up-submit  |  Emits and overrides when confirm sign up button is submitted | **<confirm-sign-up>**    |\n" +
  "| back-to-sign-in-clicked  |  Emits and overrides when the back to sign in button is clicked| **<confirm-sign-up>**    |\n" +
  "| lost-code-clicked  |  Emits and overrides when lost code button is clicked | **<confirm-sign-up>**    |\n" +
  "| sign-in-submit  |         Emits and overrides when sign in button is submitted | **<authenticator>**    | \n" +
  "| sign-up-submit  |  Emits and overrides when sign up button is submitted | **<authenticator>**    |\n" +
  "| confirm-sign-up-submit  |  Emits and overrides when confirm sign up button is submitted | **<authenticator>**    |\n";

const propTable =
  "| Name                    |                                                Description | Component | \n" +
  "| ----------------------- | :---------------------------------------------------------: | :----------------: \n" +
  "| headless  | Removes styles | **<authenticator>**    | \n" +
  "| headless |  Removes styles | **<sign-up>**    |\n" +
  "| headless |  Removes styles | **<sign-in>**    |\n" +
  "| headless |  Removes styles| **<confirm-sign-up>**    |\n" +
  "| usernameAlias|Username Alias is used to setup authentication with `username`, `email` or `phone_number`  |**<authenticator>**    |\n" +
  "| usernameAlias|Username Alias is used to setup authentication with `username`, `email` or `phone_number`  |**<sign-in>**    |\n" +
  "| usernameAlias|Username Alias is used to setup authentication with `username`, `email` or `phone_number`  |**<sign-up>**    |\n" +
  "| usernameAlias|Username Alias is used to setup authentication with `username`, `email` or `phone_number`  |**<confirm-password>**    |\n";

const exampleSignIn = `
    <div class="css-example">
        <authenticator>
          <h1 class="text-6xl mb-10">
            Welcome {{ state?.context?.user?.username }}!
          </h1>
          <button
            className="px-2 bg-white rounded shadow"
            @click="send('SIGN_OUT')"
          >
            Sign Out
          </button>
        </authenticator>
    </div>


   <script setup>
    import { Authenticator } from "@aws-amplify/spark-vue";

    import "@aws-amplify/ui-vue/styles.css";
   <\/script

    <style>
      .css-example
        [data-amplify-authenticator]
        [data-amplify-footer]
        [data-amplify-button]:last-of-type {
        background-color: orange;
        color: purple;
      }
    </style>

    `;

export {
  defaultExample,
  overrideForgotPassword,
  overrideSignInButton,
  headless,
  footer,
  confirmPassword,
  slotTable,
  eventTable,
  exampleSignIn,
  propTable
};
