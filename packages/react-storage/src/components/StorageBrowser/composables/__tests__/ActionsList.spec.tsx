import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionsList } from '../ActionsList';

jest.mock('../../components/DropdownMenu', () => ({
  DropdownMenu: () => <div data-testid="dropdown-menu" />,
}));

describe('ActionsList', () => {
  it('renders', () => {
    render(<ActionsList items={[]} />);

    const menu = screen.getByTestId('dropdown-menu');

    expect(menu).toBeInTheDocument();
  });
});
