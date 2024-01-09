export enum EventType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  ACCESS_DENIED = "ACCESS_DENIED",
}

export class EventEmitter {
  private listeners: Record<string, Function[]> = {};

  // Adds a listener for a specific event
  on(eventName: EventType, listener: Function) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  // Emits an event with data
  emit(eventName: EventType, data?: any) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(data));
    }
  }

  // Removes a specific listener for an event
  off(eventName: EventType, listener: Function) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((l) => l !== listener);
    }
  }
}

// Usage example (this should be type-safe after your refactoring)
const emitter = new EventEmitter();

// emit events
emitter.emit(EventType.LOGIN, { invalidKey1: "foo" });
emitter.emit(EventType.ACCESS_DENIED, { invalidKey2: "bar" });

// callback/listeners
emitter.on(EventType.LOGIN, (data) => console.log(`User logged in: ${data.foo}`));
emitter.on(EventType.LOGOUT, (data) => console.log(`User logged in: ${data.invalidKey}`));
emitter.on(EventType.ACCESS_DENIED, (data) => {
  console.log(data.foo);
});

export {};
