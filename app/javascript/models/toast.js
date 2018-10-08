export class Toast {
  constructor(toastType, text) {
    this.toastType = toastType
    this.text = text
    this.createdAt = Date.now()
  }
}

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info'
}
