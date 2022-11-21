import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import * as UIReactCoreModule from '@aws-amplify/ui-react-core';
import {
  AuthenticatorMachineContext,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { Authenticator } from '..';

jest.mock('aws-amplify');
jest.mock('@aws-amplify/ui-react-core');

const CHILD_TEST_ID = 'child-test-id';
const CHILD_CONTENT = 'Test Children';

const CONTAINER_TEST_ID = 'container-test-id';
const FOOTER_TEST_ID = 'footer-test-id';
const HEADER_TEST_ID = 'header-test-id';

function TestChildren() {
  return <Text testID={CHILD_TEST_ID}>{CHILD_CONTENT}</Text>;
}
const TestComponent = () => {
  return null;
};

function Container({ children }: { children: React.ReactNode }) {
  return <View testID={CONTAINER_TEST_ID}>{children}</View>;
}

function Footer() {
  return <View testID={FOOTER_TEST_ID} />;
}

function Header() {
  return <View testID={HEADER_TEST_ID} />;
}

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
    jest.clearAllMocks();

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

  it('renders with custom slot components as expected', () => {
    useAuthenticatorSpy.mockReturnValueOnce({
      route: 'signIn',
    } as unknown as UseAuthenticator);

    const { getByTestId, toJSON } = render(
      <Authenticator Container={Container} Footer={Footer} Header={Header} />
    );

    expect(getByTestId(CONTAINER_TEST_ID)).toBeDefined();
    expect(getByTestId(FOOTER_TEST_ID)).toBeDefined();
    expect(getByTestId(HEADER_TEST_ID)).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });
});
