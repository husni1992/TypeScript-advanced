export class EventEmitter {
  private listeners: Record<string, Function[]> = {};

  // Adds a listener for a specific event
  on(eventName: string, listener: Function) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  // Emits an event with data
  emit(eventName: string, data?: any) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(data));
    }
  }

  // Removes a specific listener for an event
  off(eventName: string, listener: Function) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((l) => l !== listener);
    }
  }
}

// Usage example (this should be type-safe after your refactoring)
const emitter = new EventEmitter();
emitter.on("LOGIN", (user) => console.log(`User logged in: ${user.name}`));
emitter.on("LOGOUT", (user) => console.log(`User logged in: ${user.name}`));

emitter.on("ACCESS_DENIED", (hacker) => {
  console.log(hacker.browser);
});

emitter.emit("LOGIN", { name: "Alice", age: 30 });
emitter.emit("ACCESS_DENIED", { ip: "192.145.6.1", browser: "Chrome" });
