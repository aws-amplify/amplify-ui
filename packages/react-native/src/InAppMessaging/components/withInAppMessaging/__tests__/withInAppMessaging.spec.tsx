import React from 'react';
import { render } from '@testing-library/react-native';

import withInAppMessaging from '../withInAppMessaging';

const TestComponent = ({ title }: { title: string }) => <>{title}</>;

describe('withInAppMessaging', () => {
  it('renders as expected', () => {
    const WrappedComponent = withInAppMessaging(TestComponent);
    const { toJSON } = render(<WrappedComponent title="example" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
