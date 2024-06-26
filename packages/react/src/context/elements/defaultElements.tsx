import React from 'react';
import { ElementsBase } from './types';

export const ButtonElementBase: ElementsBase['Button'] = React.forwardRef(
  ({ isDisabled, ...rest }, ref) => (
    <button {...rest} disabled={isDisabled} ref={ref} />
  )
);
ButtonElementBase.displayName = 'Button';

export const ViewElementBase: ElementsBase['View'] = React.forwardRef(
  (props, ref) => <div {...props} ref={ref} />
);
ViewElementBase.displayName = 'View';
