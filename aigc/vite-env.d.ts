// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 你可以添加其他环境变量
  readonly VITE_BASE_URL: string
  readonly VITE_APP_CONTEXT_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
