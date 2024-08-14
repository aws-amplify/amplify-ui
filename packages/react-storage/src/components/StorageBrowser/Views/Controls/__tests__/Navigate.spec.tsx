import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ControlProvider } from '../../../context/controls';

import { NavigateControl } from '../Navigate';
import * as useControlObject from '../../../context/controls';

const handleUpdateState = jest.fn();
const state = {
  location: { scope: 's3://test-bucket/*', type: 'BUCKET' },
  history: ['', 'folder1/', 'folder2/', 'folder3/'],
};

const useControlSpy = jest
  .spyOn(useControlObject, 'useControl')
  .mockImplementation(() => [state, handleUpdateState]);

describe('NavigateControl', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    useControlSpy.mockClear();
  });

  it('renders the NavigateControl', () => {
    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    const nav = screen.getByRole('navigation', {
      name: 'Breadcrumbs',
    });

    const list = screen.getByRole('list');

    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('handles selecting "home" navigate item', async () => {
    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    await user.click(screen.getByText('Home'));

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'EXIT',
    });
  });

  it('handles selecting the root bucket navigate item', async () => {
    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    await user.click(screen.getByText('test-bucket'));

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      prefix: '',
    });
  });

  it('handles selecting a folder navigate item', async () => {
    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    await user.click(screen.getByText('folder1'));

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      prefix: 'folder1/',
    });
  });

  it('creates a separator between home and the prefix', () => {
    const { container } = render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    const separators = container.getElementsByClassName(
      'storage-browser__navigate__separator'
    );

    expect(separators).toHaveLength(4);
    expect(separators[0]).toBeInTheDocument();
  });

  it('applies aria-current to last element in the control and does not contain a separator', async () => {
    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );
    const items = await screen.findAllByRole('listitem');
    const lastItem = items[items.length - 1];
    const lastSeparator = lastItem.querySelector(
      '.storage-browser__navigate__separator'
    );
    const currentButton = lastItem.querySelector('button');
    expect(currentButton).toHaveAttribute('aria-current', 'page');
    expect(lastSeparator).toBeNull();
  });
});
