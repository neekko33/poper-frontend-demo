<template>
  <div class="auto-complete-tag">
    <input
        v-model="inputValue"
        @input="onInput"
        @keydown.enter.prevent="addTag"
        :placeholder="placeholder"
        :disabled="disabled"
    />
    <ul v-if="showSuggestions" class="suggestions">
      <li
          v-for="suggestion in filteredSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
    <div class="tags">
      <span v-for="tag in selectedTags" :key="tag" class="tag">
        {{ tag }}
        <button @click="removeTag(tag)">×</button>
      </span>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'AutoCompleteTag',
  props: {
    placeholder: {
      type: String,
      default: 'Enter a tag...'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxTags: {
      type: Number,
      default: Infinity
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref('');
    const selectedTags = ref([]);
    const showSuggestions = ref(false);
    const allTags = ref([]);

    // 模拟从API获取标签数据
    const fetchTags = async () => {
      // 这里应该是实际的API调用
      // 为了演示，我们生成1000个随机标签
      const tags = Array.from({ length: 1000 }, (_, i) => `Tag${i + 1}`);
      allTags.value = tags;
    };

    onMounted(fetchTags);

    const filteredSuggestions = computed(() => {
      if (!inputValue.value) return [];
      return allTags.value.filter(tag =>
          tag.toLowerCase().includes(inputValue.value.toLowerCase()) &&
          !selectedTags.value.includes(tag)
      ).slice(0, 10); // 限制建议数量以提高性能
    });

    const onInput = () => {
      showSuggestions.value = inputValue.value.length > 0;
    };

    const selectSuggestion = (suggestion) => {
      inputValue.value = suggestion;
      addTag();
    };

    const addTag = () => {
      if (inputValue.value && allTags.value.includes(inputValue.value) && !selectedTags.value.includes(inputValue.value)) {
        if (selectedTags.value.length < props.maxTags) {
          selectedTags.value.push(inputValue.value);
          inputValue.value = '';
          showSuggestions.value = false;
          emitUpdate();
        }
      }
    };

    const removeTag = (tag) => {
      const index = selectedTags.value.indexOf(tag);
      if (index !== -1) {
        selectedTags.value.splice(index, 1);
        emitUpdate();
      }
    };

    const emitUpdate = () => {
      emit('update:modelValue', selectedTags.value);
    };

    return {
      inputValue,
      selectedTags,
      showSuggestions,
      filteredSuggestions,
      onInput,
      selectSuggestion,
      addTag,
      removeTag
    };
  }
};
</script>

<style scoped>
.auto-complete-tag {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: white;
  z-index: 1;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}

.tags {
  margin-top: 8px;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 4px 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
}

.tag button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-left: 4px;
}
</style>