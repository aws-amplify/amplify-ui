import * as React from 'react';
import { LabelElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Label = <T extends LabelElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Label = useElement('Label');

  return (
    <Label className={className} {...rest}>
      {children}
    </Label>
  );
};
