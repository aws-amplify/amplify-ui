import * as React from 'react';
import classNames from 'classnames';
import {
  Primitive,
  FlexContainerStyleProps,
  ViewProps,
  InputSizes,
} from '../types';
import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';

interface FieldPrimitiveProps extends FlexContainerStyleProps, ViewProps {
  /**
   * @description
   * Changes the font-size, padding, and height of the field.
   */
  size?: InputSizes;
}

const FieldPrimitive: Primitive<FieldPrimitiveProps, 'div'> = (props, ref) => {
  const { className, size, testId, children, ...rest } = props;

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        classNameModifier(ComponentClassNames.Field, size),
        className
      )}
      data-size={size}
      testId={testId}
      ref={ref}
      {...rest}
    >
      {children}
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/field)
 */
export const Field = React.forwardRef(FieldPrimitive);

Field.displayName = 'Field';
