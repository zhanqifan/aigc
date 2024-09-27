<script setup lang="ts">
import { getChatAiImg } from '@/api/chatAi'
const styleList = ref([
  {
    icon: '/static/fengge/001.png',
    style: '无风格',
    color: '#1F9BE5',
  },
  {
    icon: '/static/fengge/002.png',
    style: '动漫风格',
    color: '#4F965E',
  },
  {
    icon: '/static/fengge/003.png',
    style: '写实',
    color: '#93726F',
  },
  {
    icon: '/static/fengge/004.jpg',
    style: 'Q版简绘',
    color: '#204251',
  },
  {
    icon: '/static/fengge/005.png',
    style: '治愈男生',
    color: '#656565',
  },
  {
    icon: '/static/fengge/006.png',
    style: '治愈女生',
    color: '#D49D7D',
  },
  {
    icon: '/static/fengge/007.png',
    style: '卡通手绘',
    color: '#ff9999',
  },
  {
    icon: '/static/fengge/008.png',
    style: '复古动漫',
    color: '#ffcc66',
  },
  {
    icon: '/static/fengge/009.png',
    style: '港风胶片',
    color: '#cc3300',
  },
])
type ImageItem = {
  url: string
  prompt: string
}
const createImage = ref<ImageItem[]>([
  {
    url: '',
    prompt: '',
  },
])
const describe = ref()
const isDrawing = ref(false)
const isLoading = ref(false)
const startSending = async (prompt: string) => {
  isLoading.value=true
  createImage.value = [
    {
      url: '',
      prompt: 'AI正在生成中',
    },
  ]
  try {
    const res = await getChatAiImg({ prompt })

    if (res.code == 400) {
      createImage.value = [
        {
          url: res.data.url,
          prompt: res.data.message,
        },
      ]
    } else {
      createImage.value = [
        {
          url: res.data.url,
          prompt: prompt,
        },
      ]
    }
    isDrawing.value = true
    isLoading.value=false
  } catch (error) {
    createImage.value = [
      {
        url: '',
        prompt: error.data.data.msg||'生成失败',
      },
    ]
    isDrawing.value = false
    isLoading.value=false
  }
}

const isSelect = ref(0)
const previewMedia = (url:string)=>{
  uni.previewImage({
    urls: [url],
  })
}
</script>
<template>
  <view class="style-title">生成风格</view>
  <scroll-view scroll-x class="scroll-view_H" :scroll-with-animation="true" :enable-passive="true">
    <view
      v-for="(item, index) in styleList"
      class="style-content"
      :class="{ 'select-style': isSelect === index }"
      @click="isSelect = index"
      :key="index"
    >
      <view class="style-list">
        <image :src="item.icon" mode="aspectFill" />
        <text :style="{ background: item.color }">{{ item.style }}</text>
      </view>
    </view>
  </scroll-view>
  <view class="keyword-title">画面关键词</view>
  <view class="textarea-view">
    <textarea
      class="textarea-style"
      v-model="describe"
      placeholder="请输入中文描述,比如画一位女子,身穿汉服,手拿佩剑,眼神凌厉。"
    />
  </view>
  <!-- 生成效果 -->
  <view class="creative-tips">{{ createImage[0].prompt }}</view>
  <view class="creative-image" v-show="isDrawing">
    <image :src="createImage[0].url" mode="widthFix" @click="previewMedia(createImage[0].url)"/>
  </view>
  <button
    class="submit-creation"
    @click="startSending(`${describe},风格:${styleList[isSelect].style}`)"
    :loading="isLoading"
    :disabled="isLoading"
   >
    生成图片
  </button>
</template>

<style lang="scss" scoped>
.style-title {
  padding: 20rpx;
}
.scroll-view_H {
  white-space: nowrap;
  height: 130rpx;
  .style-content {
    height: 130rpx;
    width: 130rpx;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 15rpx;
    .style-list {
      position: relative;
      image {
        width: 110rpx;
        height: 110rpx;
        border-radius: 15rpx;
        position: relative;
      }
      text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 22rpx;
        border-bottom-left-radius: 15rpx;
        border-bottom-right-radius: 15rpx;
        text-align: center;
        padding: 5rpx 0;
        color: #ffffff;
      }
    }
  }
  .style-content:last-child {
    margin-right: 20rpx;
  }
  // 选中加上边框
  .select-style {
    border: 4rpx solid #e23256;
    border-radius: 15rpx;
    box-sizing: border-box;
  }
}
.keyword-title {
  padding: 50rpx 20rpx 20rpx 20rpx;
}
.textarea-view {
  background-color: #ffffff;
  margin: 0 20rpx;
  border-radius: 15rpx;
  padding: 10rpx;
  .textarea-style {
    width: 100%;
    line-height: 1.4;
  }
}
.creative-tips {
  text-align: center;
  padding: 30rpx 20rpx;
  color: darkorange;
  font-weight: bold;
  line-height: 1.5;
}
.creative-image {
  margin: 0 20rpx;
  image {
    width: 100%;
    border-radius: 5rpx;
  }
}
.submit-creation {
  position: fixed;
  bottom: 68rpx;
  left: 20rpx;
  right: 20rpx;
  padding: 20rpx 0;
  border-radius: 40rpx;
  background: linear-gradient(to right, #a2c5fe, #c0e7fd);
}
</style>
