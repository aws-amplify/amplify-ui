<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';

  import awsExports from './aws-exports';

  Amplify.configure(awsExports);

  const customServices = {
    handleSignIn: async () => {
      return {
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION',
          allowedMFATypes: ['EMAIL', 'TOTP']
        }
      };
    },
    handleConfirmSignIn: async ({ challengeResponse }) => {
      if (challengeResponse === 'EMAIL') {
        return {
          isSignedIn: false,
          nextStep: {
            signInStep: 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP'
          }
        };
      }
      if (challengeResponse.includes('@example.com')) {
        return {
          isSignedIn: false,
          nextStep: {
            signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
            codeDeliveryDetails: {
              destination: 'a***@e***.com',
              deliveryMedium: 'EMAIL',
              attributeName: 'email'
            }
          }
        };
      }
      if (challengeResponse === '123456') {
        return {
          isSignedIn: true,
          nextStep: {
            signInStep: 'DONE'
          }
        };
      }
      throw new Error('Invalid code or auth state for the user.');
    },
    getCurrentUser: async () => {
      return {
        userId: '******************',
        username: 'james'
      };
    }
  };
</script>

<Authenticator services={customServices}>
  {#snippet children ({ user, signOut })}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>

