import * as React from 'react';

import { useDropZone } from './useDropZone';
import { ForwardRefPrimitive, Primitive } from '../types';
import { DropZoneProps, BaseDropZoneProps } from './types';
import { DropZoneProvider } from './DropZoneProvider';
import { DropZoneContainer } from './DropZoneContainer';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { Accepted, Default, Rejected } from './DropZoneChildren';

const DropZonePrimitive: Primitive<DropZoneProps, 'div'> = (
  { children, testId, isDisabled, acceptedFileTypes, onDropComplete, ...rest },
  ref
) => {
  const {
    dragState,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
  } = useDropZone({
    acceptedFileTypes,
    onDropComplete,
    ...rest,
  });

  return (
    <DropZoneProvider value={dragState}>
      <DropZoneContainer
        {...rest}
        testId={testId}
        isDisabled={isDisabled}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
      >
        {children}
      </DropZoneContainer>
    </DropZoneProvider>
  );
};

type DropZoneType = ForwardRefPrimitive<BaseDropZoneProps, 'div'> & {
  Accepted: typeof Accepted;
  Rejected: typeof Rejected;
  Default: typeof Default;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/dropzone)
 */
const DropZone: DropZoneType = Object.assign(
  primitiveWithForwardRef(DropZonePrimitive),
  {
    Accepted,
    Rejected,
    Default,
  }
);

DropZone.displayName = 'DropZone';

export { DropZone };
