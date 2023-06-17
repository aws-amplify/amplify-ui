import { act, renderHook } from '@testing-library/react-hooks';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { Logger } from 'aws-amplify';
import {
  UnverifiedContactMethodType,
  authenticatorTextUtil,
} from '@aws-amplify/ui';
import {
  RadioFieldOptions,
  TextFieldOptionsType,
  TypedField,
} from '../../types';
import { UseFieldValuesParams } from '../types';
import useFieldValues from '../useFieldValues';

const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

const textField = {
  label: 'test',
  type: 'default',
  name: 'test',
  value: 'testValue',
} as TextFieldOptionsType;

const radioField = {
  type: 'radio',
  name: 'email',
  value: 'testValue',
  onChange: jest.fn,
} as RadioFieldOptions;

const mockfields = [] as TypedField[];
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
      fieldValidationErrors: {},
      handleFormSubmit: expect.any(Function),
    });
  });

  it('removes hidden labels from text fields', () => {
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [{ ...textField, labelHidden: true }],
      })
    );
    expect(result.current).toStrictEqual({
      disableFormSubmit: false,
      fields: [
        {
          ...textField,
          label: undefined,
          onBlur: expect.any(Function),
          onChangeText: expect.any(Function),
          value: undefined,
        },
      ],
      fieldValidationErrors: {},
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
      fieldValidationErrors: {},
      handleFormSubmit: expect.any(Function),
    });
  });

  it('returns the expected values with no fields', () => {
    const { result } = renderHook(() => useFieldValues(props));

    expect(result.current).toStrictEqual({
      disableFormSubmit: false,
      fields: mockfields,
      fieldValidationErrors: {},
      handleFormSubmit: expect.any(Function),
    });
  });

  it('logs a warning for non array fields', () => {
    const mockFields = 'test' as unknown as RadioFieldOptions[];
    renderHook(() => useFieldValues({ ...props, fields: mockFields }));

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      `Invalid fields type of ${typeof mockFields} passed to ${
        props.componentName
      }. fields must be of type array.`
    );
  });

  it('calls expected handlers for text fields', () => {
    const { result } = renderHook(() =>
      useFieldValues({ ...props, fields: [textField] })
    );

    const mockEvent = {
      nativeEvent: { target: 1 },
    } as NativeSyntheticEvent<TextInputFocusEventData>;
    act(() => {
      result.current.fields[0].onBlur?.(mockEvent);
    });
    expect(props.handleBlur).toHaveBeenCalledTimes(1);
    expect(props.handleBlur).toHaveBeenCalledWith({
      name: textField.name,
      value: undefined,
    });

    const mockValue = 'test';
    act(() => {
      result.current.fields[0].onChangeText?.(mockValue);
    });
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

  it('runs validations for email fields', () => {
    const emailField = {
      label: 'test',
      type: 'email',
      name: 'invalid_email',
      value: 'test@',
    } as TextFieldOptionsType;
    const phoneTextField = {
      type: 'phone',
      name: 'testPhone',
    } as TextFieldOptionsType;
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [emailField, phoneTextField],
      })
    );
    const mockEvent = {
      nativeEvent: { target: 1 },
    } as NativeSyntheticEvent<TextInputFocusEventData>;
    act(() => {
      result.current.fields[0].onBlur?.(mockEvent);
    });
    expect(props.handleBlur).toHaveBeenCalledTimes(1);
    expect(props.handleBlur).toHaveBeenCalledWith({
      name: emailField.name,
      value: undefined,
    });
    expect(result.current.fieldValidationErrors).toStrictEqual({
      [emailField.name]: [authenticatorTextUtil.getInvalidEmailText()],
    });
  });

  it('runs validations for required fields', () => {
    const requiredField = {
      label: 'test',
      type: 'password',
      name: 'required',
      required: true,
    } as TextFieldOptionsType;
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [requiredField],
      })
    );
    const mockEvent = {
      nativeEvent: { target: 1 },
    } as NativeSyntheticEvent<TextInputFocusEventData>;
    act(() => {
      result.current.fields[0].onBlur?.(mockEvent);
    });
    expect(props.handleBlur).toHaveBeenCalledTimes(1);
    expect(props.handleBlur).toHaveBeenCalledWith({
      name: requiredField.name,
      value: undefined,
    });
    expect(result.current.fieldValidationErrors).toStrictEqual({
      [requiredField.name]: [authenticatorTextUtil.getRequiredFieldText()],
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
    act(() => {
      result.current.fields[0].onChange?.(mockValue);
    });
    expect(result.current.fields[0].value).toEqual(radioField.value);

    result.current.handleFormSubmit();
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.handleSubmit).toHaveBeenCalledWith({
      unverifiedAttr: mockValue,
    });
  });

  it('restricts radio fields to unverified contact methods', () => {
    const phoneRadioField = {
      type: 'radio',
      name: 'phone_number',
      value: 'testValue',
      onChange: jest.fn,
    } as RadioFieldOptions;
    const unsupportedRadioField = {
      type: 'radio',
      name: 'test',
      value: 'testUnsupportedValue',
      onChange: jest.fn,
    } as RadioFieldOptions;

    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        componentName: 'VerifyUser',
        fields: [phoneRadioField, unsupportedRadioField],
      })
    );

    expect(result.current.fields.length).toBe(1);
    expect(result.current.fields[0].value).toEqual(phoneRadioField.value);

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      `field with name '${
        unsupportedRadioField.name
      }' has been ignored. Supported values are: ${Object.values(
        UnverifiedContactMethodType
      )}.`
    );
  });

  it("disables form submit if required fields don't have values", () => {
    const mockTextField = {
      type: 'default',
      name: 'test',
      required: true,
    } as TextFieldOptionsType;
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [mockTextField],
      })
    );

    expect(result.current).toStrictEqual({
      disableFormSubmit: true,
      fields: [
        {
          ...mockTextField,
          label: undefined,
          onBlur: expect.any(Function),
          onChangeText: expect.any(Function),
          value: undefined,
        },
      ],
      fieldValidationErrors: {},
      handleFormSubmit: expect.any(Function),
    });
  });

  it('enables form submit if required fields have values', () => {
    const mockTextField = {
      label: 'test',
      type: 'default',
      name: 'test',
      required: true,
    } as TextFieldOptionsType;
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [mockTextField],
      })
    );

    const mockValue = 'test';
    act(() => {
      result.current.fields[0].onChangeText?.(mockValue);
    });

    expect(result.current).toStrictEqual({
      disableFormSubmit: false,
      fields: [
        {
          ...mockTextField,
          onBlur: expect.any(Function),
          onChangeText: expect.any(Function),
          value: mockValue,
        },
      ],
      fieldValidationErrors: {},
      handleFormSubmit: expect.any(Function),
    });
  });

  it('does not submit undefined values for fields', () => {
    const textField = {
      label: 'test',
      type: 'default',
      name: 'testDefault',
    } as TextFieldOptionsType;
    const phoneTextField = {
      type: 'phone',
      name: 'testPhone',
    } as TextFieldOptionsType;
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [textField, phoneTextField],
      })
    );

    result.current.handleFormSubmit();
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.handleSubmit).toHaveBeenCalledWith({
      country_code: '',
      [textField.name]: '',
      [phoneTextField.name]: '',
    });
  });

  it('submits the expected values for phone fields', () => {
    const phoneTextField = {
      type: 'phone',
      name: 'test',
    } as TextFieldOptionsType;
    const { result } = renderHook(() =>
      useFieldValues({
        ...props,
        fields: [phoneTextField],
      })
    );

    const mockValue = '+10000000000';
    act(() => {
      result.current.fields[0].onChangeText?.(mockValue);
    });

    expect(result.current.fields.length).toBe(1);
    expect(result.current.fields[0].value).toEqual(mockValue);
    result.current.handleFormSubmit();
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.handleSubmit).toHaveBeenCalledWith({
      country_code: mockValue.substring(0, 3),
      [phoneTextField.name]: mockValue.substring(3, mockValue.length),
    });
  });
});
