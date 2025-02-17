import { renderHook } from '@testing-library/react';
import { useView, DEFAULT_VIEW_HOOKS, UseViewType } from '../useView';

jest.mock('../LocationActionView');
jest.mock('../LocationsView');
jest.mock('../LocationDetailView');

describe('useView', () => {
  it.each(Object.entries(DEFAULT_VIEW_HOOKS))(
    'calls the expected hook when provided a %s type key',
    (type, hook) => {
      renderHook(() => useView(type as UseViewType));

      expect(hook).toHaveBeenCalledTimes(1);
    }
  );

  it('throws when provided an unexepected key', () => {
    // turn off console.error logging for unhappy path test case
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      renderHook(() => useView('unexpected!' as UseViewType))
    ).toThrowErrorMatchingSnapshot();
  });
});
