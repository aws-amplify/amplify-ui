<template>
  <slot v-bind="$attrs" name="textI">
    <span v-bind="$attrs" data-amplify-text="">
      <slot></slot>
    </span>
  </slot>
</template>
