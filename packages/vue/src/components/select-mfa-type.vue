<script setup lang="ts">
import { computed, toRefs } from 'vue';

import {
    authenticatorTextUtil,
    getFormDataFromEvent,
    translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';
import BaseFormFields from './primitives/base-form-fields.vue';


const facade: UseAuthenticator = useAuthenticator();
const { submitForm, toSignIn, updateForm } = facade;
const { error, isPending, challengeName: challengeNameRef } = toRefs(facade);

const challengeName = computed(() => challengeNameRef.value);

const { getBackToSignInText, getConfirmText, getSelectMfaTypeByChallengeName } =
    authenticatorTextUtil;

const selectMfaTypeHeading = computed(() =>
    getSelectMfaTypeByChallengeName(challengeName.value)
);
const backSignInText = computed(() => getBackToSignInText());
const confirmText = computed(() => getConfirmText());

const onInput = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    updateForm({ name, value });
};

const onSelectMfaTypeSubmit = (e: Event) => {
    submitForm(getFormDataFromEvent(e));
};

const onBackToSignInClicked = () => {
    toSignIn();
};
</script>

<template>
    <slot
        v-bind="$attrs"
        name="selectMfaTypeSlotI"
    >
        <base-wrapper v-bind="$attrs">
            <base-form
                data-amplify-authenticator-selectmfatype
                @input="onInput"
                @submit.prevent="onSelectMfaTypeSubmit"
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
                            {{ selectMfaTypeHeading }}
                        </base-heading>
                    </slot>
                    <base-wrapper class="amplify-flex amplify-authenticator__column">
                        <base-form-fields route="selectMfaType"></base-form-fields>
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