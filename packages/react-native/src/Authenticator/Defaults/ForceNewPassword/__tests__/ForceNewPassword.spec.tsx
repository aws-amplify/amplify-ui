import React from 'react';
import { render } from '@testing-library/react-native';

import { ForceNewPassword } from '..';

const props = {} as any;

describe('ForceNewPassword', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <>
        <ForceNewPassword {...props} />
        <ForceNewPassword.Header />
        <ForceNewPassword.Footer />
        <ForceNewPassword.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
