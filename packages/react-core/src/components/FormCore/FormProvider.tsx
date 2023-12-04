import React from 'react';
import {
  useForm as useReactHookForm,
  FormProvider as ReactHookFormProvider,
} from 'react-hook-form';

import { FormValues, FormHandle, FormProviderProps } from './types';

const DEFAULT_MODE = 'onTouched';

const FormProvider = React.forwardRef<
  FormHandle,
  FormProviderProps<FormValues>
>(function FormProvider<Values extends FormValues>(
  { children, defaultValues, mode = DEFAULT_MODE }: FormProviderProps<Values>,
  ref: React.ForwardedRef<FormHandle<Values>>
) {
  const formProviderProps = useReactHookForm<Values>({
    defaultValues,
    mode,
  });

  const { getValues, reset } = formProviderProps;
  React.useImperativeHandle(
    ref,
    () => ({ getValues, reset: () => reset(defaultValues) }),
    [defaultValues, getValues, reset]
  );

  return (
    <ReactHookFormProvider {...formProviderProps}>
      {children}
    </ReactHookFormProvider>
  );
});

export default FormProvider;
