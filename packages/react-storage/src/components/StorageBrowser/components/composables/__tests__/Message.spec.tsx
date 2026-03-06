import React from 'react';
import { render, screen } from '@testing-library/react';
import { capitalize } from '@aws-amplify/ui';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { Message, MessageType } from '../Message';

const content = 'Something to say!';

describe('Message', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it.each(['error', 'warning', 'success'] as MessageType[])(
    'renders with the expected values when provided content and type %s',
    (type) => {
      render(<Message content={content} type={type} />);

      const message = screen.getByRole('alert');
      expect(message).toBeInTheDocument();

      const icon = screen.getByLabelText(capitalize(type));

      expect(icon).toBeInTheDocument();
    }
  );

  it('renders with the expected values when provided content and type info', () => {
    render(<Message content={content} type="info" />);

    const message = screen.getByText(content);
    expect(message).toBeInTheDocument();

    const icon = screen.getByLabelText('Information');
    expect(icon).toBeInTheDocument();
  });

  it('does not render when content is undefined', () => {
    render(<Message />);

    const message = screen.queryByRole('alert');
    expect(message).not.toBeInTheDocument();
  });

  it('renders dismiss button when provided onDismiss', async () => {
    const onDismiss = jest.fn();

    render(<Message content={content} onDismiss={onDismiss} type="info" />);

    const message = screen.getByText(content);
    expect(message).toBeInTheDocument();

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();

    await user.click(btn);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
