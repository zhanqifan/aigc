<script setup lang="ts"></script>
<template>
  <view class="loading">
    <view class="item"></view>
    <view class="item"></view>
    <view class="item"></view>
  </view>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    margin: 0 10rpx;
    background-color: #20c57d;
    animation: bounce 0.9s infinite;
  }
  .item:nth-child(2) {
    animation-delay: 0.3s;
  }
  .item:nth-child(3) {
    animation-delay: 0.6s;
  }
  @keyframes bounce {
    to {
      opacity: 0.2;
      transform: translateY(-10rpx);
    }
  }
}
</style>
