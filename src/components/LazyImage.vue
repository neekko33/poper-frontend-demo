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
  <div class="relative w-full h-0 pb-[56.25%] bg-gray-200" ref="container">
    <img
        :src="loadedSrc"
        :alt="alt"
        :class="{ 'lazy-image': true, 'lazy-image-loaded': isLoaded }"
        @load="onImageLoaded"
    />
    <div v-if="!isLoaded" class="absolute top-0 left-0 w-full h-full flex justify-center items-center text-[#666]">
      Loading...
    </div>
  </div>
</template>

<style scoped>
.lazy-image {
  @apply absolute top-0 left-0 w-full h-full opacity-0 object-cover transition-opacity duration-300 ease-in-out
}

.lazy-image-loaded {
  @apply opacity-100
}
</style>