<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  if (uni.getStorageSync('buttonPosition')) return
  const res = uni.getMenuButtonBoundingClientRect()
  console.log(res)
  uni.setStorageSync('buttonPosition', res)
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import 'uview-plus/index.scss';

// 字体图标
@import '@/styles/fonts.scss';
view,
text {
  display: block;
  font-size: 33rpx;
}
image {
  display: block;
}
button::after {
  border: none;
}
button {
  padding: 0;
  margin: 0;
  line-height: inherit;
  background-color: #fff;
}

button::after {
  border: none;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ellipsis-one {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
