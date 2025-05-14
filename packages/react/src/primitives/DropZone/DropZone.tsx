import * as React from 'react';

import { useDropZone } from '@aws-amplify/ui-react-core';
import type { ForwardRefPrimitive, Primitive } from '../types';
import type { DropZoneProps, BaseDropZoneProps } from './types';
import { DropZoneProvider } from './DropZoneProvider';
import { DropZoneContainer } from './DropZoneContainer';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import type {
  AcceptedType,
  DefaultType,
  RejectedType,
} from './DropZoneChildren';
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
  Accepted: AcceptedType;
  Rejected: RejectedType;
  Default: DefaultType;
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
