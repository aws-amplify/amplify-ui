import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import * as UIReactCoreModule from '@aws-amplify/ui-react-core';
import {
  AuthenticatorMachineContext,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { withAuthenticator } from '..';

const CHILD_TEST_ID = 'child-test-id';
const CHILD_CONTENT = 'Test Children';

function TestChildren() {
  return <Text testID={CHILD_TEST_ID}>{CHILD_CONTENT}</Text>;
}
const TestComponent = () => {
  return null;
};

const TestApp = withAuthenticator(TestChildren);

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

describe('withAuthenticator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useAuthenticatorRouteSpy.mockReturnValue({
      Component: TestComponent as any,
      props: {} as any,
    });
  });

  it('renders as expected', () => {
    const mockUseAuthenticator = (cb: MockSelectorParam) =>
      cb?.({
        route: 'signIn',
      } as unknown as AuthenticatorMachineContext)[0] as unknown as UseAuthenticator;
    useAuthenticatorSpy.mockImplementation(mockUseAuthenticator);

    const { toJSON, queryByTestId } = render(<TestApp />);

    expect(queryByTestId(CHILD_TEST_ID)).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children when route is authenticated', () => {
    useAuthenticatorSpy.mockImplementation(
      () =>
        ({
          route: 'authenticated',
        } as unknown as UIReactCoreModule.UseAuthenticator)
    );

    const { toJSON, getByTestId } = render(<TestApp />);

    expect(getByTestId(CHILD_TEST_ID)).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
});
