import React from 'react';
import { render } from '@testing-library/react-native';

import { ConfirmVerifyUser } from '..';

const props = {} as any;

describe('ConfirmVerifyUser', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(
      <>
        <ConfirmVerifyUser {...props} />
        <ConfirmVerifyUser.Header />
        <ConfirmVerifyUser.Footer />
        <ConfirmVerifyUser.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
  });
});
