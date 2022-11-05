type EventStore = Record<string, CallableFunction[]>

export class EventBus<T extends string = string> {
  private listeners: Partial<EventStore> = {}

  on(event: T, callback: CallableFunction) {
    const listeners = this.listeners[event] || (this.listeners[event] = [])
    listeners.push(callback)
  }

  once(event: T, callback: CallableFunction) {
    const fn = (...args: unknown[]) => {
      callback(...args)
      this.off(event, fn)
    }
    this.on(event, fn)
  }

  off(event: T, callback: CallableFunction) {
    const listeners = this.listeners[event]
    if (listeners) {
      this.listeners[event] = listeners.filter((listener) => listener !== callback)
    }
  }

  emit(event: T, ...args: unknown[]) {
    this.listeners[event]
      ?.forEach((listener) => listener(...args))
  }
}
