import { renderHook } from '@testing-library/react';

import { useActionHandlers } from '../context';
import { DefaultActionHandlers } from '../types';
import { useHandler } from '../useHandler';

import { useAction } from '../useAction';

jest.mock('../useHandler');
jest.mock('../context');

const handlers: DefaultActionHandlers = {
  copy: jest.fn(),
  createFolder: jest.fn(),
  delete: jest.fn(),
  download: jest.fn(),
  upload: jest.fn(),
};

describe('useAction', () => {
  beforeAll(() => {
    (useActionHandlers as jest.Mock).mockReturnValue({ handlers });
  });

  beforeEach(jest.clearAllMocks);

  it.each(Object.keys(handlers) as (keyof DefaultActionHandlers)[])(
    'provides the expected handler for the "%s" action type to `useHandler` in the happy path',
    (type) => {
      renderHook(() => useAction(type));

      expect(useHandler).toHaveBeenCalledTimes(1);
      expect(useHandler).toHaveBeenCalledWith(handlers[type], undefined);
    }
  );

  it.each(['listLocations', 'listLocationItems'])(
    'throws the expected error when called with the "%s" action type',
    (type) => {
      // turn off console.error logging for unhappy path test case
      jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() =>
        // @ts-expect-error force allow list action types
        renderHook(() => useAction(type))
      ).toThrowErrorMatchingSnapshot();
    }
  );

  it('throws the expected error when called with a type not mapped to an action handler', () => {
    // turn off console.error logging for unhappy path test case
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      // @ts-expect-error force allow list action types
      renderHook(() => useAction('unexpected!'))
    ).toThrowErrorMatchingSnapshot();
  });
});
