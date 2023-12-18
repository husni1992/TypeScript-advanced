import { EventEmitter, EventTypes } from "./enhanced";

describe("EventEmitter", () => {
  const emitter = new EventEmitter();

  const mockListeners = {
    login: jest.fn(),
    logout: jest.fn(),
    signedOut: jest.fn(),
  };

  beforeEach(() => {
    emitter.on(EventTypes.LOGIN, mockListeners.login);
    emitter.on(EventTypes.LOGOUT, mockListeners.logout);
    emitter.on(EventTypes.ACCESS_DENIED, mockListeners.signedOut);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should call login listener when event ${EventTypes.LOGIN} is emitted`, () => {
    emitter.emit(EventTypes.LOGIN, { name: "User1", age: 31 });

    expect(mockListeners.login).toHaveBeenCalledWith({ name: "User1", age: 31 });
  });

  it(`should call logout listener when event ${EventTypes.LOGOUT} is emitted`, () => {
    emitter.emit(EventTypes.LOGOUT, { name: "User2", age: 31 });

    expect(mockListeners.logout).toHaveBeenCalledWith({ name: "User2", age: 31 });
  });

  it(`should call sign out listener when event ${EventTypes.ACCESS_DENIED} is emitted`, () => {
    emitter.emit(EventTypes.ACCESS_DENIED, { ip: "192.177.1.1", browser: "Chrome" });

    expect(mockListeners.signedOut).toHaveBeenCalledWith({ ip: "192.177.1.1", browser: "Chrome" });
  });

  it(`should not call logout listener when event it's switched off`, () => {
    emitter.off(EventTypes.ACCESS_DENIED, mockListeners.signedOut);
    emitter.emit(EventTypes.ACCESS_DENIED, { ip: "192.177.1.2", browser: "Firefox" });

    expect(mockListeners.signedOut).not.toHaveBeenCalled();
  });
});
