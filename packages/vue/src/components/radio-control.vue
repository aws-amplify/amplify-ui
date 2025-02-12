<script setup lang="ts">
import { toRefs } from 'vue';
interface RadioControlProps {
    label: string;
    name: string;
    labelHidden?: boolean;
    required?: boolean;
    hasError?: boolean;
    describedBy?: string;
    radioOptions?: { label: string; value: string }[]
}

const props = defineProps<RadioControlProps>();


const {
    label: fieldLabel,
    name,
    labelHidden,
    required,
    hasError,
    describedBy,
    radioOptions
} = toRefs(props);

const random = Math.floor(Math.random() * 999999);
</script>

<template>
    <base-wrapper
        class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
        role="radiogroup"
        :aria-invalid="hasError"
        :aria-describedby="describedBy"
    >
        <base-label
            class="amplify-label"
            :class="{ 'amplify-visually-hidden': labelHidden }"
            :id="'amplify-field-' + random"
        >
            {{ fieldLabel }}
        </base-label>
        <base-wrapper
            class="amplify-flex amplify-field amplify-radiogroup amplify-authenticator__column"
            :aria-labelledby="'amplify-field-' + random"
        >
            <template
                v-for="({ label, value }) in radioOptions"
                :key="value"
            >
                <base-label
                    class="amplify-flex amplify-radio"
                    data-amplify-radio-control-label
                >
                    <base-text class="amplify-text amplify-radio__label">
                        {{ label }}
                    </base-text>
                    <base-input
                        class="amplify-input amplify-field-group__control amplify-visually-hidden amplify-radio__input"
                        :aria-invalid="hasError"
                        data-amplify-radio-control-input
                        :name="name"
                        type="radio"
                        :value="value"
                        :required="required"
                        :aria-labelledby="'amplify-field-' + random"
                    >
                    </base-input>
                    <base-text
                        class="amplify-flex amplify-radio__button"
                        aria-hidden="true"
                    ></base-text>
                </base-label>
            </template>
        </base-wrapper>
    </base-wrapper>
</template>