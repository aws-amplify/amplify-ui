import React from 'react';
import { render } from '@testing-library/react-native';

import { ConfirmSignIn } from '..';

const props = {} as any;

describe('ConfirmSignIn', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(
      <>
        <ConfirmSignIn {...props} />
        <ConfirmSignIn.Header />
        <ConfirmSignIn.Footer />
        <ConfirmSignIn.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('header')).toBeDefined();
  });
});
