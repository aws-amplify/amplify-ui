import * as React from 'react';
import { LabelElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Label = <T extends LabelElementProps>({
  children,
  className,
  htmlFor,
  ...rest
}: T): JSX.Element => {
  const Label = useElement('Label');

  return (
    <Label htmlFor={htmlFor} className={className} {...rest}>
      {children ?? 'Filter folders and files'}
    </Label>
  );
};
