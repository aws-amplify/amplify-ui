import React from 'react';
import { render, screen } from '@testing-library/react';

import { BreadcrumbNavigation } from '../BreadcrumbNavigation';

describe('BreadcrumbNavigation', () => {
  const breadcrumb = 'Breadcrumb';

  // create mocks
  const mockOnNavigate = jest.fn();

  const breadcrumbs = [
    { name: `${breadcrumb} 1`, onNavigate: mockOnNavigate },
    { name: `${breadcrumb} 2`, onNavigate: mockOnNavigate, isCurrent: true },
  ];

  afterEach(() => {
    mockOnNavigate.mockClear();
  });

  it('renders', () => {
    render(<BreadcrumbNavigation breadcrumbs={breadcrumbs} />);

    const navigation = screen.getByRole('navigation');
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(navigation).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems[0]).toHaveTextContent(`${breadcrumb} 1`);
    expect(listItems[1]).toHaveTextContent(`${breadcrumb} 2`);
  });

  it('navigates when a navigable breadcrumb is clicked', () => {
    render(<BreadcrumbNavigation breadcrumbs={breadcrumbs} />);

    const navigableBreadcrumbs = screen.getAllByRole('button');
    navigableBreadcrumbs[0].click();

    expect(navigableBreadcrumbs).toHaveLength(1);
    expect(mockOnNavigate).toHaveBeenCalledTimes(1);
  });

  it('always renders the current breadcrumb as un-navigable', () => {
    render(<BreadcrumbNavigation breadcrumbs={breadcrumbs} />);

    const listItems = screen.getAllByRole('listitem');
    const navigableBreadcrumbs = screen.queryAllByRole('button');

    expect(listItems[0]).toHaveTextContent(`${breadcrumb} 1`);
    expect(listItems[1]).toHaveTextContent(`${breadcrumb} 2`);
    expect(navigableBreadcrumbs).toHaveLength(1);
  });

  it('supports un-navigable breadcrumbs', () => {
    render(
      <BreadcrumbNavigation
        breadcrumbs={[
          { name: `${breadcrumb} 1` },
          { name: `${breadcrumb} 2`, isCurrent: true },
        ]}
      />
    );

    const listItems = screen.getAllByRole('listitem');
    const navigableBreadcrumbs = screen.queryAllByRole('button');

    expect(listItems[0]).toHaveTextContent(`${breadcrumb} 1`);
    expect(listItems[1]).toHaveTextContent(`${breadcrumb} 2`);
    expect(navigableBreadcrumbs).toHaveLength(0);
  });
});
