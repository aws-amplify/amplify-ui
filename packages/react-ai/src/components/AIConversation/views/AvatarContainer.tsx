import React from 'react';
import { useElement } from '../context/elements';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';

const BLOCK_NAME = 'avatar';
const _className = `${BLOCK_NAME}__container`;

// ControlElement
const AvatarContainer = React.forwardRef<
  ViewElementProps["ref"],
  ViewElementProps
>(
  (
    {
      children,
      className = _className,
      ...props
    },
    ref
  ) => {
    const View = useElement('View');
    return (
      <View
        {...props}
        className={className}
        ref={ref}
      >
        {children ?? "Avatar"}
      </View>
    );
  }
);

AvatarContainer.displayName = "AvatarContainer";

export { AvatarContainer };
