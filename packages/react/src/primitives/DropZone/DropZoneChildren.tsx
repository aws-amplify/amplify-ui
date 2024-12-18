import * as React from 'react';
import { DropZoneContext } from './DropZoneProvider';

/**
 * These are syntactic sugar components that make it easy to compose children
 * in DropZone without having to expose the DropZoneContext.
 */

export type AcceptedType = (props: {
  children?: React.ReactNode;
}) => React.JSX.Element | null;
/**
 * This component renders when the user is dragging ONLY accepted files on the DropZone.
 */
export const Accepted: AcceptedType = ({ children }) => {
  const dragState = React.useContext(DropZoneContext);
  if (!dragState) {
    throw new Error('`DropZone.Accept` must be used inside a DropZone');
  }
  return dragState === 'accept' ? <>{children}</> : null;
};

export type RejectedType = (props: {
  children?: React.ReactNode;
}) => React.JSX.Element | null;
/**
 * This component renders when the user is dragging ANY rejected files on the DropZone.
 */
export const Rejected: RejectedType = ({ children }) => {
  const dragState = React.useContext(DropZoneContext);
  if (!dragState) {
    throw new Error('`DropZone.Rejected` must be used inside a DropZone');
  }
  return dragState === 'reject' ? <>{children}</> : null;
};

export type DefaultType = (props: {
  children?: React.ReactNode;
}) => React.JSX.Element | null;
/**
 * This component renders by default when the user is not dragging.
 */
export const Default: DefaultType = ({ children }) => {
  const dragState = React.useContext(DropZoneContext);
  if (!dragState) {
    throw new Error('`DropZone.Default` must be used inside a DropZone');
  }
  return dragState === 'inactive' ? <>{children}</> : null;
};
