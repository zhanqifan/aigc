// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    // 根据环境变量设置 base
    base: env.VITE_CONTEXT_PATH || '/',
    build: {
      // 开发阶段启用源码映射
      sourcemap: mode === 'development',
      minify: 'terser',
      terserOptions:
        mode === 'production'
          ? {
              compress: {
                drop_console: true,
              },
            }
          : {},
    },
    plugins: [
      uni(),
      AutoImport({
        imports: ['pinia', 'vue'],
        dts: 'src/types/auto-imports.d.ts',
      }),
    ],

    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
