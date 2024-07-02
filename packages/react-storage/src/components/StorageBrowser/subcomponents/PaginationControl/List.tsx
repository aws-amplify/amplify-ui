import * as React from 'react';
import { OlElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const List = <T extends OlElementProps>({
  children,
  className = 'amplify-storagebrowser__pagination__list',
  ...rest
}: T): JSX.Element => {
  const Ol = useElement('Ol');

  return (
    <Ol className={className} {...rest}>
      {children}
    </Ol>
  );
};
