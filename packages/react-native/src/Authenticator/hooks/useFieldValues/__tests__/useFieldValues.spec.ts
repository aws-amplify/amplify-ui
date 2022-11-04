import { renderHook } from '@testing-library/react-hooks';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import {
  RadioFieldOptions,
  TextFieldOptionsType,
  TypedField,
} from '../../types';
import { UseFieldValuesParams } from '../types';
import useFieldValues from '../useFieldValues';

const textField = {
  type: 'default',
  name: 'test',
  value: 'testValue',
} as TextFieldOptionsType;

const radioField = {
  type: 'radio',
  name: 'test',
  value: 'testValue',
  onChange: jest.fn,
} as RadioFieldOptions;

const mockfields = [];
const props: UseFieldValuesParams<TypedField> = {
  componentName: 'SignIn',
  fields: mockfields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('useFieldValues', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the expected values for text fields', () => {
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [textField],
      })
    );
    expect(result.current).toStrictEqual({
      disableFormSubmit: false,
      fields: [
        {
          ...textField,
          onBlur: expect.any(Function),
          onChangeText: expect.any(Function),
          value: undefined,
        },
      ],
      handleFormSubmit: expect.any(Function),
    });
  });

  it('returns the expected values for radio fields', () => {
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        componentName: 'VerifyUser',
        fields: [radioField],
      })
    );
    expect(result.current).toStrictEqual({
      disableFormSubmit: true,
      fields: [{ ...radioField, onChange: expect.any(Function) }],
      handleFormSubmit: expect.any(Function),
    });
  });

  it('returns the expected values with no fields', () => {
    const { result } = renderHook(() => useFieldValues(props));

    expect(result.current).toStrictEqual({
      disableFormSubmit: false,
      fields: mockfields,
      handleFormSubmit: expect.any(Function),
    });
  });

  it('calls expected handlers for text fields', () => {
    const { result } = renderHook(() =>
      useFieldValues({ ...props, fields: [textField] })
    );

    const mockEvent = {
      nativeEvent: { target: 1 },
    } as NativeSyntheticEvent<TextInputFocusEventData>;
    result.current.fields[0].onBlur?.(mockEvent);
    expect(props.handleBlur).toHaveBeenCalledTimes(1);
    expect(props.handleBlur).toHaveBeenCalledWith({
      name: textField.name,
      value: undefined,
    });

    const mockValue = 'test';
    result.current.fields[0].onChangeText?.(mockValue);
    expect(props.handleChange).toHaveBeenCalledTimes(1);
    expect(props.handleChange).toHaveBeenCalledWith({
      name: textField.name,
      value: mockValue,
    });

    result.current.handleFormSubmit();
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.handleSubmit).toHaveBeenCalledWith({
      [textField.name]: mockValue,
    });
  });

  it('calls expected handlers for radios', () => {
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        componentName: 'VerifyUser',
        fields: [radioField],
      })
    );

    const mockValue = 'test';
    result.current.fields[0].onChange?.(mockValue);
    expect(result.current.fields[0].value).toEqual(radioField.value);

    result.current.handleFormSubmit();
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.handleSubmit).toHaveBeenCalledWith({
      unverifiedAttr: mockValue,
    });
  });
});
