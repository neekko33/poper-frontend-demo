<script setup lang="ts">
import image from '../assets/logo.png'
import {onMounted, ref} from 'vue'
import NavMobile from '@/layouts/components/NavMobile.vue'
import {MenuItem} from '@/index'

const img = ref(image)
const showMenu = ref(false)

const menu: MenuItem[] = [
  {
    label: 'サービス',
    children: [
      {
        label: 'サービス一覧'
      },
      {
        label: 'ComiruBASIC'
      },
      {
        label: 'ComiruFREE'
      },
      {
        label: 'ComiruAir'
      },
      {
        label: 'ComiruHR'
      }
    ]
  },
  {
    label: 'プラン一覧'
  },
  {
    label: '基本機能',
    children: [
      {
        label: 'Comiru',
        children: [
          {label: '専用アプリ＆LINE連携'},
          {label: '指導報告書'},
          {label: 'お知らせ'},
          {label: '入退室管理'},
          {label: '請求書'},
          {label: '口座振替'},
          {label: 'カード決済'},
          {label: '成績管理'},
          {label: '座席管理'},
          {label: '見込顧客獲得'},
          {label: 'Web申込み'},
          {label: '口コミ収集＆掲載'}
        ]
      },
      {
        label: 'ComiruAir',
        children: [
          {
            label: 'オンライン授業支援'
          }
        ]
      },
      {
        label: 'ComiruHR',
        children: [
          {label: '講師人事労務管理'}
        ]
      }
    ]
  },
  {
    label: '導入事例'
  },
  {
    label: 'お役立ち資料'
  },
  {
    label: 'セミナー一覧'
  },
  {
    label: 'ヘルプ',
    children: [
      {
        label: 'Comiru',
        children: [
          {label: '導入までの流れ'},
          {label: 'よくある質問'}
        ]
      },
      {
        label: 'ComiruAir',
        children: [
          {label: 'よくある質問'}
        ]
      },
      {
        label: 'お問い合わせ'
      }
    ]
  }
]
let observer: IntersectionObserver | null = null

onMounted(() => {
  // transform menu when submenu out of view
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
  })
})

</script>

<template>
  <div class="header z-20 fixed h-20 w-full flex border-b px-10 items-center justify-between bg-white shadow-sm">
    <div class="flex items-center">
      <a href="/">
        <img class="logo" :src="img">
      </a>
      <h1 class="header-title font-bold ml-4 w-44 text-sm">
        塾専用コミュニケーション &業務管理システム
      </h1>
    </div>
    <div>
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
      <nav-mobile v-if="showMenu" :menu="menu"/>
      <div class="menu-box" @click="() => {showMenu = !showMenu}">
        <label id="hamburger-1" :class="[{'hamburger':true}, {'active':showMenu}]">
          <span class="line line-01"></span>
          <span class="line line-02"></span>
          <span class="line line-03"></span>
        </label>
      </div>
    </div>
  </div>
  <div class="content max-w-[1100px] pt-24 px-5 mx-auto">
    <router-view v-slot="{Component}">
      <keep-alive include="List">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
.logo {
  width: 172px;
  height: 40px;
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
  position: relative;
}

.nav-header .icon-arrow-bottom {
  transition: .3s transform ease-in-out;
  display: block;
  width: 12px !important;
  height: 8px !important;
  overflow: hidden;
  position: absolute;
  right: -20px;
  top: 50%;
  margin-top: -4px;
}

.nav-header .icon-arrow-bottom:before {
  transform: rotate(45deg);
  left: 0;
}

.nav-header .icon-arrow-bottom:after {
  transform: rotate(-45deg);
  left: 4px;
}

.nav-header .icon-arrow-bottom:before, .nav-header .icon-arrow-bottom:after {
  content: "";
  position: absolute;
  display: block;
  width: 6px;
  border: 1px solid #493b32;
  border-radius: 1px;
  top: 4px;
}

.nav-header .more-info:hover .icon-arrow-bottom {
  transform: rotate(-180deg);
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

@media screen and (max-width: 1300px) and (min-width: 800px) {
  .nav-header > li:not(.more-info) {
    display: none;
  }
}

@media screen and (max-width: 990px) {
  .header-title {
    display: none;
  }
}

@media only screen and (max-width: 800px) {
  .header {
    height: 44px;
    padding: 0 16px;
  }

  .logo {
    width: 86px;
    height: 20px;
  }

  .nav-pc {
    display: none;
  }

  .content {
    padding-top: 70px;
  }

  .menu-box {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    float: left;
    overflow: hidden;
    z-index: 100;
    width: 60px;
  }

  .hamburger {
    width: 24px;
    cursor: pointer;
  }

  .line {
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #493b32;
    margin: 4px 0;
    transition: all .3s ease-in-out;
  }

  .line:first-child {
    margin: 0 0 4px;
  }

  .line:last-child {
    margin: 4px 0 0;
  }

  #hamburger-1.active .line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  #hamburger-1.active .line:nth-child(2) {
    opacity: 0;
  }

  #hamburger-1.active .line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>