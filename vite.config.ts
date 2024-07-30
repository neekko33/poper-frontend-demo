import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      // 覆盖率
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      // 覆盖文件夹
      reportsDirectory: './coverage',
      perFile: true,
      // 代码覆盖率阈值
      lines: 75,
      functions: 75,
      branches: 75,
      statements: 75
    },
    open: true,
    include: ['./tests/*.{test,spec}.ts']
  }
})
