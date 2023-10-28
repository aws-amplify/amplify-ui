<script setup lang="ts"></script>

<template>
  <base-wrapper
    tabindex="0"
    aria-orientation="horizontal"
    data-orientation="horizontal"
    class="amplify-authenticator__tabs amplify-tabs"
  >
    <base-wrapper
      class="amplify-tabs__list amplify-tabs__list--top amplify-tabs__list--equal amplify-authenticator__tabs-wrapper"
      role="tablist"
    >
      <slot></slot>
    </base-wrapper>
  </base-wrapper>
</template>
