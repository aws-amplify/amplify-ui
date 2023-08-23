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
const Accepted: Primitive<{}, 'div'> = ({ children }) => {
  const { isDragAccept } = React.useContext(DropZoneContext);
  return isDragAccept ? <>{children}</> : null;
};

/**
 * This component renders when the user is dragging ANY rejected files on the DropZone.
 */
const Rejected: Primitive<{}, 'div'> = ({ children }) => {
  const { isDragReject } = React.useContext(DropZoneContext);
  return isDragReject ? <>{children}</> : null;
};

/**
 * This component renders by default when the user is not dragging.
 */
const Default: Primitive<{}, 'div'> = ({ children }) => {
  const { isDragActive } = React.useContext(DropZoneContext);
  return isDragActive ? null : <>{children}</>;
};

export { Accepted, Rejected, Default };
