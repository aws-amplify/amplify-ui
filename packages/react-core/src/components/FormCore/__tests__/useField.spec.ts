import { renderHook } from '@testing-library/react-hooks';

import { useField } from '..';
import FormProvider from '../FormProvider';
import { DEFAULT_ERROR_MESSAGE } from '../useField';

describe('useField', () => {
  it('returns the expected values in the happy path', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useField({ name: 'test-field' }),
      { wrapper: FormProvider }
    );

    await waitForNextUpdate();

    expect(result.current).toMatchSnapshot();
  });

  it('throws when called outside a FormProvider', () => {
    const { result } = renderHook(() => useField({ name: 'test-field' }));

    expect(result.error?.message).toBe(DEFAULT_ERROR_MESSAGE);
  });
});
