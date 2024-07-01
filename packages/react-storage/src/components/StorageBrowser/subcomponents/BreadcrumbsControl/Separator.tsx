import * as React from 'react';
import { SpanElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Separator = <T extends SpanElementProps>({
  ariaHidden = true,
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Span = useElement('Span');

  return (
    <Span {...rest} aria-hidden={ariaHidden} className={className}>
      {children ?? '/'}
    </Span>
  );
};
