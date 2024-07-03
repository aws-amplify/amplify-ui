import * as React from 'react';
import { FormElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';
import { SubmitButton } from './SubmitButton';
import { Input } from './Input';
import { Label } from './Label';
import { Summary } from './Summary';

const Search = <T extends FormElementProps>({
  className = 'amplify-storagebrowser__search',
  children,
  ...rest
}: T): JSX.Element => {
  const Form = useElement('Form');

  return (
    <Form className={className} {...rest}>
      {children}
    </Form>
  );
};

const SearchControl = Object.assign(Search, {
  Input,
  Label,
  SubmitButton,
  Summary,
});

export { SearchControl };
