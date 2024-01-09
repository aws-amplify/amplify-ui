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
  const [hideIcon, setHideIcon] = React.useState<LinkProps['hideIcon']>(
    initialValues.hideIcon
  );
  const [linkIconPosition, setLinkIconPosition] = React.useState<
    LinkProps['linkIconPosition']
  >(initialValues.linkIconPosition);
  const [color, setColor] = React.useState<LinkProps['color']>(
    initialValues.color
  );
  const [textDecoration, setTextDecoration] = React.useState<
    LinkProps['textDecoration']
  >(initialValues.textDecoration);
  const [children, setChildren] = React.useState<LinkProps['children']>(
    initialValues.children
  );

  React.useEffect(() => {
    demoState.set(Link.displayName, {
      isExternal,
      hideIcon,
      linkIconPosition,
      color,
      textDecoration,
      children,
    });
  }, [isExternal, hideIcon, linkIconPosition, color, textDecoration, children]);

  return React.useMemo(
    () => ({
      isExternal,
      setIsExternal,
      hideIcon,
      setHideIcon,
      linkIconPosition,
      setLinkIconPosition,
      color,
      setColor,
      textDecoration,
      setTextDecoration,
      children,
      setChildren,
    }),
    [
      isExternal,
      setIsExternal,
      hideIcon,
      setHideIcon,
      linkIconPosition,
      setLinkIconPosition,
      color,
      setColor,
      textDecoration,
      setTextDecoration,
      children,
      setChildren,
    ]
  );
};
