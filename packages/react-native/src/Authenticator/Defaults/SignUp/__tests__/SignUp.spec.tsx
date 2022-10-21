import React from 'react';
import { render } from '@testing-library/react-native';

import { SignUp } from '..';

const props = {} as any;

describe('SignUp', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <>
        <SignUp {...props} />
        <SignUp.Header />
        <SignUp.Footer />
        <SignUp.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
