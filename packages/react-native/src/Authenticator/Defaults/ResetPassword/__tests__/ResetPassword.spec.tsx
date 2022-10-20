import React from 'react';
import { render } from '@testing-library/react-native';

import { ResetPassword } from '..';

const props = {} as any;

describe('ResetPassword', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <>
        <ResetPassword {...props} />
        <ResetPassword.Header />
        <ResetPassword.Footer />
        <ResetPassword.FormFields fields={[]} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
