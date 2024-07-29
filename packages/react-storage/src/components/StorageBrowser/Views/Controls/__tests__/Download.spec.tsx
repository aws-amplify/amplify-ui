import React from 'react';
import { render, screen } from '@testing-library/react';
import { DownloadControl } from '../Download';

describe('RefreshControl', () => {
  it('renders the RefreshControl', () => {
    render(<DownloadControl />);

    const button = screen.getByRole('button', {
      name: 'Download item',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it.todo('calls handleDownload onClick');
});
