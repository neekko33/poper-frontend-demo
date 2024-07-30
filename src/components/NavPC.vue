<script setup lang="ts">
import {MenuItem} from '@/index'
import {onMounted, onUnmounted} from 'vue'

defineProps<{
  menu: MenuItem[]
}>()

let observer: IntersectionObserver | null = null

onMounted(() => {
  const containers = document.querySelectorAll('.sub-container')
  observer = new IntersectionObserver((entries) => {
    // TODO: bug-多次移动后会位移回去
    if (entries[0].intersectionRatio < 1) {
      const offset = entries[0].boundingClientRect.right - window.innerWidth
      const parentEle = entries[0].target.parentElement?.parentElement?.parentElement
      if (parentEle) {
        parentEle.style.transform = `translateX(-${offset + 5}px)`
      }
    }
  })
  containers.forEach(container => {
    (observer as IntersectionObserver).observe(container)
  }, {threshold: 0.1})
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

</script>

<template>
  <nav class="flex nav-pc">
    <ul class="nav-header">
      <template v-for="(item, index) in menu" :key="index">
        <template v-if="item.children">
          <li class="more-info">
            <a>{{ item.label }}<i class="icon-arrow-bottom"></i></a>
            <div class="menu-container">
              <ul class="sub">
                <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
                  <template v-if="subItem.children">
                    <li class="sub-more-info">
                      <a class="flex justify-center items-center" href="">{{ subItem.label }}<i
                          class="icon-arrow-right"></i></a>
                      <div class="sub-container">
                        <ul class="sub-menu">
                          <li v-for="(itm, idx) in subItem.children" :key="idx">
                            <a>{{ itm.label }}</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </template>
                  <template v-else>
                    <li><a href="">{{ subItem.label }}</a></li>
                  </template>
                </template>
              </ul>
            </div>
          </li>
        </template>
        <template v-else>
          <li>
            <a>{{ item.label }}</a>
          </li>
        </template>
      </template>
    </ul>
    <button class="h-8 leading-8 px-3 rounded-2xl bg-amber-300 hover:bg-amber-400 font-bold">塾講師ログイン</button>
  </nav>
</template>

<style scoped>
@media only screen and (max-width:800px) {
  .nav-pc {
    display: none;
  }
}

@media screen and (max-width: 1300px) and (min-width: 800px) {
  .nav-header > li:not(.more-info) {
    @apply hidden
  }
}

.nav-header {
  @apply flex items-center justify-end font-bold
}

.nav-header > li {
  @apply mr-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer
}

.nav-header .more-info {
  @apply pr-7
}

.nav-header .more-info > a {
  @apply relative
}

.nav-header .icon-arrow-bottom {
  @apply block overflow-hidden absolute -right-5 top-1/2 -mt-1 transition-transform duration-300 ease-in-out;
  width: 12px !important;
  height: 8px !important;
}

.nav-header .icon-arrow-bottom:before {
  @apply rotate-45 left-0
}

.nav-header .icon-arrow-bottom:after {
  @apply -rotate-45 left-1
}

.nav-header .icon-arrow-bottom:before, .nav-header .icon-arrow-bottom:after {
  @apply absolute block w-[6px] border border-[#493b32] rounded-[1px] top-1;
  content: "";
}

.nav-header .more-info:hover .icon-arrow-bottom {
  @apply -rotate-180
}

.nav-header .more-info:hover .menu-container {
  @apply block
}

.nav-header .menu-container {
  @apply absolute pt-5 hidden transition-all duration-300 ease-in-out
}

.nav-header .sub, .nav-header .sub-menu {
  @apply bg-white rounded-md font-light border-gray-100 border shadow-xl py-1
}

.nav-header .sub > li, .nav-header .sub-menu > li {
  @apply px-8 leading-10 text-center hover:bg-[#16bFb7] whitespace-nowrap
}

.nav-header .sub > li:hover > a, .nav-header .sub-menu > li:hover > a {
  @apply text-white
}

.nav-header .sub-more-info {
  @apply relative
}

.nav-header .sub-more-info:hover .sub-container {
  @apply block
}

.nav-header .sub-more-info:hover .icon-arrow-right {
  @apply border-l-white
}

.nav-header .sub-container {
  @apply absolute -top-1 left-full hidden
}

.nav-header .icon-arrow-right {
  @apply ml-2 inline-block w-0 h-0 border-[6px] border-solid border-transparent border-l-black
}
</style>