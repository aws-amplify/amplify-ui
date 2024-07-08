import * as React from 'react';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';
import { Container } from './Container';
import { Label } from './Label';
import { Input } from './Input';

const SelectItem = <T extends ViewElementProps>({
  ariaLabel,
  className,
  children,
  ...rest
}: T): JSX.Element => {
  const checkBoxId = `amplify-storagebrowser-checkbox-${React.useId()}`;
  return (
    <Container className={className} {...rest}>
      <Input id={checkBoxId} />
      <Label htmlFor={checkBoxId}>{children}</Label>
    </Container>
  );
};

const SelectItemControl = Object.assign(SelectItem, {
  Container,
  Input,
  Label,
});

export { SelectItemControl };
