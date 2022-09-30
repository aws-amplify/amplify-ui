import * as React from 'react';
import { useCallback } from 'react';
import { getFormDataFromEvent } from '../../../../helpers/utils';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

export function useFormHandlers(): {
  handleBlur: (event: React.FocusEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
} {
  const { submitForm, updateBlur, updateForm } = useAuthenticator((context) => [
    context.submitForm,
    context.updateBlur,
    context.updateForm,
  ]);

  const handleBlur = useCallback(
    ({ target: { name } }: React.FocusEvent<HTMLFormElement>) => {
      updateBlur({ name });
    },
    [updateBlur]
  );

  // @TODO: align multiple input type handling with react docs example for 3.0 release
  // example: https://reactjs.org/docs/forms.html#handling-multiple-inputs
  const handleChange = useCallback(
    ({
      target: { checked, name, type, value },
    }: React.ChangeEvent<HTMLFormElement>) => {
      const isUncheckedCheckbox = type === 'checkbox' && !checked;
      updateForm({
        name,
        value: isUncheckedCheckbox ? undefined : (value as string),
      });
    },
    [updateForm]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitForm(getFormDataFromEvent(event));
    },
    [submitForm]
  );

  return { handleBlur, handleChange, handleSubmit };
}
