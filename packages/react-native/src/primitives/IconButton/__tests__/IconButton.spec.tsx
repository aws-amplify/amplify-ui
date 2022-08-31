import React from 'react';
import TestRenderer from 'react-test-renderer';

import IconButton from '../IconButton';

const source = { uri: 'icon.png' };

describe('IconButton', () => {
  it('renders as expected', () => {
    const iconButton = TestRenderer.create(<IconButton source={source} />);
    expect(iconButton.toJSON()).toMatchSnapshot();
  });

  it('renders as expected with custom icon style', () => {
    const iconButton = TestRenderer.create(
      <IconButton
        iconStyle={{ backgroundColor: 'antiquewhite' }}
        source={source}
      />
    );
    expect(iconButton.toJSON()).toMatchSnapshot();
  });
});
