import React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { classNameModifierByFlag } from '@aws-amplify/ui';
import { useDropZone } from './useDropZone';
import { ForwardRefPrimitive, Primitive } from '../types';
import { DropZoneProps, BaseDropZoneProps } from './types';

const DropZoneContext = React.createContext<{
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}>({
  isDragAccept: false,
  isDragReject: false,
  isDragActive: false,
});

const DropZonePrimitive: Primitive<DropZoneProps, 'div'> = (
  { children, testId, ...rest },
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
    <DropZoneContext.Provider value={value}>
      <View
        className={classNames(
          classNameModifierByFlag(
            ComponentClassNames.DropZone,
            'rejected',
            isDragReject
          ),
          classNameModifierByFlag(
            ComponentClassNames.DropZone,
            'accepted',
            isDragAccept
          ),
          ComponentClassNames.DropZone
        )}
        data-testid={testId}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
      >
        {children}
      </View>
    </DropZoneContext.Provider>
  );
};

const Accepted: Primitive<{}, 'div'> = ({ children }) => {
  const { isDragAccept } = React.useContext(DropZoneContext);
  return isDragAccept ? <>{children}</> : null;
};

const Rejected: Primitive<{}, 'div'> = ({ children }) => {
  const { isDragReject } = React.useContext(DropZoneContext);
  return isDragReject ? <>{children}</> : null;
};

const Default: Primitive<{}, 'div'> = ({ children }) => {
  const { isDragActive } = React.useContext(DropZoneContext);
  return isDragActive ? null : <>{children}</>;
};

type DropZoneType = ForwardRefPrimitive<BaseDropZoneProps, 'div'> & {
  Accepted: typeof Accepted;
  Rejected: typeof Rejected;
  Default: typeof Default;
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
  }
);

DropZone.displayName = 'DropZone';

export { DropZone };
