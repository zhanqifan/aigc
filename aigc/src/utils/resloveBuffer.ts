const resolveBuffer = (buffer: ArrayBuffer) => {
  const arrayBuffer = buffer
  let string = ''
  const newBuffer = new Uint8Array(arrayBuffer)
  for (let i = 0; i < newBuffer.length; i++) {
    string += String.fromCharCode(newBuffer[i])
  }
}
