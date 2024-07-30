<script setup lang="ts">
import {ModelRef} from 'vue'

const model = defineModel<number>() as ModelRef<number>
const {totalPages} = defineProps<{
  totalPages: number,
}>()

const nextPage = () => {
  if (model.value < totalPages) {
    model.value++
  }
  window.scrollTo(0, 0)
}

const prevPage = () => {
  if (model.value > 1) {
    model.value--
  }
  window.scrollTo(0, 0)
}

</script>

<template>
  <div class="pagination" v-if="model && totalPages > 1">
    <button class="flex-1 border rounded-md font-bold bg-amber-300 cursor-pointer disabled:opacity-70"
            @click="prevPage" :disabled="model === 1"> << Previous
    </button>
    <span class="font-bold">Page {{ model }}<span class="total"> of {{ totalPages }}</span></span>
    <button class="flex-1 border rounded-md font-bold bg-amber-300 cursor-pointer disabled:opacity-70"
            @click="nextPage" :disabled="model === totalPages">Next >>
    </button>
  </div>
</template>

<style scoped>
.pagination {
  @apply flex justify-center items-center w-[500px] my-8 mx-auto

}

.pagination button {
  @apply py-1.5 mx-2
}

@media screen and (max-width: 800px) {
  .pagination {
    width: 100%;
  }

  .total {
    display: none;
  }
}


</style>