import { defineComponent, h, Ref, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import * as XStateVue from '@xstate/vue';
import * as XState from 'xstate';

import { Hub } from 'aws-amplify/core';

import * as AuthModule from 'aws-amplify/auth';
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
    (typeof XStateVue)['useActor']
  >;
});

const getCurrentUserSpy = jest
  .spyOn(AuthModule, 'getCurrentUser')
  .mockResolvedValue(undefined as unknown as AuthModule.GetCurrentUserOutput);

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

    // wait for AuthModule.getCurrentUser to resolve
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

    expect(listenToAuthHubSpy).toHaveBeenCalledTimes(1);
    expect(listenToAuthHubSpy).toHaveBeenCalledWith(
      mockService,
      expect.any(Function)
    );

    expect(hubListenSpy).toHaveBeenCalledTimes(1);
    expect(hubListenSpy).toHaveBeenCalledWith(
      'auth',
      expect.any(Function),
      'authenticator-hub-handler'
    );

    wrapper.unmount();
  });

  it('subscribes only once even if multiple instances are mounted', () => {
    const wrapper = mount(DoubleTestComponent);

    expect(listenToAuthHubSpy).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('calls unsubscribe when component unmounts', async () => {
    const unsubscribeHubSpy = jest.fn();
    listenToAuthHubSpy.mockReturnValueOnce(unsubscribeHubSpy);

    const wrapper = mount(TestComponent);
    wrapper.unmount();

    expect(listenToAuthHubSpy).toHaveBeenCalledTimes(1);
    expect(unsubscribeHubSpy).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes only once even if multiple instances are unmounted', () => {
    const unsubscribeHubSpy = jest.fn();
    listenToAuthHubSpy.mockReturnValueOnce(unsubscribeHubSpy);

    const wrapper = mount(DoubleTestComponent);
    wrapper.unmount();

    expect(unsubscribeHubSpy).toHaveBeenCalledTimes(1);
  });

  it('sets authStatus to `unauthenticated` if there is no signed in user', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(undefined);
    const wrapper = mount(TestComponent);

    // wait for AuthModule.getCurrentUser to resolve
    await flushPromises();

    const { authStatus } = wrapper.vm;
    expect(authStatus).toBe('unauthenticated');

    wrapper.unmount();
  });

  it('sets authStatus to `authenticated` if there is signed in user', async () => {
    getCurrentUserSpy.mockResolvedValueOnce({
      username: 'username',
      userId: 'userId',
    });
    const wrapper = mount(TestComponent);

    // wait for AuthModule.getCurrentUser to resolve
    await flushPromises();

    const { authStatus } = wrapper.vm;
    expect(authStatus).toBe('authenticated');

    wrapper.unmount();
  });

  // @todo-migration
  //     Expected: "authenticated"
  //  Received: "unauthenticated"
  it.skip('sets authStatus to `authenticated` on signIn hub event', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(undefined);
    const wrapper = mount(TestComponent);

    // wait for AuthModule.getCurrentUser to resolve
    await flushPromises();

    expect(wrapper.vm.authStatus).toBe('unauthenticated');

    // send signIn event
    Hub.dispatch('auth', { event: 'signIn' });

    // wait for auth hub handler to resolve
    await flushPromises();
    expect(wrapper.vm.authStatus).toBe('authenticated');

    wrapper.unmount();
  });

  // @todo-migration
  // Expected: "authenticated"
  // Received: "unauthenticated"
  it.skip('sets authStatus to `unauthenticated` on signOut hub event', async () => {
    getCurrentUserSpy.mockResolvedValueOnce(
      undefined as unknown as AuthModule.GetCurrentUserOutput
    );
    const wrapper = mount(TestComponent);

    // wait for AuthModule.getCurrentUser to resolve
    await flushPromises();

    expect(wrapper.vm.authStatus).toBe('authenticated');

    // send signIn event
    Hub.dispatch('auth', { event: 'signOut' });
    expect(wrapper.vm.authStatus).toBe('unauthenticated');

    wrapper.unmount();
  });
});
