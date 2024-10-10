import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CheckboxControl, INPUT_CLASSNAME, LABEL_CLASSNAME } from '../Checkbox';

const myLabelText = 'My Checkbox';
const handleSelect = jest.fn();

describe('CheckboxControl', () => {
  it('renders the CheckboxControl', () => {
    render(
      <CheckboxControl
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
    expect(input).toHaveClass(INPUT_CLASSNAME);
    expect(label).toHaveClass(LABEL_CLASSNAME);
    expect(label).toBeInTheDocument();
  });

  it('renders the CheckboxControl checked', () => {
    render(
      <CheckboxControl
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
      <CheckboxControl
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
