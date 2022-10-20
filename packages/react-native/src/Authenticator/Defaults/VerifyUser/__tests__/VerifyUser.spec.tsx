import React from 'react';
import { render } from '@testing-library/react-native';

import { VerifyUser } from '..';

const props = {} as any;

describe('VerifyUser', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <>
        <VerifyUser {...props} />
        <VerifyUser.Header />
        <VerifyUser.Footer />
        <VerifyUser.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
