import * as React from 'react';

import { useDropZone } from './useDropZone';
import { ForwardRefPrimitive, Primitive } from '../types';
import { DropZoneProps, BaseDropZoneProps } from './types';
import { DropZoneProvider } from './DropZoneProvider';
import { DropZoneContainer } from './DropZoneContainer';
import { Accepted, Default, Rejected } from './DropZoneChildren';

const DropZonePrimitive: Primitive<DropZoneProps, 'div'> = (
  { children, testId, isDisabled, ...rest },
  ref
) => {
  const {
    isDragAccept,
    isDragReject,
    isDragActive,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
  } = useDropZone(rest);
  const value = React.useMemo(() => {
    return {
      isDragAccept,
      isDragReject,
      isDragActive,
    };
  }, [isDragAccept, isDragReject, isDragActive]);

  return (
    <DropZoneProvider value={value}>
      <DropZoneContainer
        testId={testId}
        isDisabled={isDisabled}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
        {...rest}
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
  Provider: typeof DropZoneProvider;
  Container: typeof DropZoneContainer;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/dropzone)
 */
const DropZone: DropZoneType = Object.assign(
  React.forwardRef(DropZonePrimitive),
  {
    Accepted,
    Rejected,
    Default,
    Provider: DropZoneProvider,
    Container: DropZoneContainer,
  }
);

DropZone.displayName = 'DropZone';

export { DropZone };
