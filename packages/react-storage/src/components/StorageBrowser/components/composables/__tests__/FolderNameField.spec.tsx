import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { FolderNameField } from '../FolderNameField';

const placeholder = 'Placeholder';
const id = 'test-id';
const onChange = jest.fn();
const onValidate = jest.fn();

const message = 'Invalid!';
const validationMessage = <span id={id}>{message}</span>;

describe('FolderNameField', () => {
  let user: UserEvent;

  beforeEach(() => {
    jest.clearAllMocks();

    user = userEvent.setup();
  });

  it('has expected validation behavior', async () => {
    const { rerender } = render(
      <FolderNameField
        id={id}
        onChange={onChange}
        onValidate={onValidate}
        placeholder={placeholder}
      />
    );

    const field = screen.getByPlaceholderText('Placeholder');
    expect(field).toBeInTheDocument();

    expect(field).toHaveAttribute('aria-describedby', id);

    await user.type(field, 'hi!');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onValidate).not.toHaveBeenCalled();

    await user.tab();

    expect(onValidate).toHaveBeenCalledTimes(1);

    await user.clear(field);

    expect(field).toHaveAttribute('aria-invalid', 'false');

    rerender(
      <FolderNameField
        id={id}
        onChange={onChange}
        onValidate={onValidate}
        placeholder={placeholder}
        validationMessage={validationMessage}
      />
    );

    expect(field).toHaveAttribute('aria-invalid', 'true');

    const span = screen.getByText(message);
    expect(span).toBeInTheDocument();

    await user.type(field, 'bye!');

    expect(onValidate).toHaveBeenCalledTimes(5);
  });
});
