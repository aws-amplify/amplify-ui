import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import * as XStateVue from '@xstate/vue';
import * as XState from 'xstate';

import * as AmplifyUI from '@aws-amplify/ui';

import { useAuth } from '../useAuth';

class MockAuthService {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return { unsubscribe: jest.fn() };
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

const mockState = {} as unknown as AmplifyUI.AuthMachineState;
const mockService = new MockAuthService() as unknown as XState.AnyInterpreter;
const mockSend = jest.fn();
const mockUnsubscribeHub = jest.fn();

const listenToAuthHubSpy = jest
  .spyOn(AmplifyUI, 'listenToAuthHub')
  .mockReturnValue(mockUnsubscribeHub);

jest.spyOn(XState, 'interpret').mockReturnValue(mockService);
jest.spyOn(XStateVue, 'useActor').mockImplementation(() => {
  return { state: mockState, send: mockSend } as unknown as ReturnType<
    typeof XStateVue['useActor']
  >;
});

// test component to test mount and unmounted logic
const TestComponent = defineComponent({
  setup() {
    return useAuth();
  },
  render() {
    return h('div', 'test component');
  },
});

const DoubleTestComponent = defineComponent({
  render() {
    return h('div', [h(TestComponent), h(TestComponent)]);
  },
});

describe('useAuth', () => {
  beforeEach(() => {
    listenToAuthHubSpy.mockClear();
    mockUnsubscribeHub.mockClear();
  });

  it('returns expected values', () => {
    const wrapper = mount(TestComponent);

    const { state, send, service } = wrapper.vm;

    expect(state).toBe(mockState);
    expect(send).toBe(mockSend);
    expect(service).toBe(mockService);

    wrapper.unmount();
  });

  it('calls subscribe on init', () => {
    const wrapper = mount(TestComponent);
    expect(listenToAuthHubSpy).toBeCalledTimes(1);
    expect(listenToAuthHubSpy).toBeCalledWith(
      mockService,
      AmplifyUI.defaultAuthHubHandler
    );

    wrapper.unmount();
  });

  it('subscribes to hub only once even if multiple instances are mounted', () => {
    const wrapper = mount(DoubleTestComponent);

    expect(listenToAuthHubSpy).toBeCalledTimes(1);
    wrapper.unmount();
  });

  it('calls unsubscribe when component unmounts', async () => {
    const wrapper = mount(TestComponent);
    wrapper.unmount();

    expect(listenToAuthHubSpy).toBeCalledTimes(1);
    expect(mockUnsubscribeHub).toBeCalledTimes(1);
  });

  it('unsubscribes to hub only once even if multiple instances are mounted', () => {
    const wrapper = mount(DoubleTestComponent);
    wrapper.unmount();

    expect(mockUnsubscribeHub).toBeCalledTimes(1);
  });
});
