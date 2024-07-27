<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import LoginCard from './components/LoginCard.vue'
import lineButton from '@/assets/btn_base.png'
import lineFriend from '@/assets/ja.png'

const lineBtn = ref(lineButton)
const lineFr = ref(lineFriend)

const router = useRouter()
const errors = ref<string[]>([])

const radio = ref('parent')
const studentNum = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
  errors.value = []
  const err: string[] = []
  if (!studentNum.value.trim()) {
    err.push('生徒番号 を入力してください')
  }
  if (!password.value.trim()) {
    err.push('パスワード を入力してください')
  }
  if (err.length) {
    errors.value = err
  } else {
    // success login
    console.log('login')
    router.push('/list')
  }
}

</script>

<template>
  <LoginCard title="その他の登録">
    <div class="login-other flex justify-between">
      <div class="login-box">
        <p class="login-p">メールアドレス（共通アカウント）で<br>ログインする場合はこちら</p>
        <button class="bg-amber-300 font-bold hover:bg-amber-400 h-8 px-7 rounded text-[14px]">共通アカウントログイン</button>
      </div>
      <div class="login-box">
        <p class="login-p">Comiruをすでに友達に追加済みの方<br>以下のアイコンをクリックしてログイン</p>
        <button><img class="h-9 w-9" :src="lineBtn" alt="line"></button>
      </div>
      <div class="login-box border-none">
        <p class="login-p">ComiruをLINEではじめてお使いの方<br>以下のアイコンをクリックして友だち追加</p>
        <button><img class="h-9" :src="lineFr" alt="line-friend"/></button>
      </div>
    </div>
  </LoginCard>
  <LoginCard>
    <template #title>
      生徒・保護者ログイン<span class="text-[smaller]">（スクールポパー）</span>
    </template>
    <p class="mb-5">生徒番号とパスワードを入力してログインしてください。<span
        class="text-black text-[larger]">生徒番号</span>や<span
        class="text-black text-[larger]">パスワード</span>がわからない場合は、教室にお問い合わせください。</p>
    <form>
      <ul>
        <li v-for="(item, index) in errors" :key="index" class="text-[#e53935]">{{ item }}</li>
      </ul>
      <div class="form-group">
        <label class="mr-2"><input class="text-[#16bfb7] ring-0" type="radio" value="parent" v-model="radio"/> 保護者</label>
        <label><input class="text-[#16bfb7] outline-none" type="radio" value="Student" v-model="radio"/> 生徒</label>
      </div>
      <div class="form-group">
        <label class="login-label" for="student-no">生徒番号</label>
        <input v-model="studentNum" class="login-input" id="student-no" type="text"/>
      </div>
      <div class="form-group">
        <label class="login-label" for="password">パスワード</label>
        <input v-model="password" class="login-input" id="password" :type="showPassword? 'text' : 'password'"/>
      </div>
      <div class="form-group">
        <label class="font-bold">
          <input type="checkbox" class="text-[#16bfb7] rounded" v-model="showPassword">
          パスワードを表示
        </label>
      </div>
      <div class="form-group">
        <button @click.prevent="handleLogin" class="bg-[#16bFb7] shadow rounded-2xl h-9 px-7 text-[14px] text-white">
          ログインする
        </button>
      </div>
      <div class="form-group">
        <li style="list-style-type: disc">
          <a href="" class="underline text-[#16bFb7]">パスワードを忘れた方はこちら</a>
        </li>
      </div>
    </form>
  </LoginCard>
</template>

<style scoped>
.login-p {
  @apply mb-3 text-center
}

.login-box {
  @apply flex-1 px-2 border-r-2 border-[#b4a094] flex-col flex items-center
}

.form-group {
  @apply my-3
}

.login-input {
  @apply max-w-[540px] w-full border-gray-300 rounded ring-gray-500
}

.login-label {
  @apply block font-bold my-1
}

@media screen and (max-width: 800px) {
  .login-other {
    @apply flex-col border-r-0
  }

  .login-box {
    @apply border-r-0 mr-0 border-b-2 px-0 py-3
  }

  form {
    @apply pb-28
  }
}
</style>