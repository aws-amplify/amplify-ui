import * as React from 'react';
import { HeadingElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Title = <T extends HeadingElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Heading = useElement('Heading');

  return (
    <Heading className={className} {...rest}>
      {children}
    </Heading>
  );
};
