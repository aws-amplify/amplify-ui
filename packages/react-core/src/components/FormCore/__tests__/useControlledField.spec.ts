import { act, renderHook } from '@testing-library/react-hooks';

import { useControlledField } from '..';
import FormProvider from '../FormProvider';
import { DEFAULT_ERROR_MESSAGE } from '../useControlledField';

describe('useControlledField', () => {
  it('returns the expected values in the happy path', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useControlledField({ name: 'test-field' }),
      { wrapper: FormProvider }
    );

    await waitForNextUpdate();

    expect(result.current).toMatchSnapshot();
  });

  it('throws when called outside a FormProvider', () => {
    const { result } = renderHook(() =>
      useControlledField({ name: 'test-field' })
    );

    expect(result.error?.message).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('calls handlers passed as props as expected', async () => {
    const handleChangeText = jest.fn();
    const handleBlur = jest.fn();

    const { result, waitForNextUpdate } = renderHook(
      () =>
        useControlledField({
          name: 'test-field',
          onChangeText: handleChangeText,
          onBlur: handleBlur,
        }),
      { wrapper: FormProvider }
    );

    await waitForNextUpdate();

    const blurEvent = { text: 'blurrr' };

    act(() => {
      result.current.onBlur(blurEvent);
    });

    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledWith(blurEvent);

    const changeTextEvent = 'change';
    act(() => {
      result.current.onChangeText(changeTextEvent);
    });

    expect(handleChangeText).toHaveBeenCalledTimes(1);
    expect(handleChangeText).toHaveBeenCalledWith(changeTextEvent);
  });
});
