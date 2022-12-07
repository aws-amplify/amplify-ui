import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import CurrentMFAView from '../CurrentMFAView';

describe('CurrentMFAView', () => {
  it('renders as expected when current mfa is sms', () => {
    const { container } = render(
      <CurrentMFAView
        currentMFA="sms"
        onDisableMFA={jest.fn()}
        onUpdateMFA={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders as expected when current mfa is totp', () => {
    const { container } = render(
      <CurrentMFAView
        currentMFA="totp"
        onDisableMFA={() => {}}
        onUpdateMFA={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('calls onDisableMFA if disable button is clicked', async () => {
    const onDisableMFA = jest.fn();
    render(
      <CurrentMFAView
        currentMFA="sms"
        onDisableMFA={onDisableMFA}
        onUpdateMFA={() => {}}
      />
    );
    const disableMFAButton = await screen.findByRole('button', {
      name: 'Disable MFA',
    });

    fireEvent.click(disableMFAButton);

    expect(onDisableMFA).toBeCalledTimes(1);
    expect(onDisableMFA).toBeCalledWith();
  });

  it('calls onUpdateMFA when update button is clicked', async () => {
    const onUpdateMFA = jest.fn();
    render(
      <CurrentMFAView
        currentMFA="sms"
        onDisableMFA={() => {}}
        onUpdateMFA={onUpdateMFA}
      />
    );

    const updateButton = await screen.findByRole('button', {
      name: 'Update',
    });

    fireEvent.click(updateButton);

    expect(onUpdateMFA).toBeCalledTimes(1);
    expect(onUpdateMFA).toBeCalledWith();
  });
});
