import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '../Search';

const searchTerm = 'search term';

describe('Search', () => {
  it('renders the Search composable', () => {
    render(
      <Search
        onSearch={jest.fn()}
        showIncludeSubfolders
        searchPlaceholder={'Placeholder'}
      />
    );

    const field = screen.getByPlaceholderText('Placeholder');
    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(field).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  it('uses a checkbox to determine if subfolders should be included in search', () => {
    const onSearch = jest.fn();

    render(<Search onSearch={onSearch} showIncludeSubfolders />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      submitButton.click();
    });

    expect(onSearch).toHaveBeenCalledWith('', false);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    act(() => {
      checkbox.click();
    });
    expect(checkbox).toBeChecked();

    act(() => {
      submitButton.click();
    });
    expect(onSearch).toHaveBeenCalledWith('', true);
  });

  it('searches for the term typed into the field', async () => {
    const onSearch = jest.fn();

    render(<Search onSearch={onSearch} searchPlaceholder="Placeholder" />);

    const inputField = screen.getByPlaceholderText('Placeholder');
    await act(async () => {
      await userEvent.type(inputField, searchTerm);
    });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      submitButton.click();
    });

    expect(onSearch).toHaveBeenCalledWith(searchTerm, false);
  });

  it('calls onSearch when submit button is clicked', () => {
    const onSearch = jest.fn();

    render(<Search onSearch={onSearch} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      submitButton.click();
    });
    expect(onSearch).toHaveBeenCalledWith('', false);
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

    expect(onSearch).toHaveBeenCalledWith('boo', false);
  });
});
