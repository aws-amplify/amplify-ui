import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { createStorageBrowser } from '../../../createStorageBrowser';
import { elementsDefault } from '../defaults';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

describe('defaultElements', () => {
  it('renders the elementsDefault when used', async () => {
    const { StorageBrowser } = createStorageBrowser({
      elements: elementsDefault,
      config,
    });

    render(<StorageBrowser />);
    await waitFor(() => {
      const title = screen.getByRole('heading', { name: 'Home' });
      const refresh = screen.getByRole('button', { name: 'Refresh table' });
      expect(title.classList).toContain('amplify-heading');
      expect(refresh.classList).toContain('amplify-button');
    });
  });
  it('renders the action-select-item Button variant with Amplify UI styles', () => {
    const { Button } = elementsDefault;
    render(<Button variant="action-select-item" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain('amplify-button');
  });

  it('renders the cancel Button variant with Amplify UI styles', () => {
    const { Button } = elementsDefault;
    render(<Button variant="cancel" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain('amplify-button--link');
    expect(btn.classList).toContain('amplify-button--link--error');
  });

  it('renders the primary Button variant with Amplify UI styles', () => {
    const { Button } = elementsDefault;
    render(<Button variant="primary" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain('amplify-button--primary');
  });

  it('renders the exit Button variant with Amplify UI styles', () => {
    const { Button } = elementsDefault;
    render(<Button variant="exit" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain('amplify-button--outlined--overlay');
  });

  it('renders the message-dismiss Button variant with Amplify UI styles', () => {
    const { Button } = elementsDefault;
    render(<Button variant="message-dismiss" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain('amplify-button--link');
    expect(btn.classList).toContain('amplify-button--link--overlay');
  });

  it('renders the navigate Button variant with Amplify UI styles', () => {
    const { Button } = elementsDefault;
    render(<Button variant="navigate" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain('amplify-button--link');
  });

  it('renders the Title with Amplify UI styles', () => {
    const { Title } = elementsDefault;
    render(<Title />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title.classList).toContain('amplify-heading');
  });

  it('renders the Label with Amplify UI styles', () => {
    const { Label } = elementsDefault;
    const { container } = render(<Label></Label>);
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label?.classList).toContain('amplify-label');
  });

  it('renders the Input with Amplify UI styles', () => {
    const { Input } = elementsDefault;
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.classList).toContain('amplify-input');
  });

  it('renders the Table with Amplify UI styles', () => {
    const { Table } = elementsDefault;
    render(<Table />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.classList).toContain('amplify-table');
  });
});
