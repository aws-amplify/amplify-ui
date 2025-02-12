<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';
import { Authenticator } from '@aws-amplify/ui-vue';

import aws_exports from './aws-exports';
import { AuthContext, emailRegex } from '@aws-amplify/ui';
Amplify.configure(aws_exports);

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
