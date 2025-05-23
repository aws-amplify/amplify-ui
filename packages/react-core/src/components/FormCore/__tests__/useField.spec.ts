import { renderHook, waitFor } from '@testing-library/react';

import { useField } from '..';
import FormProvider from '../FormProvider';
import { DEFAULT_ERROR_MESSAGE } from '../useField';

describe('useField', () => {
  it('returns the expected values in the happy path', async () => {
    const { result } = renderHook(() => useField({ name: 'test-field' }), {
      wrapper: FormProvider,
    });

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('throws when called outside a FormProvider', () => {
    // turn off console.error logging for unhappy path test case
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useField({ name: 'test-field' }))).toThrow(
      DEFAULT_ERROR_MESSAGE
    );
  });
});
