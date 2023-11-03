import * as React from 'react';
import classNames from 'classnames';
import {
  ForwardRefPrimitive,
  Primitive,
  FlexContainerStyleProps,
  BaseViewProps,
  BaseInputProps,
  BaseFieldProps,
} from '../types';
import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { Flex } from '../Flex';
import { FieldDescription } from './FieldDescription';
import { FieldErrorMessage } from './FieldErrorMessage';
import { Label } from '../Label';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

interface FieldPrimitiveProps
  extends BaseFieldProps,
    BaseInputProps,
    FlexContainerStyleProps,
    BaseViewProps {}

const FieldPrimitive: Primitive<FieldPrimitiveProps, 'div'> = (props, ref) => {
  const {
    className,
    size,
    testId,
    children,
    label,
    labelHidden,
    errorMessage,
    hasError,
    descriptiveText,
    ...rest
  } = props;

  return (
    <Flex
      className={classNames(
        ComponentClassName.Field,
        classNameModifier(ComponentClassName.Field, size),
        className
      )}
      testId={testId}
      ref={ref}
      {...rest}
    >
      {label ? <Label visuallyHidden={labelHidden}>{label}</Label> : null}

      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />

      {children}
      {errorMessage ? (
        <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
      ) : null}
    </Flex>
  );
};

export const Field: ForwardRefPrimitive<FieldPrimitiveProps, 'div'> =
  primitiveWithForwardRef(FieldPrimitive);

Field.displayName = 'Field';
