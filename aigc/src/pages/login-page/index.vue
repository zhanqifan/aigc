<script setup lang="ts">
const userInfo = reactive({
  name: '',
  avatar: '',
})
const isLoading = ref(false)
const onChooseAvatar = (e: UniHelper.ButtonOnChooseaddressEvent) => {
  const { avatarUrl } = e.detail
  userInfo.avatar = avatarUrl
}
const computeAvatar = computed(() => {
  return userInfo.avatar !== '' ? userInfo.avatar : '/static/touxiang.png'
})
const toLogin = () => {
  wx.login({
    success: function (loginRes) {
      console.log(loginRes)
    },
  })
}
const formSubmit = () => {}
</script>
<template>
  <view class="login-page">
    <image class="login-image" src="@/static/login.png" mode="widthFix" />
    <text class="login-tips">登录体验更多AI功能</text>
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="user" :src="computeAvatar" mode="scaleToFill" />
    </button>
    <form class="form-submit" @submit="formSubmit">
      <input v-model="userInfo.name" class="input-style" placeholder="请输入昵称" />
      <button class="submit-button" :loading="isLoading" @click="toLogin">登录</button>
    </form>
  </view>
</template>

<style lang="scss" scoped>
.login-page {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  .login-image {
    width: 100%;
    margin-top: 110rpx;
  }
  .login-tips {
    margin-top: 40rpx;
    font-weight: bold;
    margin-left: 30rpx;
    font-weight: bold;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    margin: 20rpx auto;
  }
  .user {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    margin: 20rpx auto;
  }
  // .user {
  //   width: 130rpx;
  //   height: 130rpx;
  //   border-radius: 50%;
  //   margin: 20rpx auto;
  // }
  .input-style {
    margin: 50rpx auto;
    width: 90%;
    border-bottom: 1rpx solid rgba(204, 204, 204, 0.3);
  }
  .submit-button {
    background: linear-gradient(to right, #a2c5fe, #c0e7fd);
    padding: 15rpx 0;
    margin: 55rpx 20rpx 0 20rpx;
    font-weight: bold;
  }
}
</style>
