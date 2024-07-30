<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/list');
};
</script>
<template>
  <div class="flex flex-col items-center text-xl pt-10">
    <h2 class="my-10 text-4xl">404 Page Not Found</h2>
    <button @click="goHome" class="border py-2 px-5 rounded-xl bg-amber-300 hover:bg-amber-400">Back to News List</button>
  </div>
</template>

<style scoped>

</style>