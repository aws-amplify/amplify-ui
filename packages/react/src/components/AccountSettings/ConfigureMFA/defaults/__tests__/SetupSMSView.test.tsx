import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import SetupSMSView from '../SetupSMSView';

const commonProps = {
  formValues: {},
  isDisabled: false,
  onCancel: () => {},
  onChange: () => {},
  onDialCodeChange: () => {},
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
};

describe('SetupSMSView', () => {
  it('renders as expected', () => {
    const { container } = render(<SetupSMSView {...commonProps} />);
    expect(container).toMatchSnapshot();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(<SetupSMSView {...commonProps} onCancel={onCancel} />);

    const backButton = await screen.findByRole('button', { name: 'Back' });

    fireEvent.click(backButton);

    expect(onCancel).toBeCalledTimes(1);
    expect(onCancel).toBeCalledWith();
  });

  it('calls onChange when phone number changes', async () => {
    const onChange = jest.fn();
    render(<SetupSMSView {...commonProps} onChange={onChange} />);

    const phoneNumberField = await screen.findByRole('textbox', {
      name: 'Phone Number',
    });

    fireEvent.input(phoneNumberField, {
      target: {
        name: 'phoneNumber',
        value: '1112223333',
      },
    });

    expect(onChange).toBeCalledTimes(1);
  });

  it('calls onChange when dialcode changes', async () => {
    const onDialCodeChange = jest.fn();
    render(
      <SetupSMSView {...commonProps} onDialCodeChange={onDialCodeChange} />
    );

    const dialCodeSelect = await screen.findByRole('combobox', {
      name: 'Country code',
    });

    fireEvent.change(dialCodeSelect, {
      target: { name: 'dialCode', value: '+1' },
    });

    expect(onDialCodeChange).toBeCalledTimes(1);
  });

  it('calls onSubmit when submit button is clicked', async () => {
    const onSubmit = jest.fn();

    render(<SetupSMSView {...commonProps} onSubmit={onSubmit} />);

    const sendButton = await screen.findByRole('button', {
      name: 'Send code',
    });
    fireEvent.click(sendButton);

    expect(onSubmit).toBeCalledTimes(1);
  });

  it('disables phone number field if isDisabled is true', async () => {
    render(<SetupSMSView {...commonProps} isDisabled />);

    const phoneNumberField = await screen.findByRole('textbox', {
      name: 'Phone Number',
    });

    expect(phoneNumberField).toHaveAttribute('disabled');
  });
});
