import React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { classNameModifierByFlag } from '@aws-amplify/ui';
import { DropZoneContext } from './DropZoneProvider';
import { BaseDropZoneContainerProps, DropZoneContainerProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types';

const Container: Primitive<DropZoneContainerProps, 'div'> = (
  { className, children, testId, ...rest },
  ref
) => {
  const { isDragAccept, isDragReject } = React.useContext(DropZoneContext);
  return (
    <View
      className={classNames(
        className,
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
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

const DropZoneContainer: ForwardRefPrimitive<
  BaseDropZoneContainerProps,
  'div'
> = React.forwardRef(Container);

DropZoneContainer.displayName = 'DropZoneContainer';

export { DropZoneContainer };
