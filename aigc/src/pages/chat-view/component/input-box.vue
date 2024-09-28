<script setup lang="ts">
import { aiChatStore } from '@/stores/modules/aiStore'
import { inProgress } from '@/stores/modules/isProgress'
import { AliAudioToken } from '@/api/chatAi'
import { SpeechTranscription } from '@/voice/st'
import { onLoad } from '@dcloudio/uni-app'
const aiChat = aiChatStore()
const show = ref(true)
const Progress= inProgress()
const aliVoice = ref() //阿里云实例化
const textarea = reactive({
  autoHeight: true, //自动增高
  alignItems: 'center',
  height: 0,
})
const instance = getCurrentInstance() //获取当前实例
const lineChange = (e: UniHelper.TextareaOnLinechangeEvent) => {
  console.log(e)
  const { height, lineCount } = e.detail
  // 如果行数>=2
  textarea.alignItems = lineCount >= 2 ? 'flex-end' : 'center'
  // 如果行数>=6
  if (lineCount >= 6) {
    textarea.autoHeight = false
    textarea.height = height
  } else {
    textarea.autoHeight = true
  }
}
const inpContent = ref('') //输入框的值
const showAudio = ref(false)
const textareaHeight = ref('')
// 声波动画数据
const barData = ref([
  '1s',
  '0.9s',
  '0.8s',
  '0.7s',
  '0.6s',
  '0.5s',
  '0.4s',
  '0.3s',
  '0.2s',
  '0.1s',
  '1s',
  '0.9s',
  '0.8s',
  '0.7s',
  '0.6s',
  '0.5s',
  '0.4s',
  '0.3s',
  '0.2s',
  '0.1s',
])
// 发送文本
const sengMsg = () => {
  if (Progress.queryValue()) return false
  if (inpContent.value.trim() === '') return false
  aiChat.startSending(inpContent.value.trim())
  inpContent.value = '' //发送完毕清空输入框
  storageArr.value = []
}
// 获取全局录音管理器
const audio = uni.getRecorderManager()
// 长按开始语音说话
const longpress = async () => {
  if (Progress.queryValue()) return false //大模型正在输出时禁止再语音
  await aliVoice.value.start(aliVoice.value.defaultStartParams())
  showAudio.value = true
  audio.start({
    duration: 1000000,
    numberOfChannels: 1,
    sampleRate: 16000,
    format: 'PCM',
    frameSize: 4,
  })
}
audio.onFrameRecorded((e) => {
  aliVoice.value.sendAudio(e.frameBuffer)
  console.log('录音数据', e)
})
// 录音出现错误
audio.onError((e) => {
  showAudio.value=false
  aliVoice.value.shutdown()

})
// 监听录音结束
// audio.onStop((res) => {
//     showAudio.value=false
//     aliVoice.value.shutdown()
// })
// 手指放开
const touchend = () => {
  showAudio.value = false
  aliVoice.value.shutdown()//关闭阿里云语音监听
  audio.stop()//录音功能关闭
  // 录制结束取出文字发给大模型
  if(storageArr.value.length > 0){

				inpContent.value = storageArr.value.map(item=>item.result).join(' ')

				sengMsg()
		}
}
	// 监听录音结束
	audio.onStop(res=>{
		console.log('录音结束了');
		console.log(res);
		showAudio.value = false
		// 强制关闭阿里云语音识别监听
    aliVoice.value.shutdown()
		// 录制结束取出文字发送大模型

	})
onMounted(async () => {
 setTimeout(()=>{
  const query = uni.createSelectorQuery().in(instance) //获取当前页面的节点
  query
    .select('.input-content')
    .boundingClientRect((res: any) => {
      //获取元素信息
      textareaHeight.value = res.height + 'px' //修改元素高度
    })
    .exec() //执行
  },100)
})
const getAudioAuthorize = (e: boolean) => {
  uni.authorize({
    scope: 'scope.record',
    success() {
      show.value = e
    },
    fail: (fail) => {
      uni.showToast({
        title: '请先打开系统设置允许录音权限',
        icon: 'none',
      })
      showAudio.value = false
    },
  })
}
const storageArr = ref<any>([])
onLoad(async () => {
  const token = await AliAudioToken()
  const st = new SpeechTranscription({
    url: 'wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1',
    token: token.data,
    appkey: 'O8YHjVFyH6SX4nki',
  })
  aliVoice.value = st
  // 实时语音识别中间结果(边说边出文字)
  st.on('changed', (msg: any) => {
    console.log('Client recv changed:', msg)
    const {payload} =JSON.parse(msg)
    const find= storageArr.value.findIndex(item=>item.index===payload.index)
    if(find>=0){
      storageArr.value[find].result=payload.result
    }else{
      storageArr.value.push(payload)
    }
  })
  // 提示句子开始。
  st.on('begin', (msg: any) => {
    console.log('Client recv 开始:', msg)
  })
  // 提示句子结束。纠正
  st.on('end', (msg: any) => {
    console.log('Client recv 结束:', msg)
    const {payload} =JSON.parse(msg)
    const find= storageArr.value.findIndex(item=>item.index===payload.index)
    if(find>=0){
      storageArr.value[find].result=payload.result
    }else{
      storageArr.value.push(payload)
    }
  })

  st.on('failed', (msg: any) => {
    console.log('Client recv 失败:', msg)
    uni.showToast({
      icon:'none',
      title:'录音出现错误'
    })
  })
})
</script>
<template>
  <view class="input-box-area">
    <image
      @click="getAudioAuthorize(!show)"
      :src="show ? '/static/yuyin.png' : '/static/jianpan.png'"
      mode="widthFix"
    />
    <view class="input-content" v-show="show">
      <textarea
        class="textarea-box"
        placeholder="你有什么想知道的,快来问我"
        :show-confirm-bar="false"
        maxlength="500"
        v-model="inpContent"
        cursor-spacing="20"
        fixed
        :auto-height="textarea.autoHeight"
        @linechange="lineChange"
      ></textarea>
    </view>
    <view class="speech-sound" v-show="!show" @longpress="longpress" @touchend="touchend"
      >{{Progress.isProcess?'正在输出内容...':'按住说话'  }}</view
    >
    <image src="@/static/fasong.png" mode="widthFix" @click="sengMsg" />
  </view>
  <!-- 语言录制弹窗 -->
  <view class="mask-view" v-if="showAudio"> </view>
  <view class="record-text" v-if="showAudio">{{ storageArr.map(item=>item.result).join(' ') }}</view>
  <view class="recording-pop-up" v-if="showAudio">
    <view class="release">松开发送</view>
    <view class="in-recognition">正在识别声音</view>
    <view class="audio-wave">
      <text
        class="audio-wave-text"
        v-for="(item, index) in barData"
        :key="index"
        :style="{ 'animation-delay': item }"
      >
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.input-box-area {
  background-color: #f8f8f8;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: v-bind('textarea.alignItems');
  padding-bottom: 68rpx;
  padding-top: 20rpx;

  image {
    width: 47rpx;
    margin: 0 20rpx;
  }
}

.input-content {
  background-color: #ffffff;
  flex: 1;
  width: 100%;
  border-radius: 15rpx;
  padding: 10rpx;

  .textarea-box {
    width: 100%;
    height: v-bind('textarea.height');
  }
}

.speech-sound {
  flex: 1;
  background: linear-gradient(to right, #a2c5fe, #c0e7fd);
  text-align: center;
  border-radius: 15rpx;
  color: #fff;
  height: v-bind('textareaHeight');
  line-height: v-bind('textareaHeight');
}
.mask-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
.record-text {
  position: fixed;
  bottom: 500rpx;
  left: 20rpx;
  right: 10rpx;
  height: 300rpx;
  line-height: 1.4;
  overflow: hidden;
  z-index: 999;
  color: #dddada;
}
.recording-pop-up {
  position: fixed;
  bottom: 0;
  height: 500rpx;
  width: 100%;
  z-index: 999;
  background: linear-gradient(to right, #07d280, #16cbdc);
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  .release {
    color: #fff;
    margin-top: 30rpx;
  }
  .in-recognition {
    margin: 60rpx 0;
    font-size: 45rpx;
  }
}
// 声波效果
.audio-wave {
  .audio-wave-text {
    background-color: #fff;
    width: 7rpx;
    height: 10rpx;
    margin: 0 5rpx;
    border-radius: 5rpx;
    display: inline-block;
    animation: wave 0.2s ease-in-out; //缓动函数
    animation-iteration-count: infinite; // 动画播放次数 无限循环
    animation-direction: alternate; // 动画播放方向 来回播放
    @keyframes wave {
      from {
        transform: scaleY(1);
      }
      to {
        transform: scaleY(4);
      }
    }
  }
}
</style>
