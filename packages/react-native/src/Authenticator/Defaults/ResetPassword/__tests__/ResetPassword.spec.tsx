import React from 'react';
import { render } from '@testing-library/react-native';

import { ResetPassword } from '..';

const props = {} as any;

describe('ResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(
      <>
        <ResetPassword {...props} />
        <ResetPassword.Header />
        <ResetPassword.Footer />
        <ResetPassword.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
  });
});
