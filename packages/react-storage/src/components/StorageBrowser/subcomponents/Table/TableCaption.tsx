import * as React from 'react';
import { TableCaptionElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Caption = <T extends TableCaptionElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const TableCaption = useElement('TableCaption');

  return <TableCaption {...rest}>{children}</TableCaption>;
};
