<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { AuthContext } from '@aws-amplify/ui';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const customServices: AuthContext['services'] = {
    handleSignIn: async () => {
        return {
            isSignedIn: false,
            nextStep: {
                signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION',
                allowedMFATypes: ['EMAIL', 'TOTP'],
            },
        };
    },
    handleConfirmSignIn: async ({ challengeResponse }) => {
        if (challengeResponse === 'EMAIL') {
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
                    codeDeliveryDetails: {
                        destination: 'a***@e***.com',
                        deliveryMedium: 'EMAIL',
                        attributeName: 'email',
                    },
                },
            };
        }

        if (/^\d{6}$/.test(challengeResponse)) {
            return {
                isSignedIn: true,
                nextStep: {
                    signInStep: 'DONE',
                },
            };
        }
        throw new Error('Invalid code or auth state for the user.');
    },
    getCurrentUser: async () => {
        return {
            userId: '******************',
            username: 'james',
        };
    },
};
</script>

<template>
    <authenticator :services="customServices">
        <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.username }}!</h1>
            <button @click="signOut">Sign Out</button>
        </template>
    </authenticator>
</template>
