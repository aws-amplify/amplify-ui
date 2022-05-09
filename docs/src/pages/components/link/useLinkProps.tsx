import { Link, LinkProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { demoState } from '@/utils/demoState';

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

  React.useEffect(() => {
    demoState.set(Link.displayName, { isExternal, color, textDecoration });
  }, [isExternal, color, textDecoration]);

  return React.useMemo(
    () => ({
      isExternal,
      setIsExternal,
      color,
      setColor,
      textDecoration,
      setTextDecoration,
      children: initialValues.children,
    }),
    [
      isExternal,
      setIsExternal,
      color,
      setColor,
      textDecoration,
      setTextDecoration,
      initialValues.children,
    ]
  );
};
