import * as React from 'react';
import { FormElementProps } from '@aws-amplify/ui-react/internal';
import { Form } from './Form';
import { SubmitButton } from './SubmitButton';
import { Input } from './Input';
import { Label } from './Label';
import { Summary } from './Summary';

const Search = <T extends FormElementProps>({
  className,
  ...rest
}: T): JSX.Element => {
  const inputId = React.useId();

  return (
    <Form className={className} {...rest}>
      <Label htmlFor={inputId} />
      <Input id={inputId} />
      <SubmitButton />
      <Summary />
    </Form>
  );
};

const SearchControl = Object.assign(Search, {
  Form,
  Input,
  Label,
  SubmitButton,
  Summary,
});

export { SearchControl };
