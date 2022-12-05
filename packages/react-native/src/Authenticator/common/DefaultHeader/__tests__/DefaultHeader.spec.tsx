import React from 'react';
import { render } from '@testing-library/react-native';

import { DefaultHeader } from '..';

const heading = 'test';

describe('DefaultHeader', () => {
  it('renders as expected with children', () => {
    const { toJSON, getByRole, getByText } = render(
      <DefaultHeader>{heading}</DefaultHeader>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
    expect(getByText(heading)).toBeDefined();
  });

  it('renders as expected without children', () => {
    const { toJSON } = render(<DefaultHeader />);
    expect(toJSON()).toMatchSnapshot();
  });
});
