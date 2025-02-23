<script setup lang="ts">
import { computed, toRefs } from 'vue';

import {
    authenticatorTextUtil,
    getFormDataFromEvent,
    translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';

const random = Math.floor(Math.random() * 999999);

const facade: UseAuthenticator = useAuthenticator();
const { submitForm, toSignIn, updateForm } = facade;
const { error, isPending, challengeName: challengeNameRef, allowedMfaTypes } = toRefs(facade);

const challengeName = computed(() => challengeNameRef.value);

const { getBackToSignInText, getConfirmText, getSelectMfaTypeByChallengeName, getMfaTypeLabelByValue, getSelectMfaTypeText } =
    authenticatorTextUtil;

const selectMfaTypeHeading = computed(() =>
    getSelectMfaTypeByChallengeName(challengeName.value)
);
const backSignInText = computed(() => getBackToSignInText());
const confirmText = computed(() => getConfirmText());
const selectMfaTypeText = computed(() => getSelectMfaTypeText())

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
                        <base-label
                            class="amplify-visually-hidden amplify-label"
                            :id="`amplify-field-${random}`"
                        >
                            {{ selectMfaTypeText }}
                        </base-label>
                        <base-wrapper
                            class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
                            :aria-labelledby="`amplify-field-${random}`"
                        >
                            <template
                                v-for="mfaType in allowedMfaTypes"
                                :key="mfaType"
                            >
                                <base-label
                                    class="amplify-flex amplify-radio"
                                    data-amplify-selectmfatype-label
                                >
                                    <base-text class="amplify-text amplify-radio__label">
                                        {{ getMfaTypeLabelByValue(mfaType) }}
                                    </base-text>
                                    <base-input
                                        class="amplify-input amplify-field-group__control amplify-visually-hidden amplify-radio__input"
                                        aria-invalid="false"
                                        data-amplify-selectmfatype-input
                                        name="mfa_type"
                                        type="radio"
                                        :value="mfaType"
                                    >
                                    </base-input>
                                    <base-text
                                        class="amplify-flex amplify-radio__button"
                                        aria-hidden="true"
                                    />
                                </base-label>
                            </template>
                        </base-wrapper>
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