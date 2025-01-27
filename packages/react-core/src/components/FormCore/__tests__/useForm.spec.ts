import { renderHook } from '@testing-library/react-hooks';
import ReactHookForm from 'react-hook-form';

import { useForm } from '..';
import FormProvider from '../FormProvider';
import { SubmitHandler } from '../types';
import { DEFAULT_ERROR_MESSAGE } from '../useForm';

// mock 'react-hook-form` context
const mockFormContext: ReactHookForm.UseFormReturn = {
  formState: {
    disabled: false,
    isDirty: false,
    isLoading: false,
    isSubmitSuccessful: false,
    isSubmitted: false,
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    submitCount: 0,
    dirtyFields: [],
    touchedFields: [],
    errors: {},
    validatingFields: {},
  },
  getFieldState: jest.fn(),
  getValues: jest.fn(),
  handleSubmit: jest.fn(),
  register: jest.fn(),
  reset: jest.fn(),
  setValue: jest.fn(),
  watch: jest.fn(),
  setError: jest.fn(),
  clearErrors: jest.fn(),
  trigger: jest.fn(),
  resetField: jest.fn(),
  unregister: jest.fn(),
  control: {} as ReactHookForm.UseFormReturn['control'],
  setFocus: jest.fn(),
};

const useFormContextSpy = jest.spyOn(ReactHookForm, 'useFormContext');

describe('useForm', () => {
  beforeEach(() => {
    useFormContextSpy.mockClear();
  });

  it('returns the expected values in the happy path', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useForm(), {
      wrapper: FormProvider,
    });

    await waitForNextUpdate();

    expect(result.current).toMatchSnapshot();
  });

  it('throws with default error message when called outside a FormProvider', () => {
    const { result } = renderHook(() => useForm());

    expect(result.error?.message).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('throws with cuatom message when called outside a FormProvider', () => {
    const errorMessage = 'message';
    const { result } = renderHook(() => useForm({ errorMessage }));

    expect(result.error?.message).toBe(errorMessage);
  });

  it('returns the expected values from getFieldState in the happy path', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useForm(), {
      wrapper: FormProvider,
    });

    await waitForNextUpdate();

    expect(result.current.getFieldState('test')).toMatchSnapshot();
  });

  it('returns the expected values from getFieldState util for an invalid field', () => {
    const getFieldState = jest
      .fn()
      .mockReturnValueOnce({ error: { message: 'err' } });

    useFormContextSpy.mockReturnValue({ ...mockFormContext, getFieldState });

    const { result } = renderHook(() => useForm(), {
      wrapper: FormProvider,
    });

    expect(result.current.getFieldState('test')).toMatchSnapshot();
  });

  it('returns the expected values from registerField util', () => {
    const { result } = renderHook(() => useForm(), {
      wrapper: FormProvider,
    });

    expect(result.current.registerField({ name: 'test' })).toMatchSnapshot();
  });

  it('forwards the params of setFormValue util as expected', () => {
    const setValue = jest.fn();

    useFormContextSpy.mockReturnValue({ ...mockFormContext, setValue });

    const { result } = renderHook(() => useForm(), {
      wrapper: FormProvider,
    });

    const name = 'test';
    const value = 'value';

    result.current.setFormValue({ name, value });

    expect(setValue).toHaveBeenCalledWith(name, value, {});
  });

  it('handles call to onSubmit provided onSubmit to handleSubmit', () => {
    const mockValues = { test: 'value' };
    const mockEvent = {
      target: { value: 'value' },
    } as React.BaseSyntheticEvent;

    const handleSubmit = jest.fn(
      (onSubmit: SubmitHandler) => (event?: React.BaseSyntheticEvent) =>
        Promise.resolve(onSubmit(mockValues, event))
    );

    useFormContextSpy.mockReturnValue({ ...mockFormContext, handleSubmit });

    const onSubmit = jest.fn();

    const { result } = renderHook(() => useForm({ onSubmit }), {
      wrapper: FormProvider,
    });

    result.current.onSubmit(mockEvent);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(mockValues, mockEvent);
  });
});
