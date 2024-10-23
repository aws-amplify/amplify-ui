import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CLASS_BASE } from '../../views/constants';
import { Checkbox } from '../Checkbox';

const myLabelText = 'My Checkbox';
const handleSelect = jest.fn();

describe('Checkbox', () => {
  it('renders the Checkbox', () => {
    render(
      <Checkbox
        id="checkbox-id"
        checked={false}
        labelText={myLabelText}
        onSelect={handleSelect}
      />
    );
    const input = screen.getByRole('checkbox');
    const label = screen.getByText(myLabelText);
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('checked');
    expect(input).toHaveClass(`${CLASS_BASE}__checkbox-input`);
    expect(label).toHaveClass(`${CLASS_BASE}__checkbox-label`);
    expect(label).toBeInTheDocument();
  });

  it('renders the Checkbox checked', () => {
    render(
      <Checkbox
        id="checkbox-id"
        checked
        labelText={myLabelText}
        onSelect={handleSelect}
      />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('checked');
  });

  it('accepts onSelect prop', () => {
    render(
      <Checkbox
        id="checkbox-id"
        checked
        labelText={myLabelText}
        onSelect={handleSelect}
      />
    );
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(handleSelect).toHaveBeenCalled();
  });
});
