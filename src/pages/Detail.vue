<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {onBeforeRouteLeave, useRoute, useRouter} from 'vue-router'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {formatTime} from '@/utils/utils.ts'
import articles, {Article} from '@/dataset/articles.ts'
import Player from 'video.js/dist/types/player'

const route = useRoute()
const router = useRouter()
const article = ref<Article | null>(null)
const container = ref<HTMLElement | null>(null)
const player = ref<Player | null>(null)
let showScroll = ref(false)
let observer: IntersectionObserver | null = null

const a = articles.find(article => article.id === route.params.id)
if (a) {
  article.value = a
}

onMounted(() => {
  if (article.value?.video_url) {
    const options = {
      poster: article.value.img_url,
      autoplay: false,
      controls: true,
      muted: false,
      sources: [
        {
          src: article.value.video_url,
          type: 'application/x-mpegURL'
        }
      ]
    }
    player.value = videojs('videoPlayer', options, () => {
      // player is ready
    })
  }
  observer = new IntersectionObserver((entries) => {
    showScroll.value = !entries[0].isIntersecting
  }, {threshold: 0.1})
  if (container.value) {
    observer.observe(container.value)
  }
})

onUnmounted(() => {
  if (player.value) {
    player.value.dispose()
  }
  if (observer) {
    observer.disconnect()
  }
})

onBeforeRouteLeave((to, _, next) => {
  to.meta.keepAlive = true
  next()
})

const handleBack = () => {
  router.push('/list')
}

const handleScroll = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div v-if="article">
    <div class="font-bold">
      <span class="hover:underline cursor-pointer text-xl" @click="handleBack"><span class="text-amber-500">N</span>ews</span>
      >
    </div>
    <div class="text-4xl font-bold my-3 title" ref="container">{{ article.title }}</div>
    <div class="text-gray-400 py-3 w-full border-b">Posted on {{ formatTime(article.updated_at) }}</div>
    <div class="py-5" id="videoDiv">
      <img v-if="!article.video_url" :src="article.img_url" :alt="article.alt" class="w-full">
      <video v-else class="video-js w-full min-h-[550px]" id="videoPlayer"></video>
    </div>
    <div class="text-lg pt-5 pb-28 text-left" v-html="article.detail"></div>
    <button v-if="showScroll" @click="handleScroll"
            class="rounded-[50%] border fixed right-10 bottom-10 bg-amber-300 p-3 font-bold hover:bg-amber-400">Top
    </button>
  </div>
  <div v-else>Something goes wrong...Click <span class="underline" @click="router.push('/list')">here</span> to go back.</div>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  #videoPlayer {
    min-height: 0;
    height: 23vh;
  }
}
</style>