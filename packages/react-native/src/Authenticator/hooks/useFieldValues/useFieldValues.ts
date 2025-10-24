import { useMemo, useRef, useState } from 'react';
import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import type { ValidationError } from '@aws-amplify/ui';

import type {
  OnChange,
  OnChangeText,
  RadioFieldOptions,
  TextFieldOnBlur,
  TypedField,
} from '../types';

import type { UseFieldValues, UseFieldValuesParams } from './types';
import {
  getSanitizedTextFields,
  isRadioFieldOptions,
  runFieldValidation,
  getSanitizedVerifyUserFields,
  getSanitizedSelectMfaTypeFields,
} from './utils';

const logger = new Logger('Authenticator');

export default function useFieldValues<FieldType extends TypedField>({
  componentName,
  fields = [],
  handleBlur,
  handleChange,
  handleSubmit,
  validationErrors,
}: UseFieldValuesParams<FieldType>): UseFieldValues<FieldType> {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const lastProcessed = useRef<string>();
  const [fieldValidationErrors, setFieldValidationErrors] =
    useState<ValidationError>({});
  const isVerifyUserRoute = componentName === 'VerifyUser';
  const isSelectMfaTypeRoute = componentName === 'SelectMfaType';
  const isRadioFieldComponent = isVerifyUserRoute || isSelectMfaTypeRoute;

  // initialize values based on route
  // select mfa type screen should auto select first radio option
  const [values, setValues] = useState(() => {
    const result: Record<string, string> = {};
    if (isSelectMfaTypeRoute) {
      const initialValue = fields[0]?.value;
      if (initialValue) {
        result.mfa_type = initialValue;
      }
    }
    if (isVerifyUserRoute) {
      const initialValue = fields[0]?.name;
      if (initialValue) {
        result.unverifiedAttr = initialValue;
      }
    }

    return result;
  });

  const sanitizedFields = useMemo(() => {
    if (!Array.isArray(fields)) {
      logger.warn(
        `Invalid fields type of ${typeof fields} passed to ${componentName}. fields must be of type array.`
      );
      return [];
    }

    if (isVerifyUserRoute) {
      return getSanitizedVerifyUserFields(fields);
    }

    if (isSelectMfaTypeRoute) {
      return getSanitizedSelectMfaTypeFields(fields);
    }

    return getSanitizedTextFields(fields, componentName);
  }, [componentName, fields, isVerifyUserRoute, isSelectMfaTypeRoute]);

  const fieldsWithHandlers = sanitizedFields.map((field) => {
    if (isRadioFieldOptions(field)) {
      const onChange = (value: string) => {
        // call `onChange` passed as radio `field` option
        field.onChange?.(value);

        // on VerifyUser route, set `name` as value of 'unverifiedAttr'
        // on SelectMfaTYpe route, set `name` as value of 'mfa_type'
        const fieldName = isVerifyUserRoute
          ? 'unverifiedAttr'
          : isSelectMfaTypeRoute
          ? 'mfa_type'
          : field.name;

        setValues((prev) => ({ ...prev, [fieldName]: value }));
      };

      const result: RadioFieldOptions = {
        ...field,
        onChange,
      };

      // bind selected boolean attribute for radio field
      if (isSelectMfaTypeRoute) {
        result.selected = values.mfa_type === field.value;
      }
      if (isVerifyUserRoute) {
        result.selected = values.unverifiedAttr === field.name;
      }

      return result;
    }

    const { name, label, labelHidden, ...rest } = field;

    const onBlur: TextFieldOnBlur = (event) => {
      const textValue = values[name] || event?.nativeEvent?.text;
      setTouched({ ...touched, [name]: true });

      // call `onBlur` passed as text `field` option
      field.onBlur?.(event);

      // call machine blur handler
      handleBlur({ name, value: textValue });

      setFieldValidationErrors({
        ...fieldValidationErrors,
        [name]: runFieldValidation(field, textValue, validationErrors),
      });
    };

    const reportChange = (value: string) => {
      if (lastProcessed.current === `${name}:${value}`) {
        return;
      }

      // call machine change handler
      handleChange({ name, value });

      if (touched[name]) {
        setFieldValidationErrors({
          ...fieldValidationErrors,
          [name]: runFieldValidation(field, value, validationErrors),
        });
      }

      lastProcessed.current = `${name}:${value}`;
      setValues((prev) => ({ ...prev, [name]: value }));
    };

    const onChangeText: OnChangeText = (value) => {
      // call `onChangeText` passed as text `field` option
      field.onChangeText?.(value);

      reportChange(value);
    };

    const onChange: OnChange = (event) => {
      // call `onChange` passed as text `field` option
      field.onChange?.(event);

      reportChange(event.nativeEvent.text ?? '');
    };

    return {
      ...rest,
      label: labelHidden ? undefined : label,
      onBlur,
      onChange,
      onChangeText,
      name,
      value: values[name],
    };
  }) as FieldType[];

  const disableFormSubmit = isVerifyUserRoute
    ? !values.unverifiedAttr
    : isSelectMfaTypeRoute
    ? !values.mfa_type
    : fieldsWithHandlers.some(({ required, value }) => required && !value);

  const handleFormSubmit = () => {
    const submitValue = isRadioFieldComponent
      ? values
      : fieldsWithHandlers.reduce((acc, { name, value = '', type }) => {
          /*
                For phone numbers pass the first 3 charactes from value as dialCode until we support a dialCode picker
            */
          return type === 'phone'
            ? {
                ...acc,
                country_code: value?.substring(0, 3),
                [name]: value?.substring(3, value.length),
              }
            : { ...acc, [name]: value };
        }, {});

    handleSubmit?.(submitValue);
  };

  return {
    fields: fieldsWithHandlers,
    disableFormSubmit,
    fieldValidationErrors: { ...fieldValidationErrors, ...validationErrors },
    handleFormSubmit,
  };
}
