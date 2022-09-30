import React from 'react';
import { render } from '@testing-library/react-native';
import Icon from '../Icon';

const MOCK_SOURCE = { uri: 'mock.png' };

describe('Icon', () => {
  it('renders as expected', () => {
    const { toJSON } = render(<Icon source={MOCK_SOURCE} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with custom styles', () => {
    const customStyle = { tintColor: 'red' };
    const { toJSON } = render(
      <Icon source={MOCK_SOURCE} style={customStyle} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders an animated icon', () => {
    const { toJSON } = render(<Icon source={MOCK_SOURCE} animated />);
    expect(toJSON()).toMatchSnapshot();
  });
});
