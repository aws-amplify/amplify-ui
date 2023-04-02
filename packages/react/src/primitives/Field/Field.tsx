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
import { FieldDescription } from './FieldDescription';
import { FieldErrorMessage } from './FieldErrorMessage';
import { Label } from '../Label';

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

// type FieldComponent = React.ForwardRefExoticComponent<
//   Primitive<FieldPrimitiveProps, 'div'>
// > & {
//   Description: typeof FieldDescription;
//   ErrorMessage: typeof FieldErrorMessage;
//   Label: typeof Label;
// };

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textfield)
 */
const Field = React.forwardRef(FieldPrimitive);

Field.displayName = 'Field';

// This makes typescript happy to add static sub-components
const FieldNamespace = Object.assign(Field, {
  Description: FieldDescription,
  ErrorMessage: FieldErrorMessage,
  Label: Label,
});

export { FieldNamespace as Field };
