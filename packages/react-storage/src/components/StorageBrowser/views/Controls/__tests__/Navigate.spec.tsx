import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import * as StoreModule from '../../../providers/store';
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

const initialLocation = {
  bucket: 'test-bucket',
  prefix: '',
  id: '0',
  permission: 'READWRITE' as const,
  type: 'PREFIX' as const,
};

const dispatchStoreAction = jest.fn();
const state = {
  history: {
    current: initialLocation,
    previous: [
      {
        bucket: 'test-bucket',
        prefix: '',
        id: '0',
        permission: 'READWRITE',
        type: 'PREFIX',
      },
      {
        bucket: 'test-bucket',
        prefix: 'folder1/',
        id: '1',
        permission: 'READWRITE',
        type: 'PREFIX',
      },
      {
        bucket: 'test-bucket',
        prefix: 'folder2/',
        id: '2',
        permission: 'READWRITE',
        type: 'PREFIX',
      },
      {
        bucket: 'test-bucket',
        prefix: 'folder3/',
        id: '3',
        permission: 'READWRITE',
        type: 'PREFIX',
      },
    ],
  },
} as StoreModule.UseStoreState;

const useStoreSpy = jest
  .spyOn(StoreModule, 'useStore')
  .mockImplementation(() => [state, dispatchStoreAction]);

describe('NavigateControl', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(jest.clearAllMocks);

  it('renders the NavigateControl', () => {
    render(<NavigateControl />);

    const nav = screen.getByRole('navigation', { name: 'Breadcrumbs' });
    expect(nav).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('behaves as expected when the "home" navigate item is clicked', async () => {
    const onExit = jest.fn();
    render(<NavigateControl onExit={onExit} />);

    await user.click(screen.getByText('Home'));

    const { calls } = dispatchStoreAction.mock;
    expect(calls).toHaveLength(2);

    const [[one], [two]] = calls;

    expect(one).toStrictEqual({ type: 'RESET_HISTORY' });
    expect(two).toStrictEqual({ type: 'RESET_ACTION_TYPE' });

    expect(handleList).toHaveBeenCalledTimes(1);
    expect(handleList).toHaveBeenCalledWith({
      prefix: '',
      options: { reset: true },
    });

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('handles selecting the initial location navigate item', async () => {
    const onExit = jest.fn();
    render(<NavigateControl onExit={onExit} />);

    await user.click(screen.getByText('test-bucket'));

    const { calls } = dispatchStoreAction.mock;

    const [[one], [two], [three]] = calls;

    expect(one).toStrictEqual({ type: 'RESET_ACTION_TYPE' });
    expect(two).toStrictEqual({ type: 'RESET_LOCATION_ITEMS' });
    expect(three).toStrictEqual({
      type: 'NAVIGATE',
      destination: initialLocation,
    });

    expect(onExit).not.toHaveBeenCalled();
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
    useStoreSpy.mockReturnValue([
      {
        ...state,
        history: { current: initialLocation, previous: [initialLocation] },
      },
      dispatchStoreAction,
    ]);

    render(<NavigateControl />);

    const expected = 'test-bucket';

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
