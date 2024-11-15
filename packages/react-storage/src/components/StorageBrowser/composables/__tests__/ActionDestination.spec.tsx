import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionDestination } from '../ActionDestination';

jest.mock('../../components/BreadcrumbNavigation', () => ({
  BreadcrumbNavigation: () => <div data-testid="breadcrumb-navigation" />,
}));

describe('ActionDestination', () => {
  const item = 'Destination item';
  const items = [
    { name: `${item} 1`, onNavigate: jest.fn() },
    { name: `${item} 2`, onNavigate: jest.fn(), isCurrent: true },
  ];
  const label = 'Destination label';

  it('renders', () => {
    render(<ActionDestination items={items} label={label} />);

    const list = screen.getByRole('list');
    const term = screen.getByRole('term');
    const definitions = screen.getAllByRole('definition');

    expect(list).toBeInTheDocument();
    expect(term).toHaveTextContent(label);
    expect(definitions[0]).toHaveTextContent(`${item} 1`);
    expect(definitions[1]).toHaveTextContent(`${item} 2`);
  });

  it('renders a breadcrumbs navigation if destination should be navigable', () => {
    render(<ActionDestination items={items} label={label} isNavigable />);

    const navigation = screen.getByTestId('breadcrumb-navigation');

    expect(navigation).toBeInTheDocument();
    expect(navigation.previousSibling).toHaveTextContent(label);
  });

  it('returns null if there are no navigation items', () => {
    render(<ActionDestination items={[]} />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
