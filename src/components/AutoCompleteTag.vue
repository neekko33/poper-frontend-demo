<script setup lang="ts">
import {ref, computed} from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  data: string[]
  placeholder: string,
  maxTags: number,
}>()

const inputValue = ref('')
const selectedTags = ref<string[]>([])
const showSuggestions = ref(false)
const allTags = ref(props.data)

const filteredSuggestions = computed(() => {
  if (!inputValue.value) return []
  return allTags.value.filter(tag =>
      tag.toLowerCase().startsWith(inputValue.value.toLowerCase()) &&
      !selectedTags.value.includes(tag)
  ).slice(0, 10) // 限制建议数量以提高性能
})

const onInput = () => {
  showSuggestions.value = inputValue.value.length > 0
}

const selectSuggestion = (suggestion: string) => {
  inputValue.value = suggestion
  addTag()
}

const addTag = () => {
  if (inputValue.value && allTags.value.includes(inputValue.value) && !selectedTags.value.includes(inputValue.value)) {
    if (selectedTags.value.length < props.maxTags) {
      selectedTags.value.push(inputValue.value)
      inputValue.value = ''
      showSuggestions.value = false
    }
  }
}

const removeTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index !== -1) {
    selectedTags.value.splice(index, 1)
  }
  // if (selectedTags.value.length === 0) {
    emitUpdate()
  // }
}

const emitUpdate = () => {
  emit('update:modelValue', selectedTags.value)
}
</script>

<template>
  <div class="relative w-full">
    <div class="flex">
      <div class="flex border rounded-md flex-1 p-1 relative items-center">
        <div class="tags flex">
          <span v-for="tag in selectedTags" :key="tag"
                class="tag">{{ tag }}<button
              @click="removeTag(tag)" class="bg-none border-none cursor-pointer font-bold ml-1">×</button></span>
        </div>
        <input
            class="focus:ring-0 flex-1 border-none"
            v-model="inputValue"
            @input="onInput"
            @keydown.enter.prevent="addTag"
            :placeholder="placeholder"
            :disabled="selectedTags.length === props.maxTags"
        />
        <ul v-if="showSuggestions" class="suggestions">
          <li
              v-for="suggestion in filteredSuggestions"
              class="p-2 cursor-pointer hover:bg-gray-100"
              :key="suggestion"
              @click="selectSuggestion(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
      <button class="border rounded-md ml-2 px-5 font-bold bg-amber-300 disabled:opacity-70"
              :disabled="!selectedTags.length" @click="emitUpdate">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20" height="20">
          <path fill="currentColor"
                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"></path>
        </svg>
      </button>
    </div>
    <div class="tags-mobile hidden">
          <span v-for="tag in selectedTags" :key="tag" class="tag mt-2">{{ tag }}<button
              @click="removeTag(tag)" class="bg-none border-none cursor-pointer font-bold ml-1">×</button></span>
    </div>
  </div>
</template>

<style scoped>
.suggestions {
  @apply absolute left-0 w-full max-h-[200px] overflow-y-auto list-none p-0 m-0 border border-t-0 rounded-b bg-white z-10;
  top: calc(100% + 1px);
}

.tag {
  @apply inline-block bg-[#e0e0e0] py-1 px-2 mr-1 rounded text-nowrap
}

@media screen and (max-width: 800px) {
  input {
    font-size: 13px;
  }

  .tags {
    display: none;
  }

  .tags-mobile {
    display: block;
  }
}
</style>