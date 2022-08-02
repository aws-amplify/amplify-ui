import React from 'react';
import TestRenderer from 'react-test-renderer';

import withInAppMessaging from '../withInAppMessaging';

const TestComponent = ({ title }: { title: string }) => <>{title}</>;

describe('withInAppMessaging', () => {
  it('renders as expected', () => {
    const WrappedComponent = withInAppMessaging(TestComponent);
    const output = TestRenderer.create(<WrappedComponent title="example" />);

    expect(output.toJSON()).toMatchSnapshot();
  });
});
