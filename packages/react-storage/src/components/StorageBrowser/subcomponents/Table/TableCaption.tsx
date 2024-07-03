import * as React from 'react';
import { TableCaptionElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableCaption = <T extends TableCaptionElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Caption = useElement('Caption');

  return <Caption {...rest}>{children}</Caption>;
};
