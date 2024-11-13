import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '../Search';

describe('Search', () => {
  it('renders the Search composable', () => {
    render(<Search onSearch={jest.fn()} searchPlaceholder={'Placeholder'} />);

    const field = screen.getByPlaceholderText('Placeholder');
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(field).toBeInTheDocument();
  });

  it('calls onSearch when submit button is clicked', () => {
    const onSearch = jest.fn();

    render(<Search onSearch={onSearch} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      submitButton.click();
    });
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();

    const { getByRole } = render(<Search onSearch={onSearch} />);

    const input = getByRole('textbox');
    input.focus();
    await act(async () => {
      await user.keyboard('boo');
      await user.keyboard('{Enter}');
    });

    expect(onSearch).toHaveBeenCalled();
  });
});
