import React from 'react';
import { render } from '@testing-library/react-native';

import { SignIn } from '..';

const props = {} as any;

describe('SignIn', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <>
        <SignIn {...props} />
        <SignIn.Header />
        <SignIn.Footer />
        <SignIn.FormFields fields={[]} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
