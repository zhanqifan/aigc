import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus from 'uview-plus'

import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(pinia)
  return {
    app,
  }
}
