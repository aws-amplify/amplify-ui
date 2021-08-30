import { LinkOptions } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { LinkPropControlsProps } from './LinkPropControls';

interface UseLinkProps {
  (initialValues: LinkOptions): LinkPropControlsProps;
}

export const useLinkProps: UseLinkProps = (initialValues) => {
  const [isExternal, setIsExternal] = useState<LinkOptions['isExternal']>(
    initialValues.isExternal
  );
  const [color, setColor] = useState<LinkOptions['color']>(initialValues.color);
  const [size, setSize] = useState<LinkOptions['size']>(initialValues.size);
  const [textDecoration, setTextDecoration] = useState<
    LinkOptions['textDecoration']
  >(initialValues.textDecoration);

  return {
    isExternal,
    setIsExternal,
    color,
    setColor,
    size,
    setSize,
    textDecoration,
    setTextDecoration,
  };
};
