import React from 'react';
import { render } from '@testing-library/react-native';

import { SignIn } from '..';

const props = {} as any;

describe('SignIn', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(
      <>
        <SignIn {...props} />
        <SignIn.Header />
        <SignIn.Footer />
        <SignIn.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
  });
});
