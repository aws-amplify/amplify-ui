import * as React from 'react';
import { ViewProps } from '../../types';
import { Primary } from './Primary';
import { Secondary } from './Secondary';

const ControlsPrimitive = <T extends ViewProps>({
  className,
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <div {...rest} className={``}>
      {children}
    </div>
  );
};

const Controls = Object.assign(ControlsPrimitive, {
  Primary,
  Secondary,
});

export { Controls };
