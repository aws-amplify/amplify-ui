import React from 'react';
import { render, screen } from '@testing-library/react';
import { View } from '@aws-amplify/ui-react';

import { withInAppMessaging } from '..';

jest.mock('aws-amplify/in-app-messaging', () => ({
  onMessageReceived: jest.fn(() => ({ remove: jest.fn() })),
}));

const TestComponent = ({ title }: { title: string }) => (
  <View testId="testID">{title}</View>
);

describe('withInAppMessaging', () => {
  it('renders a wrapped components', () => {
    const WrappedComponent = withInAppMessaging(TestComponent);
    render(<WrappedComponent title="example" />);

    const testComponent = screen.queryByTestId('testID');
    expect(testComponent).toBeInTheDocument();
  });
});
