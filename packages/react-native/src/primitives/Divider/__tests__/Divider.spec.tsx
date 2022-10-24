import React from 'react';
import { render } from '@testing-library/react-native';

import Divider from '../Divider';

describe('Divider', () => {
  it('renders as expected with label', () => {
    const label = 'Divider label';
    const { toJSON, queryByText } = render(<Divider>{label}</Divider>);
    expect(toJSON()).toMatchSnapshot();

    expect(queryByText(label)).toBeDefined();
  });

  it('renders as expected without label', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toMatchSnapshot();
  });
});
