import { act, renderHook, waitFor } from '@testing-library/react';

import FormProvider from '../FormProvider';
import useControlledField, {
  DEFAULT_ERROR_MESSAGE,
} from '../useControlledField';

describe('useControlledField', () => {
  it('returns the expected values in the happy path', async () => {
    const { result } = renderHook(
      () => useControlledField({ name: 'test-field' }),
      { wrapper: FormProvider }
    );

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('throws when called outside a FormProvider', () => {
    // turn off console.error logging for unhappy path test case
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      renderHook(() => useControlledField({ name: 'test-field' }))
    ).toThrow(DEFAULT_ERROR_MESSAGE);
  });

  it('calls handlers passed as props as expected', () => {
    const handleChangeText = jest.fn();
    const handleBlur = jest.fn();

    const { result } = renderHook(
      () =>
        useControlledField({
          name: 'test-field',
          onChangeText: handleChangeText,
          onBlur: handleBlur,
        }),
      { wrapper: FormProvider }
    );

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
