import { inspect } from '@xstate/inspect';
import * as React from 'react';

export function XStateInspector() {
  React.useLayoutEffect(() => {
    inspect();
  }, []);

  return (
    <iframe
      data-xstate
      style={{ width: '100%', maxWidth: '100%', height: '60ch' }}
    />
  );
}
