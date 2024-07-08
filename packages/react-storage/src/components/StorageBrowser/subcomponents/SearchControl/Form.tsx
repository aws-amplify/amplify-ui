import * as React from 'react';
import { FormElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Form = <T extends FormElementProps>({
  children,
  className: _className,
  ...rest
}: T): JSX.Element => {
  const Form = useElement('Form');
  const baseClassName = 'amplify-storagebrowser__search';
  const className = _className ?? baseClassName;
  return (
    <Form className={className} {...rest}>
      {children}
    </Form>
  );
};
