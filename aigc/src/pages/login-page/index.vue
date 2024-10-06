<script setup lang="ts">
import { ailogin } from '@/api/login'
import { useMemberStore } from '@/stores/modules/user'
const user = useMemberStore()
const userInfo = reactive({
  nickName: '',
  avatar: '',
})
const isLoading = ref(false)
const onChooseAvatar = (e: UniHelper.ButtonOnChooseaddressEvent) => {
  console.log(e)
  const { avatarUrl } = e.detail
  userInfo.avatar = avatarUrl
}
const computeAvatar = computed(() => {
  return userInfo.avatar !== '' ? userInfo.avatar : '/static/touxiang.png'
})
// 头像上传
const uploadImage = () => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: '/ai/avatar',
      filePath: userInfo.avatar,
      name: 'avatar',
      fileType: 'image',
      success: (success) => {
        resolve(JSON.parse(success.data)) // 返回成功的响应 JSON.parse(success.data)
      },
      fail: (error) => {
        console.error('上传失败:', error)
        reject(error) // 处理失败情况
      },
    })
  })
}
const formSubmit = (e: any) => {
  userInfo.nickName = e.detail.value.input
  if (!userInfo.avatar || !userInfo.nickName.trim()) {
    uni.showToast({
      title: '请上传头像和昵称',
      icon: 'none',
    })
    return
  }
  uni.showLoading()
  wx.login({
    success: async ({ code }) => {
      const {
        data: { avatar },
      } = await uploadImage()
      console.log()
      const res = await ailogin({ code, ...userInfo })

      user.setProfile({ ...res.data, avatar })
      uni.hideLoading()
    },
    fail: () => {
      uni.hideLoading()
    },
  })
}
</script>
<template>
  <view class="login-page">
    <image class="login-image" src="@/static/login.png" mode="widthFix" />
    <text class="login-tips">登录体验更多AI功能</text>
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="user" :src="computeAvatar" mode="scaleToFill" />
    </button>
    <form class="form-submit" @submit="formSubmit">
      <input type="nickname" class="input-style" name="input" placeholder="请输入昵称" />
      <button class="submit-button" form-type="submit" :loading="isLoading">登录</button>
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
