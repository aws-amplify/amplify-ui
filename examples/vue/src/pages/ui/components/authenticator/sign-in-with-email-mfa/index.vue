<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const customServices = {
    handleSignIn: async () => {
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
    },
    handleConfirmSignIn: async ({ challengeResponse }) => {
        if (challengeResponse === '123456') {
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
