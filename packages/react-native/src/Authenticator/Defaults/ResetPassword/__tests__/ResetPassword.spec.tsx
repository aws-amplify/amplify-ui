import React from 'react';
import { render } from '@testing-library/react-native';

import { ResetPassword } from '..';

const props = {} as any;

describe('ResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, findByRole } = render(
      <>
        <ResetPassword {...props} />
        <ResetPassword.Header />
        <ResetPassword.Footer />
        <ResetPassword.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(findByRole('header')).toBeDefined();
  });
});
