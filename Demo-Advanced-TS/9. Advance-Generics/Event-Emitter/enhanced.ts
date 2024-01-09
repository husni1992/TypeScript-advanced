export enum EventType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  ACCESS_DENIED = "ACCESS_DENIED",
}

type ValidUser = {
  id: number;
  name: string;
  email: string;
};

type UnknownUser = {
  ip: string;
  attemptedUserEmail: string;
  browser: "Firefox" | "Chrome";
};

interface EventDataMap {
  [EventType.LOGIN]: ValidUser;
  [EventType.LOGOUT]: ValidUser;
  [EventType.ACCESS_DENIED]: UnknownUser;
}

// This can be used instead of EventDataMap, this uses TS conditional types.
type ReturnTypeOfEvent<T extends EventType> = T extends EventType.ACCESS_DENIED
  ? UnknownUser
  : T extends EventType.LOGIN
    ? ValidUser
    : T extends EventType.LOGOUT
      ? ValidUser
      : never;

export class EventEmitter {
  private listeners: Record<string, Function[]> = {};

  // Adds a listener for a specific event
  on<T extends EventType>(eventName: T, listener: (data: ReturnTypeOfEvent<T>) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  // Emits an event with data
  emit<T extends EventType>(eventName: T, data: ReturnTypeOfEvent<T>) {
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
emitter.emit(EventType.LOGIN, { id: 123, email: "foo@bar.com", name: "foo" });
emitter.emit(EventType.ACCESS_DENIED, {
  ip: "21.198.118.136",
  browser: "Chrome",
  attemptedUserEmail: "foo@bar.com",
});

// callback/listeners
emitter.on(EventType.LOGIN, (data) => console.log(`User logged in: ${data.name}`));
emitter.on(EventType.LOGOUT, (data) => console.log(`User logged in: ${data.name}`));
emitter.on(EventType.ACCESS_DENIED, (data) => {
  console.log(data.browser);
});
