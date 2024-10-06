// 查询对话是否进行中
export const inProgress = defineStore(
  'inProgress',
  () => {
    const isProcess = ref(false)

    const setProcess = (val: boolean) => {
      isProcess.value = val
    }
    const queryValue = () => {
      if (isProcess.value) {
        uni.showToast({
          icon: 'none',
          title: '当前业务正在进行中',
        })
      }
    }
    return {
      queryValue,
      setProcess,
      isProcess,
    }
  },
  // {
  //   persist: {
  //     // 调整为兼容多端的API
  //     storage: {
  //       setItem(key, value) {
  //         uni.setStorageSync(key, value)
  //       },
  //       getItem(key) {
  //         return uni.getStorageSync(key)
  //       },
  //     },
  //   },
  // },
)
