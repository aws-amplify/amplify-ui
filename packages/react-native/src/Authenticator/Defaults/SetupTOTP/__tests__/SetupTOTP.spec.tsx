import React from 'react';
import { render } from '@testing-library/react-native';

import { SetupTOTP } from '..';

const props = {} as any;

describe('SetupTOTP', () => {
  it('renders as expected', () => {
    const { toJSON, findByRole } = render(
      <>
        <SetupTOTP {...props} />
        <SetupTOTP.Header />
        <SetupTOTP.Footer />
        <SetupTOTP.FormFields {...props} />
      </>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(findByRole('header')).toBeDefined();
  });
});
