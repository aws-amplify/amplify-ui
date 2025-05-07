import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchSubfoldersToggle } from '../SearchSubfoldersToggle';

describe('SearchSubfoldersToggle', () => {
  const label = 'overwrite-label';
  const mockOnToggle = jest.fn();

  afterEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders', () => {
    render(<SearchSubfoldersToggle label={label} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox.nextSibling).toHaveTextContent(label);
  });

  it('can be checked', () => {
    render(
      <SearchSubfoldersToggle isSearchingSubfolders onToggle={mockOnToggle} />
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('calls onToggle', () => {
    render(<SearchSubfoldersToggle onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');
    checkbox.click();

    expect(mockOnToggle).toHaveBeenCalled();
  });
});
