<script setup lang="ts">
import image from '../assets/logo.png'
import {ref} from 'vue'
import NavMobile from '@/components/NavMobile.vue'
import {MenuItem} from '@/index'
import NavPC from '@/components/NavPC.vue'

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

</script>

<template>
  <div class="header z-20 fixed h-20 w-full flex border-b px-10 items-center justify-between bg-white shadow-sm">
    <div class="flex items-center">
      <a class="h-[45.4px] logo-container" href="/">
        <img class="logo" :src="img">
      </a>
      <h1 class="header-title font-bold ml-4 w-44 text-sm">
        塾専用コミュニケーション &業務管理システム
      </h1>
    </div>
    <div>
      <nav-mobile v-if="showMenu" :menu="menu"/>
      <nav-p-c :menu="menu"></nav-p-c>
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
  @apply w-[172px] h-[40px]
}

@media screen and (max-width: 990px) {
  .header-title {
    @apply hidden
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

  .logo-container {
    height: auto;
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