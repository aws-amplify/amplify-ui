import React from 'react';
import { render } from '@testing-library/react-native';

import IconButton from '../IconButton';

const source = { uri: 'icon.png' };

describe('IconButton', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(<IconButton source={source} />);

    expect(getByRole('button')).toBeDefined();
    expect(getByRole('image')).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with custom icon style', () => {
    const customIconStyle = { backgroundColor: 'antiquewhite' };
    const { toJSON, getByRole } = render(
      <IconButton iconStyle={customIconStyle} source={source} />
    );

    const icon = getByRole('image');
    expect(icon.props.style).toContain(customIconStyle);
    expect(toJSON()).toMatchSnapshot();
  });
});
