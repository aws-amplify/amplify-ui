import { useFormContext } from 'react-hook-form';

import { UseForm } from './types';

export default function useForm(): UseForm {
  const {
    handleSubmit,
    formState: { isValid },
    getValues,
    register,
    reset,
    setValue,
  } = useFormContext();

  return { getValues, handleSubmit, isValid, register, reset, setValue };
}
