<template>
  <slot name="buttont">
    <button v-bind="$attrs" data-amplify-button="">
      <slot></slot>
    </button>
  </slot>
</template>
