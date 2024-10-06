<script setup lang="ts">
import { buttonPosition } from '@/hook/buttonPosition'
import { useMemberStore } from '@/stores/modules/user'
import { aiChatStore } from '@/stores/modules/aiStore'
import { selctNavIndex } from '@/stores/modules/tabBar'
import { getChatDetail } from '@/api/chatAi'
const { but_height, but_top, but_button } = buttonPosition()
const user = useMemberStore()
const aiChat = aiChatStore()
const selIndex = selctNavIndex()
// 开启新会话为true
const openChat = () => {
  user.setNewChat(true)
  user.sessionId = '' //会话id置空调接口时候让后端重新生成
  aiChat.messages = [] //清空当前对话
  selIndex.setNavIndex(1) //指向会话界面
}
const getDetail = async (sessionId: string) => {
  user.setNewChat(false)
  user.sessionId = sessionId
  const res = await getChatDetail({ sessionId })
  aiChat.messages = res.data
  selIndex.setNavIndex(1) //指向会话界面
}
</script>
<template>
  <view class="modal-backdrop"></view>
  <view class="person-center">
    <view class="user-info">
      <image :src="user.profile?.avatar" mode="scaleToFill" />
      <text style="margin-top: 10rpx">{{ user.profile?.nickName }}</text>
    </view>
    <text class="new-dialogue" @click="openChat">开启新对话</text>
    <text class="history" v-if="user.chatHistory.length > 0">对话历史</text>
    <scroll-view
      scroll-y
      v-if="user?.chatHistory?.length > 0"
      enable-passive
      enhance
      type="list"
      class="scorll-height"
    >
      <view
        class="history-list"
        v-for="(item, index) in user.chatHistory"
        @click="getDetail(item.session_id)"
        :key="index"
      >
        <block v-for="(e, index) in item.message" :key="index">
          <text class="history-item-text ellipsis-one">{{ e.content }}</text>
        </block>
        <text class="history-item-data">{{ item.time }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
//遮罩层
.modal-backdrop {
  position: fixed;
  left: 0;
  top: v-bind('but_button');
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
}
.person-center {
  background-color: #f8f8f8;
  position: fixed;
  left: -80%;
  top: v-bind('but_button');
  bottom: 0;
  width: 80%;
  animation: move 0.6s forwards; //动画完成之后保持最后一针的状态
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30rpx 0;
    image {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
    }
    text {
      font-size: 35rpx;
      font-weight: bold;
    }
  }
  @keyframes move {
    0% {
      left: -80%;
    }
    100% {
      left: 0;
    }
  } // 开启新对话
  .new-dialogue {
    margin: 45rpx 20rpx;
  }
  // 对话历史
  .history {
    margin: 30rpx 20rpx 0 20rpx;
    border-bottom: 1rpx solid rgba(218, 218, 218, 0.6);
    padding-bottom: 20rpx;
  }
  .scorll-height {
    height: 800rpx;
    .history-list {
      display: flex;
      margin: 20rpx;
      padding: 20rpx;
      justify-content: space-between;
      background-color: #fff;
      align-items: center;
      .history-item-data {
        color: #9d9eab;
        font-size: 26rpx;
        padding-left: 20rpx;
      }
      .history-item-text {
        flex: 1;
      }
    }
    .history-list:not(:first-child) {
      border-top: 1px solid rgba(204, 204, 204, 0.3); /* 50% 透明度 */
    }
  }
}
</style>
