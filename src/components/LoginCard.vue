<script setup lang="ts">
const {title} = defineProps<{
  title?: string
}>()

</script>

<template>
  <div class="mb-10">
    <div class="font-bold text-2xl border-b pb-3 mb-5">
      <template v-if="title">{{title}}</template>
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>