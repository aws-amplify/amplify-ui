<script setup lang="ts"></script>

<template>
  <base-wrapper
    tabindex="0"
    aria-orientation="horizontal"
    data-orientation="horizontal"
    class="amplify-authenticator__tabs"
    role="tablist"
  >
    <base-wrapper
      class="amplify-flex amplify-tabs amplify-authenticator__tabs-wrapper"
      data-indicator-position="top"
    >
      <slot></slot>
    </base-wrapper>
  </base-wrapper>
</template>
