import * as React from 'react';
import { ViewProps } from '../../types';
import { FieldInput } from './FieldInput';
import { FieldLabel } from './FieldLabel';

// import { usePrimitive } from '@aws-amplify/ui-react';

const FieldPrimitive = <T extends ViewProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

const Field = Object.assign(FieldPrimitive, {
  Input: FieldInput,
  Label: FieldLabel,
});

export { Field };
