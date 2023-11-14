import * as React from 'react';
import { Primitive } from '../types';
import { DropZoneContext } from './DropZoneProvider';

/**
 * These are syntactic sugar components that make it easy to compose children
 * in DropZone without having to expose the DropZoneContext.
 */

/**
 * This component renders when the user is dragging ONLY accepted files on the DropZone.
 */
const Accepted: Primitive<{ children?: React.ReactNode }, 'div'> = ({
  children,
}) => {
  const dragState = React.useContext(DropZoneContext);
  if (!dragState) {
    throw new Error('`DropZone.Accept` must be used inside a DropZone');
  }
  return dragState === 'accept' ? <>{children}</> : null;
};

/**
 * This component renders when the user is dragging ANY rejected files on the DropZone.
 */
const Rejected: Primitive<{ children?: React.ReactNode }, 'div'> = ({
  children,
}) => {
  const dragState = React.useContext(DropZoneContext);
  if (!dragState) {
    throw new Error('`DropZone.Rejected` must be used inside a DropZone');
  }
  return dragState === 'reject' ? <>{children}</> : null;
};

/**
 * This component renders by default when the user is not dragging.
 */
const Default: Primitive<{ children?: React.ReactNode }, 'div'> = ({
  children,
}) => {
  const dragState = React.useContext(DropZoneContext);
  if (!dragState) {
    throw new Error('`DropZone.Default` must be used inside a DropZone');
  }
  return dragState === 'inactive' ? <>{children}</> : null;
};

export { Accepted, Rejected, Default };
