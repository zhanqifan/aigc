<script setup lang="ts">
import { buttonPosition } from '@/hook/buttonPosition'
// 创建新对话内容展示
// import startPage from './component/start-page.vue'
// 文生文对话
// import chatArea from './component/chat-area.vue'
// ai绘图
// import aiDrawing from './component/ai-drawing.vue'
// 底部输入框
// import inputArea from './component/input-box.vue'
// 个人中心
// import personCenter from '@/pages/personalCenter/index.vue'
// 登录页面
import loginPage from '@/pages/login-page/index.vue'
const menu = ref(['我的', '对话', 'AI绘画'])
const { but_button, but_height, but_top } = buttonPosition()
</script>
<template>
  <view class="menu-page">
    <view class="button-top"></view>
    <view class="menu-style">
      <text v-for="(item, index) in menu" :key="index">{{ item }}</text>
    </view>
  </view>
  <view class="menu-view-height"></view>
  <!-- 创建新对话内容展示 -->
  <!-- <startPage /> -->
  <!-- 文生文对话 -->
  <!-- <chatArea /> -->
  <!-- AI绘画 -->
  <!-- <aiDrawing /> -->
  <!-- 输入框 -->
  <!-- <inputArea /> -->
  <!-- 个人中心 -->
  <!-- <personCenter /> -->
  <!-- 登录页 -->
  <loginPage />
</template>

<style lang="scss">
page {
  background-color: #f3f3f3;
}
.menu-page {
  height: v-bind(but_button);
  background: linear-gradient(#fce7cc, #f3f3f3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .button-top {
    height: v-bind(but_top);
  }
  .menu-style {
    display: flex;
    align-items: center;
    height: v-bind(but_height);
    padding-left: 20rpx;
    text {
      color: #9d9486;
      font-weight: bold;
    }
    text:nth-child(2) {
      padding: 0 60rpx;
    }
  }
}
.menu-view-height {
  height: v-bind(but_button);
}
</style>
