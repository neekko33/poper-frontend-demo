<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'

const {src, alt = '', threshold = 0.1} = defineProps<{
  src: string,
  alt?: string,
  threshold?: number,
}>()

const container = ref(null)
const loadedSrc = ref('')
const isLoaded = ref(false)
let observer: IntersectionObserver | null = null

const loadImage = () => {
  const img = new Image()
  img.src = src
  img.onload = () => {
    loadedSrc.value = src
    isLoaded.value = true
  }
  img.onerror = (error) => {
    console.error('Error loading image:', error)
    loadedSrc.value = 'https://www3.nhk.or.jp//nhkworld/upld/thumbnails/en/news/20240726_26_1421756_L.jpg'
  }
}

const onImageLoaded = () => {
  if (observer) {
    observer.disconnect()
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadImage()
          if (observer) {
            observer.disconnect()
          }
        }
      },
      {
        threshold: threshold
      }
  )

  if (container.value) {
    observer.observe(container.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
<template>
  <div class="lazy-image-container" ref="container">
    <img
        :src="loadedSrc"
        :alt="alt"
        :class="{ 'lazy-image': true, 'lazy-image-loaded': isLoaded }"
        @load="onImageLoaded"
    />
    <div v-if="!isLoaded" class="lazy-image-placeholder">
      <!-- 可以在这里添加加载中的占位符,如加载动画 -->
      Loading...
    </div>
  </div>
</template>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 宽高比,可以根据需要调整 */
  background-color: #f0f0f0; /* 占位符背景色 */
}

.lazy-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.lazy-image-loaded {
  opacity: 1;
}

.lazy-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 14px;
}
</style>