import React from 'react';
import { DefaultElements } from './types';

export const ButtonElementBase: DefaultElements['Button'] = React.forwardRef(
  ({ isDisabled, ...rest }, ref) => (
    <button {...rest} disabled={isDisabled} ref={ref} />
  )
);
ButtonElementBase.displayName = 'Button';

export const ViewElementBase: DefaultElements['View'] = React.forwardRef(
  (props, ref) => <div {...props} ref={ref} />
);
ViewElementBase.displayName = 'View';
