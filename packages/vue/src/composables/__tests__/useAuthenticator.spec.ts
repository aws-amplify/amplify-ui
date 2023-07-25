import { defineComponent, h, Ref, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import * as XState from 'xstate';

import * as UIModule from '@aws-amplify/ui';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import * as UseAuthComposables from '../useAuth';
import { useAuthenticator } from '../useAuth';

class MockAuthService {
  subscribe() {
    return { unsubscribe: jest.fn() };
  }

  start() {
    return this;
  }
}

const mockServiceFacade = {
  authStatus: 'authenticated',
  socialProviders: ['amazon'],
} as unknown as AuthenticatorServiceFacade;

const getServiceFacadeSpy = jest
  .spyOn(UIModule, 'getServiceFacade')
  .mockReturnValue(mockServiceFacade);

const mockState = ref({}) as unknown as Ref<UIModule.AuthMachineState>;
const mockService = new MockAuthService() as unknown as XState.AnyInterpreter;
const mockSend = jest.fn();

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  state: mockState,
  service: mockService,
  send: mockSend,
});

const getQRFieldsSpy = jest
  .spyOn(UseAuthComposables, 'getQRFields')
  .mockReturnValue({});

const TestComponent = defineComponent({
  setup() {
    return useAuthenticator();
  },
  render() {
    return h('div', 'test component');
  },
});

describe('useAuthenticator', () => {
  beforeEach(() => {
    getServiceFacadeSpy.mockClear();
  });

  it('returns the expected values', () => {
    const wrapper = mount(TestComponent);

    expect(wrapper.vm.authStatus).toBe('unauthenticated');
    expect(wrapper.vm.socialProviders).toStrictEqual(['amazon']);
    wrapper.unmount();
  });

  it('calls getServiceFacade once on initial mount', () => {
    const wrapper = mount(TestComponent);

    expect(getServiceFacadeSpy).toBeCalledTimes(1);
    expect(getServiceFacadeSpy).toBeCalledWith({
      send: mockSend,
      state: mockState.value,
    });
    wrapper.unmount();
  });

  it('getServiceFacadeValue is called again when state changes', async () => {
    const wrapper = mount(TestComponent);

    expect(getServiceFacadeSpy).toBeCalledTimes(1);
    expect(getServiceFacadeSpy).toBeCalledWith({
      send: mockSend,
      state: mockState.value,
    });
    getServiceFacadeSpy.mockClear();

    // create a new reference
    const newStateValue = { a: 1 };
    mockState.value = newStateValue as unknown as UIModule.AuthMachineState;
    await flushPromises();

    expect(getServiceFacadeSpy).toBeCalledTimes(1);
    expect(getServiceFacadeSpy).toBeCalledWith({
      send: mockSend,
      state: newStateValue,
    });

    wrapper.unmount();
  });

  it('calls getQRFields if route is setupTOTP', () => {
    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'setupTOTP',
    });

    const wrapper = mount(TestComponent);

    expect(getQRFieldsSpy).toHaveBeenCalledWith(mockState.value);

    wrapper.unmount();
  });
});
