import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as ControlsModule from '../../../context/control';
import * as ActionsModule from '../../../do-not-import-from-here/actions';

import { NavigateControl } from '../Navigate';

const handleList = jest.fn();
jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
  {
    isLoading: false,
    hasError: false,
    message: undefined,
    data: { result: undefined },
  },
  handleList,
]);

const handleUpdateState = jest.fn();
const state = {
  location: { scope: 's3://test-bucket/*', type: 'BUCKET' },
  history: [
    { prefix: '', position: 0 },
    { prefix: 'folder1/', position: 1 },
    { prefix: 'folder2/', position: 2 },
    { prefix: 'folder3/', position: 3 },
  ],
};
const useControlSpy = jest
  .spyOn(ControlsModule, 'useControl')
  .mockImplementation(() => [state, handleUpdateState]);

describe('NavigateControl', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    handleList.mockClear();
    useControlSpy.mockClear();
  });

  it('renders the NavigateControl', () => {
    render(<NavigateControl />);

    const nav = screen.getByRole('navigation', {
      name: 'Breadcrumbs',
    });

    const list = screen.getByRole('list');

    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('handles selecting "home" navigate item', async () => {
    render(<NavigateControl />);

    await user.click(screen.getByText('Home'));

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'EXIT',
    });
  });

  it('handles selecting the root bucket navigate item', async () => {
    render(<NavigateControl />);

    await user.click(screen.getByText('test-bucket'));

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      entry: { prefix: '', position: 0 },
    });
  });

  it('handles selecting a folder navigate item', async () => {
    render(<NavigateControl />);

    await user.click(screen.getByText('folder1'));

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      entry: { prefix: 'folder1/', position: 1 },
    });
  });

  it('creates a separator between home and the prefix', () => {
    const { container } = render(<NavigateControl />);

    const separators = container.getElementsByClassName(
      'storage-browser__navigate__separator'
    );

    expect(separators).toHaveLength(4);
    expect(separators[0]).toBeInTheDocument();
  });

  it('renders a first entry with a non-empty `prefix` as expected', () => {
    useControlSpy.mockReturnValue([
      { ...state, history: [{ prefix: 'initial/', position: 0 }] },
      handleUpdateState,
    ]);

    render(<NavigateControl />);

    const expected = 'test-bucket/initial';

    expect(screen.getByText(expected)).toBeDefined();
  });

  it('applies aria-current to last element in the control and does not contain a separator', async () => {
    render(<NavigateControl />);

    const items = await screen.findAllByRole('listitem');
    const lastItem = items[items.length - 1];
    const lastSeparator = lastItem.querySelector(
      '.storage-browser__navigate__separator'
    );

    expect(lastItem).toHaveAttribute('aria-current', 'page');
    expect(lastSeparator).toBeNull();
  });
});
