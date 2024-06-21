import React from 'react';
import { dropZoneClasses } from '@aws-amplify/ui';

import { View } from '../View';
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
      className={dropZoneClasses({
        _modifiers: [
          isDisabled ? 'disabled' : undefined,
          dragState === 'reject' ? 'rejected' : undefined,
          dragState === 'accept' ? 'accepted' : undefined,
        ],
      })}
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
