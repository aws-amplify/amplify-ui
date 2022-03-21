import * as React from 'react';
import { useCallback } from 'react';
import { getFormDataFromEvent } from '../../../../helpers/utils';
import { useAuthenticator } from '../useAuthenticator';

export default function useFormHandlers() {
  const { submitForm, updateBlur, updateForm } = useAuthenticator();

  const handleBlur = useCallback(
    ({ target: { name } }: React.FocusEvent<HTMLFormElement>) => {
      updateBlur({ name });
    },
    [updateBlur]
  );

  const handleChange = useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLFormElement>) => {
      updateForm({ name, value });
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
