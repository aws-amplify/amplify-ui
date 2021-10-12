import { LinkProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { LinkPropControlsProps } from './LinkPropControls';

interface UseLinkProps {
  (initialValues: LinkProps): LinkPropControlsProps;
}

export const useLinkProps: UseLinkProps = (initialValues) => {
  const [isExternal, setIsExternal] = useState<LinkProps['isExternal']>(
    initialValues.isExternal
  );
  const [color, setColor] = useState<LinkProps['color']>(initialValues.color);
  const [textDecoration, setTextDecoration] = useState<
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
