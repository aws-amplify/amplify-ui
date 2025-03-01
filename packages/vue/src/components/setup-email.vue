<script setup lang="ts">
import { computed, toRefs } from 'vue';

import {
    authenticatorTextUtil,
    getFormDataFromEvent,
    translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import type { UseAuthenticator } from '../types';
import BaseFormFields from './primitives/base-form-fields.vue';

const facade: UseAuthenticator = useAuthenticator();
const { submitForm, toSignIn, updateForm } = facade;
const { error, isPending, } = toRefs(facade);

const { getBackToSignInText, getConfirmText, getSetupEmailText } =
    authenticatorTextUtil;

const setupEmailHeading = computed(() =>
    getSetupEmailText()
);
const backSignInText = computed(() => getBackToSignInText());
const confirmText = computed(() => getConfirmText());

const onInput = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    updateForm({ name, value });
};

const onSetupEmailSubmit = (e: Event) => {
    submitForm(getFormDataFromEvent(e));
};

const onBackToSignInClicked = () => {
    toSignIn();
};
</script>

<template>
    <slot
        v-bind="$attrs"
        name="setupEmailSlotI"
    >
        <base-wrapper v-bind="$attrs">
            <base-form
                data-amplify-authenticator-setupemail
                @input="onInput"
                @submit.prevent="onSetupEmailSubmit"
            >
                <base-field-set
                    class="amplify-flex amplify-authenticator__column"
                    :disabled="isPending"
                >
                    <slot name="header">
                        <base-heading
                            :level="3"
                            class="amplify-heading"
                        >
                            {{ setupEmailHeading }}
                        </base-heading>
                    </slot>
                    <base-wrapper class="amplify-flex amplify-authenticator__column">
                        <base-form-fields route="setupEmail"></base-form-fields>
                    </base-wrapper>
                    <base-footer class="amplify-flex amplify-authenticator__column">
                        <base-alert v-if="error">
                            {{ translate(error) }}
                        </base-alert>
                        <amplify-button
                            class="amplify-field-group__control amplify-authenticator__font"
                            :fullwidth="false"
                            :loading="false"
                            :variation="'primary'"
                            style="font-weight: normal"
                            :disabled="isPending"
                        >
                            {{ confirmText }}
                        </amplify-button>
                        <amplify-button
                            class="amplify-field-group__control amplify-authenticator__font"
                            :fullwidth="false"
                            :size="'small'"
                            :variation="'link'"
                            style="font-weight: normal"
                            type="button"
                            @click.prevent="onBackToSignInClicked"
                        >
                            {{ backSignInText }}
                        </amplify-button>
                        <slot name="footer"> </slot>
                    </base-footer>
                </base-field-set>
            </base-form>
        </base-wrapper>
    </slot>
</template>
