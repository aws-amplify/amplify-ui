import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ControlProvider } from '../../../context/controls';

import { NavigateControl } from '../Navigate';
import * as useControlObject from '../../../context/controls';

describe('NavigateControl', () => {
  const user = userEvent.setup();

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
    const mockHandleUpdateState = jest.fn();
    const mockState = {
      location: { current: { bucket: 'test-bucket' }, shouldRefresh: false },
      history: {
        list: ['folder1/', 'folder2/', 'folder3/'],
        shouldRefresh: false,
      },
    };

    jest
      .spyOn(useControlObject, 'useControl')
      .mockImplementation(() => [mockState, mockHandleUpdateState]);

    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    await user.click(screen.getByText('Home'));

    expect(mockHandleUpdateState).toHaveBeenCalledWith({
      type: 'DESELECT_LOCATION',
    });
  });

  it('handles selecting location navigate item', async () => {
    const mockHandleUpdateState = jest.fn();
    const mockState = {
      location: { current: { bucket: 'test-bucket' }, shouldRefresh: false },
      history: {
        list: ['folder1/', 'folder2/', 'folder3/'],
        shouldRefresh: false,
      },
    };

    jest
      .spyOn(useControlObject, 'useControl')
      .mockImplementation(() => [mockState, mockHandleUpdateState]);

    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    await user.click(screen.getByText('test-bucket'));

    expect(mockHandleUpdateState).toHaveBeenCalledWith({
      type: 'SELECT_LOCATION',
      location: { bucket: 'test-bucket' },
    });
  });

  it('handles selecting a folder navigate item', async () => {
    const mockHandleUpdateState = jest.fn();
    const mockState = {
      location: { current: { bucket: 'test-bucket' }, shouldRefresh: false },
      history: {
        list: ['folder1/', 'folder2/', 'folder3/'],
        shouldRefresh: false,
      },
    };

    jest
      .spyOn(useControlObject, 'useControl')
      .mockImplementation(() => [mockState, mockHandleUpdateState]);

    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    await user.click(screen.getByText('folder1/'));

    expect(mockHandleUpdateState).toHaveBeenCalledWith({
      type: 'EXIT_FOLDER',
      index: 0,
    });
  });
});
