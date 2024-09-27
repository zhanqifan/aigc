<script setup lang="ts">
import type { ComponentCustomProperties } from 'vue';
import loadingCom from './loading-com.vue'
import {aiChatStore} from '@/stores/modules/aiStore'
const instance = getCurrentInstance()
const appContext = ref<ComponentCustomProperties>()
const ChatStore =aiChatStore()
appContext.value = instance!.appContext.config.globalProperties
// 复制链接
const copyText = (url) =>{
   uni.setClipboardData({
      data: url,
      success:()=>{
         uni.showToast({
          title: '链接复制成功,请到浏览器打开',
          icon: 'none',
          duration: 2000
        })
      },
  })
}
</script>
<template>
  <!-- 虚拟标签 -->
  <block v-for="(item,index) in ChatStore.messages">
  <view class="user-message" v-if="item.role==='user'">{{ item.content }}</view>
  <view class="zhipu-message" v-if="item.role==='assistant'">
    <towxml :nodes="appContext.$towxml(item.content,'markdown')"></towxml>
    <!-- <view>ai回复</view> -->
    <loadingCom v-if="item.finish_reason=='start'" />
    <view class="recommend" v-if="item.web_search.length>0">
      <text class="recomend-tips">我还为你推荐以下内容</text>
      <view class="recomend-list">
        <view class="recomend-content" v-for="search,searindex in item.web_search" :key="searindex" @click="copyText(search.link)">
          <text class="recomend-item ">{{ searindex+1 }}.{{ search.title }}-{{ search.media }}</text>

        </view>
      </view>
    </view>
  </view>
</block>
</template>

<style lang="scss" scoped>
.user-message {
  background-color: #20c57d;
  border-radius: 4rpx;
  color: #fff;
  padding: 15rpx;
  margin: 30rpx 20rpx 0 20rpx;
  width: fit-content;
}
.zhipu-message {
  background-color: #fff;
  border-radius: 4rpx;
  color: #333;
  padding: 15rpx;
  margin: 30rpx 20rpx 0 20rpx;

  width: fit-content;
  .recommend {
    .recomend-tips {
      background-color: #f3f3f3;
      border-radius: 10rpx;
      margin: 20rpx 0;

      padding: 15rpx;
      font-weight: bold;
    }
    .recomend-content {
      background-color: #f3f3f3;
      border-radius: 10rpx;
      padding: 15rpx;
      .recomend-item {
        margin-bottom: 15rpx;
        color: #006c45;
      }
      .recomend-item:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
