import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import * as UIReactCoreModule from '@aws-amplify/ui-react-core';
import {
  AuthenticatorMachineContext,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { Authenticator } from '..';

jest.mock('@aws-amplify/ui-react-core');

const CHILD_TEST_ID = 'child-test-id';
const CHILD_CONTENT = 'Test Children';

function TestChildren() {
  return <Text testID={CHILD_TEST_ID}>{CHILD_CONTENT}</Text>;
}
const TestComponent = () => {
  return null;
};

const useAuthenticatorInitMachineSpy = jest.spyOn(
  UIReactCoreModule,
  'useAuthenticatorInitMachine'
);
const useAuthenticatorSpy = jest.spyOn(UIReactCoreModule, 'useAuthenticator');
const useAuthenticatorRouteSpy = jest.spyOn(
  UIReactCoreModule,
  'useAuthenticatorRoute'
);

type MockSelectorParam =
  | ((
      context: AuthenticatorMachineContext
    ) => AuthenticatorMachineContext[keyof AuthenticatorMachineContext][])
  | undefined;

describe('Authenticator', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    useAuthenticatorRouteSpy.mockReturnValue({
      Component: TestComponent as any,
      props: {} as any,
    });
  });

  it('behaves as expected in the happy path', () => {
    const mockUseAuthenticator = (cb: MockSelectorParam) =>
      cb?.({
        route: 'signIn',
      } as unknown as AuthenticatorMachineContext)[0] as unknown as UseAuthenticator;
    useAuthenticatorSpy.mockImplementation(mockUseAuthenticator);

    const { toJSON } = render(<Authenticator />);

    expect(useAuthenticatorInitMachineSpy).toHaveBeenCalledTimes(1);
    expect(useAuthenticatorSpy).toHaveBeenCalledTimes(1);
    expect(useAuthenticatorSpy).toHaveBeenCalledWith(expect.any(Function));

    expect(toJSON()).toMatchSnapshot();
  });

  it.each(['authenticated', 'signOut'])(
    'handles the %s route as expected with children',
    (route) => {
      useAuthenticatorSpy.mockImplementation(
        () => ({ route } as unknown as UseAuthenticator)
      );

      const { getByTestId, toJSON } = render(
        <Authenticator>
          <TestChildren />
        </Authenticator>
      );

      const children = getByTestId(CHILD_TEST_ID);

      expect(children.type).toBe('Text');
      expect(children.props.children).toBe(CHILD_CONTENT);

      expect(toJSON()).toMatchSnapshot();
    }
  );

  it.each(['authenticated', 'signOut'])(
    'handles the %s route as expected without children',
    (route) => {
      useAuthenticatorSpy.mockImplementation(
        () => ({ route } as unknown as UseAuthenticator)
      );

      const { container } = render(<Authenticator />);

      expect(container.instance).toBeNull();
    }
  );
});
