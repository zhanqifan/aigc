import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus from 'uview-plus'
import {useTowxml} from '@/wxcomponents/towxml/index'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$towxml = useTowxml
  app.use(uviewPlus)
  app.use(pinia)
  return {
    app,
  }
}
