import React from 'react';
import { render } from '@testing-library/react-native';

import withInAppMessaging from '../withInAppMessaging';

jest.mock('aws-amplify/in-app-messaging', () => ({
  onMessageReceived: jest.fn(() => ({ remove: jest.fn() })),
}));

const TestComponent = ({ title }: { title: string }) => <>{title}</>;

describe('withInAppMessaging', () => {
  it('renders as expected', () => {
    const WrappedComponent = withInAppMessaging(TestComponent);
    const { toJSON } = render(<WrappedComponent title="example" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
