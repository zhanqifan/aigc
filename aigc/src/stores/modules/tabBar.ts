export const selctNavIndex = defineStore('slectNavIndex',()=> {
       const navIndex = ref(1)//存储导航栏下标
       const setNavIndex = (index:number) => {
         navIndex.value = index
       }

       return {
        navIndex,
        setNavIndex
       }
},{
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
})
