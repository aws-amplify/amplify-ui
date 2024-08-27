import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OverwriteControl, LABEL_TEXT } from '../Overwrite';

describe('OverwriteControl', () => {
  it('renders the OverwriteControl', () => {
    render(<OverwriteControl />);
    const input = screen.getByRole('checkbox');
    const label = screen.getByText(LABEL_TEXT);
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('checked');
    expect(label).toBeInTheDocument();
  });

  it('renders the OverwriteControl checked', () => {
    render(<OverwriteControl defaultChecked />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('checked');
  });

  it('accepts handleChange prop', () => {
    const handleChange = jest.fn();
    render(<OverwriteControl handleChange={handleChange} />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });
});
