<script setup lang="ts">
import {ref, computed, onActivated} from 'vue'
import AutoCompleteTag from '@/pages/List/components/AutoCompleteTag.vue'
import LazyImage from '@/pages/List/components/LazyImage.vue'
import articles, {Article} from '@/dataset/articles.ts'
import {onBeforeRouteLeave, useRouter} from 'vue-router'
import {formatTime} from '@/utils/index.ts'

const allNews = ref<Article[]>([])
const filteredNews = ref<Article[]>([])
const selectedTags = ref([])
const currentPage = ref(1)
const itemsPerPage = 9
const router = useRouter()

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
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNews.value.slice(start, end)
})

const totalPages = computed(() =>
    Math.ceil(filteredNews.value.length / itemsPerPage)
)

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
  window.scrollTo(0, 0)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
  window.scrollTo(0, 0)
}

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
    <div class="search-container">
      <AutoCompleteTag
          v-model="selectedTags"
          placeholder="Search by tag..."
          :maxTags="5"
          @update:modelValue="searchNews"
      />
    </div>
    <div class="news-grid">
      <div v-for="article in paginatedNews" :key="article.id" class="news-item hover:shadow-xl cursor-pointer"
           @click="handleDetail(article.id)">
        <LazyImage
            :src="article.img_url"
            :alt="article.alt"
            :threshold="0.1"
        />
        <h2>{{ article.title }}</h2>
        <div class="text-sm pl-2.5 text-gray-400">Posted on {{ formatTime(article.updated_at) }}</div>
        <p>{{ article.description }}</p>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button class="flex-1 border rounded-md font-bold bg-amber-300 cursor-pointer disabled:opacity-70"
              @click="prevPage" :disabled="currentPage === 1"> << Previous
      </button>
      <span class="font-bold">Page {{ currentPage }}<span class="total"> of {{ totalPages }}</span></span>
      <button class="flex-1 border rounded-md font-bold bg-amber-300 cursor-pointer disabled:opacity-70"
              @click="nextPage" :disabled="currentPage === totalPages">Next >>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.news-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.news-item h2 {
  font-size: 18px;
  margin: 10px;
}

.news-item p {
  font-size: 14px;
  margin: 10px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 2rem auto;

}

.pagination button {
  padding: 5px 10px;
  margin: 0 10px;
}

@media (max-width: 800px) {
  .news-list-container{
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

  .pagination {
    width: 100%;
  }

  .total {
    display: none;
  }
}
</style>