const defaultExample = `
  <amplify-provider defaults>
    <authenticator> </authenticator>
  </amplify-provider>


  <script setup>
  import { Authenticator, AmplifyProvider } from "@aws-amplify/spark-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `;
const overrideForgotPassword = `
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </amplify-provider>

  <script setup>
  import {  Authenticator, AmplifyProvider } from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `;
const overrideSignInButton = `
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-button>
          <button class="text-white p-3 rounded-sm bg-blue-600">New Sign In Button</button>
        </template>
      </authenticator>
    </amplify-provider>

  <script setup>
  import {  Authenticator, AmplifyProvider } from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `;
const headless = `
    <amplify-provider>
      <authenticator></authenticator>
    </amplify-provider>

    <script setup>
    import { Authenticator, AmplifyProvider } from "@aws-amplify/ui-vue";
    <\/script>
    `;
const footer = `
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-footer="{ info }">
          <h3>New Footer Details</h3>
          <footer data-amplify-footer>
            <render-info :info="info"></render-info>
          </footer>
        </template>
      </authenticator>
    </amplify-provider

    <script setup>
    import { Authenticator, AmplifyProvider, RenderInfo } from
                                        "@aws-amplify/ui-vue";
    <\/script>
    `;

const confirmPassword = `
    <amplify-provider defaults>
      <authenticator @sign-up-submit="over">
        <template #sign-up-fields>
          <sign-up-username-control />
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
    </amplify-provider>

    <script setup>
    import { Authenticator, AmplifyProvider, SignUp,
     SignUpUsernameControl, SignUpPasswordControl, SignUpPhoneControl,
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
  " | form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ info }** default child data         | **<sign-in>**               | \n" +
  " | full-name              | Replaces the **<span>** label text for Full name |                               None                             | **<sign-in>**               | \n" +
  " | forgot-password-button |      Replaces the forgot password button       |              Exposes  **{ onForgotPasswordClicked }**            | **<sign-in>**               | \n" +
  " | sign-in-button         |          Replaces the sign in button           |               Exposes **{ onSignInSubmit }**              | **<sign-in>**               | \n" +
  "| heading                |           Replaces the heading text            |                               none                               | **<sign-in>**                | \n" +
  "| footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInSubmit, info, onCreateAccountClicked }** | **<sign-in>**           | \n" +
  " | additional-fields      | Space below password input   |                               None                             | **<sign-in>**               | \n" +
  " | signup-fields      | Replaces Sign Up Fields|                               Exposes **{ info }** default child data                             | **<sign-up>**               | \n" +
  " | footer      | Replaces footer at the bottom | Exposes **{info, onHaveAccountClicked, onSignUpSubmit}**                             | **<sign-up>** | \n" +
  " | footer-left      | Replaces the footer on the left  | Exposes **{ onHaveAccountClicked }** | **<sign-up>**               | \n" +
  " | footer-right      | Replaces the footer on the right | Exposes **{ onSignUpSubmit }**   | **<sign-up>**               | \n" +
  "| sign-in-button | Replaces the sign in button                    |    Exposes **{ onSignInSubmit }**                        |  **<authenticator>**         | \n" +
  "| sign-in-forgot-password-button | Replaces the forgot password button                    |    Exposes **{ onForgotPasswordClicked }**                        |  **<authenticator>**         | \n" +
  "| sign-in-heading                |           Replaces the heading text            |                               none                               | **<authenticator>**                | \n" +
  "| sign-in-footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInSubmit, info, onCreateAccountClicked }** | **<authenticator>**           | \n" +
  " | sign-in-form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ info }** default child data         | **<authenticator>**               | \n" +
  " | sign-in-full-name              | Replaces the **<span>** label text for Full name |                               None                             | **<authenticator>**               | \n" +
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
  "| sign-in-submit  |         Emits and overrides when sign in button is submitted | **<authenticator>**    | \n" +
  "| sign-up-submit  |  Emits and overrides when sign up button is submitted | **<authenticator>**    |\n";

const exampleSignIn = `
    <div class="css-example">
      <amplify-provider defaults>
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
      </amplify-provider>
    </div>


   <script setup>
    import { Authenticator, AmplifyProvider } from "@aws-amplify/spark-vue";

    import "@aws-amplify/ui-vue/styles.css";
   <\/script

    <style>
      .css-example
        [data-amplify-theme]
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
  exampleSignIn
};
