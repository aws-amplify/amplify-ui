import React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassName, classNameModifierByFlag } from '@aws-amplify/ui';
import { DropZoneContext } from './DropZoneProvider';
import { BaseDropZoneContainerProps, DropZoneContainerProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

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
          ComponentClassName.DropZone,
          'rejected',
          dragState === 'reject'
        ),
        classNameModifierByFlag(
          ComponentClassName.DropZone,
          'accepted',
          dragState === 'accept'
        ),
        classNameModifierByFlag(
          ComponentClassName.DropZone,
          'disabled',
          isDisabled
        ),
        ComponentClassName.DropZone
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
> = primitiveWithForwardRef(Container);

DropZoneContainer.displayName = 'DropZoneContainer';

export { DropZoneContainer };
