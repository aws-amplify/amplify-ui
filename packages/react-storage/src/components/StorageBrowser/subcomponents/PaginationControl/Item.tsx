import * as React from 'react';
import { LiElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Item = <T extends LiElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Li = useElement('Li');

  return (
    <Li className={className} {...rest}>
      {children}
    </Li>
  );
};
