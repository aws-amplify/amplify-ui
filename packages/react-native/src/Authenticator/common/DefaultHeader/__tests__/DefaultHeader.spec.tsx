import React from 'react';
import { render } from '@testing-library/react-native';

import { DefaultHeader } from '..';

const heading = 'test';

describe('DefaultHeader', () => {
  it('renders as expected', () => {
    const { toJSON, findByLabelText, findByRole } = render(
      <DefaultHeader>{heading}</DefaultHeader>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(findByLabelText(heading)).toBeDefined();
    expect(findByRole('header')).toBeDefined();
  });
});
