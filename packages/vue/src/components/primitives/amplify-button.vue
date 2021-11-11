<template>
  <slot v-bind="$attrs" name="buttont">
    <button v-bind="$attrs" data-amplify-button="">
      <slot></slot>
    </button>
  </slot>
</template>
