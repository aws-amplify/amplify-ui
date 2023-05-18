import { defineComponent, h, Ref, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import * as XStateVue from '@xstate/vue';
import * as XState from 'xstate';

import { Auth, Hub } from 'aws-amplify';
import * as UIModule from '@aws-amplify/ui';

import { useAuth } from '../useAuth';

class MockAuthService {
  subscribe() {
    return { unsubscribe: jest.fn() };
  }

  start() {
    return this;
  }

  getSnapshot() {
    return { matches: () => false };
  }
}

const mockState = ref({}) as unknown as Ref<UIModule.AuthMachineState>;
const mockService = new MockAuthService() as unknown as XState.AnyInterpreter;
const mockSend = jest.fn();

const listenToAuthHubSpy = jest.spyOn(UIModule, 'listenToAuthHub');
const hubListenSpy = jest.spyOn(Hub, 'listen');

jest.spyOn(XState, 'interpret').mockReturnValue(mockService);
jest.spyOn(XStateVue, 'useActor').mockImplementation(() => {
  return { state: mockState, send: mockSend } as unknown as ReturnType<
    typeof XStateVue['useActor']
  >;
});

const currentAuthUserSpy = jest
  .spyOn(Auth, 'currentAuthenticatedUser')
  .mockResolvedValue(undefined);

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
    jest.clearAllMocks();
  });

  it('returns expected values', async () => {
    const wrapper = mount(TestComponent);

    // wait for Auth.currentAuthenticatedUser to resolve
    await flushPromises();
    const { authStatus, state, send, service } = wrapper.vm;

    expect(authStatus).toBe('authenticated');
    expect(state).toBe(mockState.value);
    expect(send).toBe(mockSend);
    expect(service).toBe(mockService);

    wrapper.unmount();
  });

  it('calls subscribe on init', () => {
    const wrapper = mount(TestComponent);

    expect(listenToAuthHubSpy).toBeCalledTimes(1);
    expect(listenToAuthHubSpy).toBeCalledWith(
      mockService,
      expect.any(Function)
    );

    expect(hubListenSpy).toBeCalledTimes(1);
    expect(hubListenSpy).toBeCalledWith(
      'auth',
      expect.any(Function),
      'authenticator-hub-handler'
    );

    wrapper.unmount();
  });

  it('subscribes only once even if multiple instances are mounted', () => {
    const wrapper = mount(DoubleTestComponent);

    expect(listenToAuthHubSpy).toBeCalledTimes(1);
    wrapper.unmount();
  });

  it('calls unsubscribe when component unmounts', async () => {
    const unsubscribeHubSpy = jest.fn();
    listenToAuthHubSpy.mockReturnValueOnce(unsubscribeHubSpy);

    const wrapper = mount(TestComponent);
    wrapper.unmount();

    expect(listenToAuthHubSpy).toBeCalledTimes(1);
    expect(unsubscribeHubSpy).toBeCalledTimes(1);
  });

  it('unsubscribes only once even if multiple instances are unmounted', () => {
    const unsubscribeHubSpy = jest.fn();
    listenToAuthHubSpy.mockReturnValueOnce(unsubscribeHubSpy);

    const wrapper = mount(DoubleTestComponent);
    wrapper.unmount();

    expect(unsubscribeHubSpy).toBeCalledTimes(1);
  });

  it('sets authStatus to `unauthenticated` if there is no signed in user', async () => {
    currentAuthUserSpy.mockRejectedValueOnce(undefined);
    const wrapper = mount(TestComponent);

    // wait for Auth.currentAuthenticatedUser to resolve
    await flushPromises();

    const { authStatus } = wrapper.vm;
    expect(authStatus).toBe('unauthenticated');

    wrapper.unmount();
  });

  it('sets authStatus to `authenticated` if there is signed in user', async () => {
    currentAuthUserSpy.mockResolvedValueOnce(undefined);
    const wrapper = mount(TestComponent);

    // wait for Auth.currentAuthenticatedUser to resolve
    await flushPromises();

    const { authStatus } = wrapper.vm;
    expect(authStatus).toBe('authenticated');

    wrapper.unmount();
  });

  it('sets authStatus to `authenticated` on signIn hub event', async () => {
    currentAuthUserSpy.mockRejectedValueOnce(undefined);
    const wrapper = mount(TestComponent);

    // wait for Auth.currentAuthenticatedUser to resolve
    await flushPromises();

    expect(wrapper.vm.authStatus).toBe('unauthenticated');

    // send signIn event
    Hub.dispatch('auth', { event: 'signIn' });

    // wait for auth hub handler to resolve
    await flushPromises();
    expect(wrapper.vm.authStatus).toBe('authenticated');

    wrapper.unmount();
  });

  it('sets authStatus to `unauthenticated` on signOut hub event', async () => {
    currentAuthUserSpy.mockResolvedValueOnce(undefined);
    const wrapper = mount(TestComponent);

    // wait for Auth.currentAuthenticatedUser to resolve
    await flushPromises();

    expect(wrapper.vm.authStatus).toBe('authenticated');

    // send signIn event
    Hub.dispatch('auth', { event: 'signOut' });
    expect(wrapper.vm.authStatus).toBe('unauthenticated');

    wrapper.unmount();
  });
});
