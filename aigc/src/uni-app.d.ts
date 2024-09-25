declare global {
  namespace UniApp {
    interface RequestTask {
      onChunkReceived: (callback: (data: any) => void) => void
    }
  }
}

export {}
