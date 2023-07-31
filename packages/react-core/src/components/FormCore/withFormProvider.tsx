import React from 'react';

import { AnyComponent, MergeProps } from '../../types';

import FormProvider from './FormProvider';
import { FormHandle, FormProviderProps } from './types';

export default function withFormProvider<
  ChildComp extends AnyComponent,
  ChildProps extends React.ComponentPropsWithRef<ChildComp>,
  Props extends MergeProps<FormProviderProps, ChildProps>
>(
  Child: ChildComp
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<FormHandle>
> {
  return React.forwardRef<FormHandle, Props>(function WrappedForm(
    { mode, ...props },
    ref
  ) {
    return (
      <FormProvider mode={mode} ref={ref}>
        <Child {...(props as ChildProps)} />
      </FormProvider>
    );
  });
}
