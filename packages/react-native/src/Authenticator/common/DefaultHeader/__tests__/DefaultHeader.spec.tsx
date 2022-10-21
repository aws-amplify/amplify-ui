import React from 'react';
import { render } from '@testing-library/react-native';

import { DefaultHeader } from '..';

const heading = 'test';

describe('DefaultHeader', () => {
  it('renders as expected with children', () => {
    const { toJSON, findByLabelText, findByRole } = render(
      <DefaultHeader>{heading}</DefaultHeader>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(findByLabelText(heading)).toBeDefined();
    expect(findByRole('header')).toBeDefined();
  });

  it('renders as expected without children', () => {
    const { toJSON, findByRole } = render(<DefaultHeader />);
    expect(toJSON()).toMatchSnapshot();

    expect(findByRole('header')).toBeDefined();
  });
});
