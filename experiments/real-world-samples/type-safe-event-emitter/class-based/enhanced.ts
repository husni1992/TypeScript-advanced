// feature #16 Conditional Types define types that are determined based on conditional logic, allowing for types to change based on the input types
// feature #20 Advanced Generics enables more complex and flexible reusable code for multiple data types with type safety

export enum EventTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  ACCESS_DENIED = "ACCESS_DENIED",
}

type UnknownUser = {
  ip: string;
  browser: "Firefox" | "Chrome";
};

type User = {
  name: string;
  age: number;
};

interface EventDataMap {
  [EventTypes.LOGIN]: User;
  [EventTypes.LOGOUT]: User;
  [EventTypes.ACCESS_DENIED]: UnknownUser;
}

// This can be used instead of EventDataMap, it's a different approach.
type ReturnTypeOfEvent<T extends EventTypes> = T extends EventTypes.ACCESS_DENIED
  ? UnknownUser
  : T extends EventTypes.LOGIN
    ? User
    : T extends EventTypes.LOGOUT
      ? User
      : never;

export class EventEmitter {
  private listeners: Record<string, Function[]> = {};

  // Adds a listener for a specific event, you can also use (data: EventDataMap[T]) => void
  on<T extends EventTypes>(eventName: T, listener: (data: ReturnTypeOfEvent<T>) => void): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  // Emits an event with data
  emit<T extends EventTypes>(eventName: T, data: ReturnTypeOfEvent<T>): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(data));
    }
  }

  // Removes a specific listener for an event
  off(eventName: EventTypes, listener: Function): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((l) => l !== listener);
    }
  }
}

// Usage example with type safety
const emitter = new EventEmitter();
emitter.on(EventTypes.LOGIN, (data) => console.log(`User logged in: ${data.name}`));
emitter.on(EventTypes.LOGOUT, (user) => console.log(`User logged in: ${user.name}`));

emitter.on(EventTypes.ACCESS_DENIED, (user) => {
  console.log(user.browser);
});

emitter.emit(EventTypes.LOGIN, { name: "Alice", age: 30 });
emitter.emit(EventTypes.ACCESS_DENIED, { ip: "192.145.6.1", browser: "Chrome" });
