<script setup lang="ts">
import {MenuItem} from '@/index.d.ts'
import {ref} from 'vue'

const {menu} = defineProps<{
  menu: MenuItem[]
}>()

const subMenu = ref<MenuItem[]>([])
const activeMenu = ref<number | null>(null)
const activeSubMenu = ref<number | null>(null)
const handleClickMenu = (subMenuItems: MenuItemp[], activeIndex: number) => {
  if (activeMenu.value !== activeIndex) {
    activeSubMenu.value = null
  }
  subMenu.value = subMenuItems
  activeMenu.value = activeIndex
}
const handleCLickSubMenu = (activeIndex: number) => {
  if (activeSubMenu.value === activeIndex) {
    activeSubMenu.value = null
  } else {
    activeSubMenu.value = activeIndex
  }
}
</script>

<template>
  <nav class="header-link-area z-10 absolute top-[44px] left-0 h-lvh w-lvw bg-white hidden">
    <ul class="nav-header-mobile flex-1">
      <template v-for="(item, index) in menu" :key="index">
        <template v-if="item.children">
          <li @click="handleClickMenu(item.children, index)" :class="{'bg-gray-100': activeMenu === index}"><a class="relative">{{ item.label }}</a>
            <svg class="arrow-mobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20" height="20">
              <path fill="currentColor"
                    d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path>
            </svg>
          </li>
        </template>
        <template v-else>
          <li><a>{{ item.label }}</a></li>
        </template>
      </template>
    </ul>
    <ul class="nav-submenu flex-1 bg-gray-100" v-if="subMenu.length">
      <template v-for="(item, index) in subMenu" :key="index">
        <template v-if="item.children">
          <li :class="{'active-submenu': activeSubMenu === index}" @click="handleCLickSubMenu(index)"><a>{{ item.label }}</a>
            <svg class="caret-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20" height="20">
              <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
            </svg>
          </li>
          <ul class="nav-submenu-item h-0 overflow-hidden" :class="{'h-auto': activeSubMenu === index}">
            <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
              <a>{{ subItem.label }}</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <li><a>{{ item.label }}</a></li>
        </template>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  .header-link-area {
    display: flex;
  }
}

.nav-header-mobile > li, .nav-submenu > li {
  @apply border-b text-lg py-4 px-5 flex items-center justify-between cursor-pointer
}

.nav-header-mobile > li {
  @apply font-bold  active:bg-gray-100 hover:bg-gray-100
}

.nav-submenu-item > li {
  @apply border-b py-3 px-5 flex items-center justify-between cursor-pointer
}

.active-submenu {
  @apply bg-[#16bfb7] text-white
}

.caret-right {
  @apply transition-all duration-300 ease-in-out
}

.active-submenu .caret-right {
  transform: rotate(90deg);
}
</style>