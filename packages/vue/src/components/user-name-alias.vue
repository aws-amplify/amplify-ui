<template>
  <base-label data-amplify-alias-label>
    <base-text>
      {{ label }}
    </base-text>
    <base-select
      data-amplify-select
      aria-label="country code"
      name="country_code"
      :options="countryDialCodes"
      v-if="name === 'phone_number'"
    >
    </base-select>
    <base-input
      v-model:textValue="uName"
      :placeholder="label"
      :autocomplete="name"
      required
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
import {
  authInputAttributes,
  getActorContext,
  getAliasInfoFromContext,
  ActorContextWithForms,
} from '@aws-amplify/ui';

import BaseInput from './primitives/base-input.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseText from './primitives/base-text.vue';
import BaseSelect from './primitives/base-select.vue';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

import { UserNameAliasTypes, UserNameAliasSetupReturnTypes } from '../types';
const CD = [
  '+1',
  '+7',
  '+20',
  '+27',
  '+30',
  '+31',
  '+32',
  '+33',
  '+34',
  '+36',
  '+39',
  '+40',
  '+41',
  '+43',
  '+44',
  '+45',
  '+46',
  '+47',
  '+48',
  '+49',
  '+51',
  '+52',
  '+53',
  '+54',
  '+55',
  '+56',
  '+57',
  '+58',
  '+60',
  '+61',
  '+62',
  '+63',
  '+64',
  '+65',
  '+66',
  '+81',
  '+82',
  '+84',
  '+86',
  '+90',
  '+91',
  '+92',
  '+93',
  '+94',
  '+95',
  '+98',
  '+212',
  '+213',
  '+216',
  '+218',
  '+220',
  '+221',
  '+222',
  '+223',
  '+224',
  '+225',
  '+226',
  '+227',
  '+228',
  '+229',
  '+230',
  '+231',
  '+232',
  '+233',
  '+234',
  '+235',
  '+236',
  '+237',
  '+238',
  '+239',
  '+240',
  '+241',
  '+242',
  '+243',
  '+244',
  '+245',
  '+246',
  '+248',
  '+249',
  '+250',
  '+251',
  '+252',
  '+253',
  '+254',
  '+255',
  '+256',
  '+257',
  '+258',
  '+260',
  '+261',
  '+262',
  '+263',
  '+264',
  '+265',
  '+266',
  '+267',
  '+268',
  '+269',
  '+290',
  '+291',
  '+297',
  '+298',
  '+299',
  '+345',
  '+350',
  '+351',
  '+352',
  '+353',
  '+354',
  '+355',
  '+356',
  '+357',
  '+358',
  '+359',
  '+370',
  '+371',
  '+372',
  '+373',
  '+374',
  '+375',
  '+376',
  '+377',
  '+378',
  '+379',
  '+380',
  '+381',
  '+382',
  '+385',
  '+386',
  '+387',
  '+389',
  '+420',
  '+421',
  '+423',
  '+500',
  '+501',
  '+502',
  '+503',
  '+504',
  '+505',
  '+506',
  '+507',
  '+508',
  '+509',
  '+537',
  '+590',
  '+591',
  '+593',
  '+594',
  '+595',
  '+596',
  '+597',
  '+598',
  '+599',
  '+670',
  '+672',
  '+673',
  '+674',
  '+675',
  '+676',
  '+677',
  '+678',
  '+679',
  '+680',
  '+681',
  '+682',
  '+683',
  '+685',
  '+686',
  '+687',
  '+688',
  '+689',
  '+690',
  '+691',
  '+692',
  '+850',
  '+852',
  '+853',
  '+855',
  '+856',
  '+872',
  '+880',
  '+886',
  '+960',
  '+961',
  '+962',
  '+963',
  '+964',
  '+965',
  '+966',
  '+967',
  '+968',
  '+970',
  '+971',
  '+972',
  '+973',
  '+974',
  '+975',
  '+976',
  '+977',
  '+992',
  '+993',
  '+994',
  '+995',
  '+996',
  '+998',
];

export default defineComponent({
  components: {
    BaseInput,
    BaseLabel,
    BaseText,
    BaseSelect,
  },
  props: {
    userNameAlias: {
      default: false,
    },
    userName: {
      default: '',
    },
    disabled: {
      default: false,
    },
  },
  setup(props: UserNameAliasTypes) {
    const { state } = useAuth();
    const {
      value: { context },
    } = state;
    const actorContext: ComputedRef<ActorContextWithForms> = computed(() =>
      getActorContext(state.value)
    );

    let uName = ref('');

    if (props.userName) {
      uName = computed(() => props.userName);
    }

    const countryDialCodes = computed(() => CD);
    console.log('cd', CD);

    const [primaryAlias] = useAliases(context?.config?.login_mechanisms);

    let name = primaryAlias;
    let label =
      authInputAttributes[primaryAlias]?.label ??
      authInputAttributes['username'].label;
    let type =
      authInputAttributes[name]?.type ?? authInputAttributes['username'].label;

    // Only show for Sign In
    if (props.userNameAlias) {
      const aliasInfo = getAliasInfoFromContext(context);
      label = aliasInfo.label || authInputAttributes['username'].label;
      type = aliasInfo.type;
      name = 'username';
    }

    return { label, name, type, uName, countryDialCodes };
  },
});
</script>
