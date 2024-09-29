<script setup lang="ts">
import { buttonPosition } from '@/hook/buttonPosition'
// 创建新对话内容展示
import startPage from './component/start-page.vue'
// 文生文对话
import chatArea from './component/chat-area.vue'
// ai绘图
import aiDrawing from './component/ai-drawing.vue'
// 底部输入框
import inputArea from './component/input-box.vue'
// 个人中心
// import personCenter from '@/pages/personalCenter/index.vue'
// 登录页面
import loginPage from '@/pages/login-page/index.vue'
import { aiChatStore } from '@/stores/modules/aiStore';
import {selctNavIndex} from '@/stores/modules/tabBar'
import {useMemberStore} from '@/stores/modules/user'
const menu = ref(['我的', '对话', 'AI绘画'])
const { but_button, but_height, but_top } = buttonPosition()
const aiChat = aiChatStore()
const user  =useMemberStore()
const instance = getCurrentInstance();
const selectIndex =  selctNavIndex()
const selectTar =(index:number)=>{
     selectIndex.setNavIndex(index)

}
	watch(()=>aiChat.messages,async(newval)=>{
		 await nextTick()
			const query = uni.createSelectorQuery().in(instance)
			query.select('.chatAreaVue').boundingClientRect().exec(rect=>{
        console.log(rect[0])
				uni.pageScrollTo({
				  scrollTop: rect[0].height + 200
				})
			})
	},{deep:true})
</script>
<template>
  <view class="menu-page">
    <view class="button-top"></view>
    <view class="menu-style">
      <text v-for="(item, index) in menu" @click="selectTar(index)" :key="index" :class="{'select-menu':selectIndex.navIndex===index}">{{ item }}</text>
    </view>
  </view>
  <view class="menu-view-height"></view>
  <!-- 创建新对话内容展示 -->
  <startPage v-show="selectIndex.navIndex===1 && aiChat.messages.length===0"/>
  <!-- 文生文对话 -->
  <chatArea class="chatAreaVue" v-show="selectIndex.navIndex===1 && aiChat.messages.length>0"/>
  <!-- AI绘画 -->
  <aiDrawing v-show="selectIndex.navIndex===2"/>
  <!-- 底部输入框 -->
  <inputArea v-show="selectIndex.navIndex===1"/>
  <!-- 个人中心 -->
  <!-- <personCenter /> -->
  <!-- 登录页 -->
  <loginPage v-if="!user.profile?.token"/>
  <view style="height:300rpx"></view>
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
    .select-menu{
      color: #333!important;
      font-weight: bold;
    }
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
