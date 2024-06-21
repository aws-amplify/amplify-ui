import React from 'react';
import { DefaultPrimitives } from './types';

export const PrimitiveButton: DefaultPrimitives['Button'] = React.forwardRef(
  ({ isDisabled, ...rest }, ref) => (
    <button {...rest} disabled={isDisabled} ref={ref} />
  )
);
PrimitiveButton.displayName = 'Button';

export const PrimitiveView: DefaultPrimitives['View'] = React.forwardRef(
  (props, ref) => <div {...props} ref={ref} />
);
PrimitiveView.displayName = 'View';
