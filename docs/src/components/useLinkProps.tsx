import { LinkProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { LinkPropControlsProps } from './LinkPropControls';

interface UseLinkProps {
  (initialValues: LinkProps): LinkPropControlsProps;
}

export const useLinkProps: UseLinkProps = (initialValues) => {
  const [isExternal, setIsExternal] = React.useState<LinkProps['isExternal']>(
    initialValues.isExternal
  );
  const [color, setColor] = React.useState<LinkProps['color']>(
    initialValues.color
  );
  const [textDecoration, setTextDecoration] = React.useState<
    LinkProps['textDecoration']
  >(initialValues.textDecoration);

  return {
    isExternal,
    setIsExternal,
    color,
    setColor,
    textDecoration,
    setTextDecoration,
    children: initialValues.children,
  };
};
