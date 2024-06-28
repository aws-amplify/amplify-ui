import React from 'react';
import { ElementsBase } from './types';

export const ButtonElementBase: ElementsBase['Button'] = React.forwardRef(
  ({ isDisabled, ...rest }, ref) => (
    <button {...rest} disabled={isDisabled} ref={ref} />
  )
);
ButtonElementBase.displayName = 'Button';

export const LiElementBase: ElementsBase['Li'] = React.forwardRef(
  (props, ref) => <li {...props} ref={ref} />
);
LiElementBase.displayName = 'Li';

export const NavElementBase: ElementsBase['Nav'] = React.forwardRef(
  (props, ref) => <nav {...props} ref={ref} />
);
NavElementBase.displayName = 'Nav';

export const SectionElementBase: ElementsBase['Section'] = React.forwardRef(
  (props, ref) => <section {...props} ref={ref} />
);
SectionElementBase.displayName = 'Section';

export const ViewElementBase: ElementsBase['View'] = React.forwardRef(
  (props, ref) => <div {...props} ref={ref} />
);
ViewElementBase.displayName = 'View';
