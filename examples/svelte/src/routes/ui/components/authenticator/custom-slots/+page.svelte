<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import awsExports from './aws-exports';

  Amplify.configure(awsExports);

const { toForgotPassword, toSignIn } = $derived(useAuthenticator());

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  setupEmail: {
    email: {
      label: 'New Label',
      placeholder: 'Enter your Email Address:',
    }
  }
};
</script>

{#snippet header()}
  <div style="padding: var(--amplify-space-large); text-align: center">
    <img
      class="amplify-image"
      alt="Amplify logo"
      src="https://docs.amplify.aws/assets/logo-dark.svg"
    />
  </div>
{/snippet}
{#snippet signInHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Sign in to your account
  </h3>
{/snippet}
{#snippet signInFooter()}
  <div style="text-align: center">
    <button
      onclick={toForgotPassword}
      class="amplify-button amplify-field-group__control"
      data-fullwidth="false"
      data-size="small"
      data-variation="link"
      type="button"
      style="font-weight: normal"
    >
      Reset Password
    </button>
  </div>
{/snippet}
{#snippet signUpHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Create a new account
  </h3>
{/snippet}
{#snippet signUpFooter()}
  <div style="text-align: center">
    <button
      onclick={toSignIn}
      class="amplify-button amplify-field-group__control"
      data-fullwidth="false"
      data-size="small"
      data-variation="link"
      type="button"
      style="font-weight: normal"
    >
      Back to Sign In
    </button>
  </div>
{/snippet}
{#snippet footer()}
  <div style="padding: var(--amplify-space-large); text-align: center">
    <p
      class="amplify-text"
      style="color: var(--amplify-colors-neutral-80)"
    >
      © All Rights Reserved
    </p>
  </div>
{/snippet}
{#snippet confirmSignUpHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Enter Information:
  </h3>
{/snippet}
{#snippet confirmSignUpFooter()}
  <div>Footer Information</div>
{/snippet}
{#snippet setupTotpHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Enter Information:
  </h3>
{/snippet}
{#snippet setupTotpFooter()}
  <div>Footer Information</div>
{/snippet}
{#snippet confirmSignInHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Enter Information:
  </h3>
{/snippet}
{#snippet confirmSignInFooter()}
  <div>Footer Information</div>
{/snippet}
{#snippet forgotPasswordHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Enter Information:
  </h3>
{/snippet}
{#snippet forgotPasswordFooter()}
  <div>Footer Information</div>
{/snippet}
{#snippet confirmResetPasswordHeader()}
  <h3
    class="amplify-heading"
    style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
  >
    Enter Information:
  </h3>
{/snippet}
{#snippet confirmResetPasswordFooter()}
  <div>Footer Information</div>
{/snippet}
{#snippet selectMfaTypeHeader()}
  <h3 class="amplify-heading">
    Select Desired MFA Type
  </h3>
{/snippet}
{#snippet selectMfaTypeFooter()}
  <div>Footer Information</div>
{/snippet}
{#snippet setupEmailHeader()}
  <h3 class="amplify-heading">
    Email MFA Setup
  </h3>
{/snippet}
{#snippet setupEmailFooter()}
  <div>Footer Information</div>
{/snippet}

<Authenticator formFields={formFields} components={{
  Header: header,
  Footer: footer,
  SignIn: {
    Header: signInHeader,
    Footer: signInFooter,
  },
  SignUp: {
    Header: signUpHeader,
    Footer: signUpFooter,
  },
  ConfirmSignUp: {
    Header: confirmSignUpHeader,
    Footer: confirmSignUpFooter,
  },
  SetupTotp: {
    Header: setupTotpHeader,
    Footer: setupTotpFooter,
  },
  ConfirmSignIn: {
    Header: confirmSignInHeader,
    Footer: confirmSignInFooter,
  },
  ForgotPassword: {
    Header: forgotPasswordHeader,
    Footer: forgotPasswordFooter,
  },
  ConfirmResetPassword: {
    Header: confirmResetPasswordHeader,
    Footer: confirmResetPasswordFooter,
  },
  SelectMfaType: {
    Header: selectMfaTypeHeader,
    Footer: selectMfaTypeFooter,
  },
  SetupEmail: {
    Header: setupEmailHeader,
    Footer: setupEmailFooter,
  }
}}>
  {#snippet children({user, signOut})}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>
