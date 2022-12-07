import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import VerifySMSView from '../VerifySMSView';

const commonProps = {
  onCancel: () => {},
  onChange: () => {},
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
};

describe('VerifySMSView', () => {
  it('renders as expected', () => {
    const { container } = render(<VerifySMSView {...commonProps} />);
    expect(container).toMatchSnapshot();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(<VerifySMSView {...commonProps} onCancel={onCancel} />);

    const backButton = await screen.findByRole('button', { name: 'Back' });

    fireEvent.click(backButton);

    expect(onCancel).toBeCalledTimes(1);
    expect(onCancel).toBeCalledWith();
  });

  it('calls onChange when code changes', async () => {
    const onChange = jest.fn();
    render(<VerifySMSView {...commonProps} onChange={onChange} />);

    const phoneNumberField = await screen.findByRole('textbox', {
      name: 'Verification Code',
    });

    fireEvent.input(phoneNumberField, {
      target: {
        name: 'code',
        value: '123',
      },
    });

    expect(onChange).toBeCalledTimes(1);
  });

  it('calls onSubmit when submit button is clicked', async () => {
    const onSubmit = jest.fn();

    render(<VerifySMSView {...commonProps} onSubmit={onSubmit} />);

    const sendButton = await screen.findByRole('button', {
      name: 'Confirm',
    });
    fireEvent.click(sendButton);

    expect(onSubmit).toBeCalledTimes(1);
  });
});
