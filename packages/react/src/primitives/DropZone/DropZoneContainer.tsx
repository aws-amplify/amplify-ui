import React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { ComponentClassName, classNameModifierByFlag } from '@aws-amplify/ui';
import { DropZoneContext } from './DropZoneProvider';
import { BaseDropZoneContainerProps, DropZoneContainerProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types';

const Container: Primitive<DropZoneContainerProps, 'div'> = (
  {
    className,
    children,
    testId,
    isDisabled,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    ...rest
  },
  ref
) => {
  const dragState = React.useContext(DropZoneContext);

  // Don't add drag event handlers if it is disabled.
  const dragProps = isDisabled
    ? {}
    : { onDragEnter, onDragLeave, onDragOver, onDragStart, onDrop };
  return (
    <View
      {...rest}
      {...dragProps}
      isDisabled={isDisabled}
      className={classNames(
        className,
        classNameModifierByFlag(
          ComponentClassNames.DropZone,
          'rejected',
          dragState === 'reject'
        ),
        classNameModifierByFlag(
          ComponentClassNames.DropZone,
          'accepted',
          dragState === 'accept'
        ),
        classNameModifierByFlag(
          ComponentClassName.DropZone,
          'disabled',
          isDisabled
        ),
        ComponentClassNames.DropZone
      )}
      data-testid={testId}
      ref={ref}
    >
      {children}
    </View>
  );
};

const DropZoneContainer: ForwardRefPrimitive<
  BaseDropZoneContainerProps,
  'div'
> = React.forwardRef(Container);

DropZoneContainer.displayName = 'DropZoneContainer';

export { DropZoneContainer };
