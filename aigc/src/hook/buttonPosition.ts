export const buttonPosition = () => {
  const buttonData = reactive({
    but_height: '0px',
    but_top: '0px',
    but_button: '0px',
  })
  const { height, top, bottom } = uni.getStorageSync('buttonPosition')
  buttonData.but_height = height + 'px'
  buttonData.but_top = top + 'px'
  buttonData.but_button = bottom + 'px'
  return buttonData
}
