<script setup lang="ts"></script>

<template>
  <base-wrapper
    tabindex="0"
    aria-orientation="horizontal"
    data-orientation="horizontal"
    role="tablist"
    style="outline: none"
  >
    <base-wrapper
      class="amplify-flex amplify-tabs"
      data-indicator-position="top"
      style="gap: 0px; justify-content: center"
    >
      <slot></slot>
    </base-wrapper>
  </base-wrapper>
</template>
