import React from 'react';
import { render } from '@testing-library/react-native';

import { ConfirmResetPassword } from '..';

const props = {} as any;

describe('ConfirmResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON, findByRole } = render(
      <>
        <ConfirmResetPassword {...props} />
        <ConfirmResetPassword.Header />
        <ConfirmResetPassword.Footer />
        <ConfirmResetPassword.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(findByRole('header')).toBeDefined();
  });
});
