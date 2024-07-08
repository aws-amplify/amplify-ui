import * as React from 'react';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';
import { Container } from './Container';
import { SubmitButton } from './SubmitButton';
import { Input } from './Input';
import { Label } from './Label';
import { Summary } from './Summary';

const Search = <T extends ViewElementProps>({
  className,
  ...rest
}: T): JSX.Element => {
  const inputId = `amplify-storagebrowser-search-input-${React.useId()}`;

  return (
    <Container className={className} {...rest}>
      <Label htmlFor={inputId} />
      <Input id={inputId} />
      <SubmitButton />
      <Summary />
    </Container>
  );
};

const SearchControl = Object.assign(Search, {
  Container,
  Input,
  Label,
  SubmitButton,
  Summary,
});

export { SearchControl };
