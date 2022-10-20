import React from 'react';
import { render } from '@testing-library/react-native';

import { ConfirmSignUp } from '..';

const props = {} as any;

describe('ConfirmSignUp', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <>
        <ConfirmSignUp {...props} />
        <ConfirmSignUp.Header />
        <ConfirmSignUp.Footer />
        <ConfirmSignUp.FormFields fields={[]} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
