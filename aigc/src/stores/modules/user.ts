import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userChatList } from '@/api/chatAi'
// 定义 Store
export const useMemberStore = defineStore(
  'useMemberStore',
  () => {
    type profileType = {
      avatar: string
      nickName: string
      openid: string
      token: string
    }
    // 会员信息
    const profile = ref<profileType>()
    const chatHistory = ref([]) //历史聊天列表
    const sessionId = ref() //会话id
    const newChat = ref(true) //true开启新会话 false:历史对话
    // 保存会员信息，登录时使用
    const setProfile = async (val: profileType) => {
      profile.value = val

      const res = await userChatList()
      console.log('这里', res)
      chatHistory.value = res.data
    }
    const setNewChat = (val: boolean) => {
      newChat.value = val
    }
    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
      setNewChat,
      newChat,
      sessionId,
      chatHistory,
    }
  },
  // TODO: 持久化
  {
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
