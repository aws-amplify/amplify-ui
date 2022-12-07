import React from 'react';

import { render, screen } from '@testing-library/react';
import MFAOption from '../MFAOption';

describe('MFAOption', () => {
  it('renders as expected when mfaType is sms', async () => {
    const { container } = render(<MFAOption mfaType="sms" />);

    const smsOption = await screen.findByRole('radio', { name: /Use SMS/ });
    expect(smsOption).toHaveAttribute('value', 'sms');

    expect(container).toMatchSnapshot();
  });

  it('renders as expected when mfaType is totp', async () => {
    const { container } = render(<MFAOption mfaType="totp" />);

    const smsOption = await screen.findByRole('radio', { name: /Use an app/ });
    expect(smsOption).toHaveAttribute('value', 'totp');

    expect(container).toMatchSnapshot();
  });
});
