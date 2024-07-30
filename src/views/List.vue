<script setup lang="ts">
import {ref, computed, onActivated} from 'vue'
import AutoCompleteTag from '@/components/AutoCompleteTag.vue'
import LazyImage from '@/components/LazyImage.vue'
import articles, {Article} from '@/dataset/articles.ts'
import {onBeforeRouteLeave, useRouter} from 'vue-router'
import {formatTime} from '@/utils/utils.ts'
import tags from '@/dataset/tags.json'
import Pagination from '@/components/Pagination.vue'


const allNews = ref<Article[]>([])
const filteredNews = ref<Article[]>([])
const selectedTags = ref([])
const currentPage = ref(1)
const pageSize = 9
const router = useRouter()
const data = JSON.parse(tags) as string[]

allNews.value = articles
filteredNews.value = articles

const searchNews = () => {
  if (selectedTags.value.length === 0) {
    filteredNews.value = allNews.value
  } else {
    filteredNews.value = allNews.value.filter(article =>
        selectedTags.value.every(tag => article.title.toLowerCase().includes(tag))
    )
  }
  currentPage.value = 1
}

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredNews.value.slice(start, end)
})

const totalPages = computed(() =>
    Math.ceil(filteredNews.value.length / pageSize)
)

const handleDetail = (id: string) => {
  router.push(`/detail/${id}`)
}

// saved List page scrollTop
const top = ref(0)
onBeforeRouteLeave((to, _, next) => {
  if (to.name === 'detail') {
    top.value = document.documentElement.scrollTop || document.body.scrollTop
  }
  next()
})

onActivated(() => {
  const root = document.documentElement || document.body
  root.scrollTop = top.value
})
</script>

<template>
  <div class="news-list-container px-3 py-3">
    <h1 class="text-3xl font-bold mb-2"><span class="text-amber-500">N</span>ews</h1>
    <div class="mb-5">
      <AutoCompleteTag
          v-model="selectedTags"
          :data="data"
          placeholder="Search by tag..."
          :maxTags="5"
          @update:modelValue="searchNews"
      />
    </div>
    <div v-if="paginatedNews.length > 0" class="news-grid">
      <div v-for="article in paginatedNews" :key="article.id" class="news-item hover:shadow-xl cursor-pointer"
           @click="handleDetail(article.id)">
        <LazyImage
            :src="article.img_url"
            :alt="article.alt"
            :threshold="0.1"
        />
        <h2>{{ article.title }}</h2>
        <div class="text-sm m-3 text-gray-400">Posted on {{ formatTime(article.updated_at) }}</div>
        <p>{{ article.description }}</p>
      </div>
    </div>
    <div v-else class="pt-10 w-full text-center text-xl text-gray-400">
      No news found<br/>Please try other tags later.
    </div>
    <pagination :total-pages="totalPages" v-model="currentPage"/>
  </div>
</template>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.news-item {
  @apply border rounded-lg overflow-hidden
}

.news-item h2 {
  @apply text-lg m-3
}

.news-item p {
  @apply m-3 text-[#666] text-sm;
}

@media (max-width: 800px) {
  .news-list-container {
    padding-top: 0;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .news-item h2 {
    font-size: 16px;
  }

  .news-item div {
    font-size: 12px;
  }

  .news-item p {
    font-size: 12px;
  }
}
</style>