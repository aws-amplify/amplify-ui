import * as React from 'react';
import classNames from 'classnames';
import {
  Primitive,
  FieldProps,
  FlexContainerStyleProps,
  ViewProps,
  InputSizes,
} from '../types';
import { useStableId } from '../utils/useStableId';
import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { FieldDescription } from './FieldDescription';
import { FieldErrorMessage } from './FieldErrorMessage';
import { Flex } from '../Flex';
import { Label } from '../Label';

interface FieldPrimitiveProps
  extends FieldProps,
    FlexContainerStyleProps,
    ViewProps {
  hasError?: boolean;
  /**
   * @description
   * Changes the font-size, padding, and height of the field.
   */
  size?: InputSizes;
}

const FieldPrimitive: Primitive<FieldPrimitiveProps, 'div'> = (props, ref) => {
  const {
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    label,
    labelHidden = false,
    size,
    testId,
    // variation,
    children,
    ...rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  // const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        classNameModifier(ComponentClassNames.Field, size),
        ComponentClassNames.TextField,
        className
      )}
      data-size={size}
      testId={testId}
      ref={ref}
      {...rest}
      // {...styleProps}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      {children}
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textfield)
 */
export const Field = React.forwardRef(FieldPrimitive);

Field.displayName = 'Field';
