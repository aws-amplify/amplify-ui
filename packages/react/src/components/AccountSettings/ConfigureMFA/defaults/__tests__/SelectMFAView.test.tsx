import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import SelectMFAView from '../SelectMFAView';
import MFAOption from '../../MFAOption';

const commonProps = {
  onChange: () => {},
  onCancel: () => {},
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
  isDisabled: false,
};

describe('SelectMFAView', () => {
  it('renders as expected with sms option', () => {
    const { container } = render(
      <SelectMFAView {...commonProps}>
        <MFAOption mfaType="sms" />
      </SelectMFAView>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders as expected with totp option', () => {
    const { container } = render(
      <SelectMFAView {...commonProps}>
        <MFAOption mfaType="totp" />
      </SelectMFAView>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders as expected with both sms and totp option', () => {
    const { container } = render(
      <SelectMFAView {...commonProps}>
        <MFAOption mfaType="sms" />
        <MFAOption mfaType="totp" />
      </SelectMFAView>
    );

    expect(container).toMatchSnapshot();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(
      <SelectMFAView {...commonProps} onCancel={onCancel}>
        <MFAOption mfaType="sms" />
        <MFAOption mfaType="totp" />
      </SelectMFAView>
    );

    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(onCancel).toBeCalledTimes(1);
    expect(onCancel).toBeCalledWith();
  });

  it('calls onChange when one of the options is clicked', async () => {
    const onChange = jest.fn();
    render(
      <SelectMFAView {...commonProps} onChange={onChange}>
        <MFAOption mfaType="sms" />
        <MFAOption mfaType="totp" />
      </SelectMFAView>
    );
    const smsOption = await screen.findByRole('radio', { name: /Use SMS/ });
    fireEvent.click(smsOption);

    expect(onChange).toBeCalledTimes(1);
  });

  it('calls onSubmit when submit button is clicked', async () => {
    const onSubmit = jest.fn();

    render(<SelectMFAView {...commonProps} onSubmit={onSubmit} />);

    const continueButton = await screen.findByRole('button', {
      name: 'Continue',
    });
    fireEvent.click(continueButton);

    expect(onSubmit).toBeCalledTimes(1);
  });
});
