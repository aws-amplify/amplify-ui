// mock state machine service
// based on https://github.com/statelyai/xstate/blob/main/packages/core/src/interpreter.ts

export class MockAuthService {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    const unsubscribe = () => {};
    return { unsubscribe };
  }

  start() {
    return this;
  }

  send() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
