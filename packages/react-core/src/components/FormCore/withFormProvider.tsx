import React from 'react';

import { AnyComponent, MergeProps } from '../../types';

import FormProvider from './FormProvider';
import { FormHandle, FormProviderProps } from './types';

/**
 * @param Child `Form` base component wrapped inside `FormProvider`
 * @returns Composed `Form` component exposing `FormContext` values to descendents
 */
export default function withFormProvider<
  ChildComp extends AnyComponent,
  ChildProps extends React.ComponentPropsWithRef<ChildComp>,
  Props extends MergeProps<FormProviderProps, ChildProps>
>(
  Child: ChildComp
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<FormHandle>
> {
  return React.forwardRef<FormHandle, Props>(function Form(
    { defaultValues, mode, ...props },
    ref
  ) {
    return (
      <FormProvider defaultValues={defaultValues} mode={mode} ref={ref}>
        <Child {...(props as ChildProps)} />
      </FormProvider>
    );
  });
}
