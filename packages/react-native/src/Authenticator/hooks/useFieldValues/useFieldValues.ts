import { useMemo, useState } from 'react';
import { Logger } from 'aws-amplify';

import { OnChangeText, TextFieldOnBlur, TypedField } from '../types';

import { UseFieldValues, UseFieldValuesParams } from './types';
import {
  getSanitizedTextFields,
  getSanitizedRadioFields,
  isRadioFieldOptions,
} from './utils';

const logger = new Logger('Authenticator');

export default function useFieldValues<FieldType extends TypedField>({
  componentName,
  fields = [],
  handleBlur,
  handleChange,
  handleSubmit,
}: UseFieldValuesParams<FieldType>): UseFieldValues<FieldType> {
  const [values, setValues] = useState<Record<string, string>>({});
  const isRadioFieldComponent = componentName === 'VerifyUser';

  const sanitizedFields = useMemo(() => {
    if (!Array.isArray(fields)) {
      logger.warn(
        `Invalid fields type of ${typeof fields} passed to ${componentName}. Fields must be of type array.`
      );
      return [];
    }

    if (isRadioFieldComponent) {
      return getSanitizedRadioFields(fields, componentName);
    }

    return getSanitizedTextFields(fields, componentName);
  }, [componentName, fields, isRadioFieldComponent]);

  const fieldsWithHandlers = sanitizedFields.map((field) => {
    if (isRadioFieldOptions(field)) {
      const onChange = (value: string) => {
        // call `onChange` passed as radio `field` option
        field.onChange?.(value);

        // set `name` as value of 'unverifiedAttr'
        setValues({ unverifiedAttr: value });
      };

      return { ...field, onChange };
    }

    const { name } = field;

    const onBlur: TextFieldOnBlur = (event) => {
      // call `onBlur` passed as text `field` option
      field.onBlur?.(event);

      // call machine blur handler
      handleBlur({ name, value: values[name] });
    };

    const onChangeText: OnChangeText = (value) => {
      // call `onChangeText` passed as text `field` option
      field.onChangeText?.(value);

      // call machine change handler
      handleChange({ name, value });

      setValues({ ...values, [name]: value });
    };

    return { ...field, onBlur, onChangeText, name, value: values[name] };
  }) as FieldType[];

  const disableFormSubmit = isRadioFieldComponent
    ? !values.unverifiedAttr
    : fieldsWithHandlers.some(({ required, value }) => {
        if (!required) {
          return false;
        }

        if (value) {
          return false;
        }
        return true;
      });

  const handleFormSubmit = () => {
    const submitValue = isRadioFieldComponent
      ? values
      : fieldsWithHandlers.reduce(
          (acc, { name, value }) => ({ ...acc, [name]: value }),
          {}
        );

    handleSubmit?.(submitValue);
  };

  return { fields: fieldsWithHandlers, disableFormSubmit, handleFormSubmit };
}
