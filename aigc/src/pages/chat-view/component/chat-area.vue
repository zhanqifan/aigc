<script setup lang="ts">
import loadingCom from './loading-com.vue'
</script>
<template>
  <view class="user-message">用户发送</view>
  <view class="zhipu-message">
    <view>ai回复</view>
    <!-- <view> <loadingCom /> </view> -->
    <view class="recommend">
      <text class="recomend-tips">我还为你推荐以下内容</text>
      <view class="recomend-list">
        <view class="recomend-content">
          <text class="recomend-item ellipsis-one">123456</text>
          <text class="recomend-item ellipsis-one">123456</text>
          <text class="recomend-item ellipsis-one">123456</text>
        </view>
      </view>
    </view>
  </view>
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
