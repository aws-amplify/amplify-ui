import * as React from 'react';
import classNames from 'classnames';
import {
  Primitive,
  FlexContainerStyleProps,
  ViewProps,
  InputProps,
  FieldProps,
} from '../types';
import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { FieldDescription } from './FieldDescription';
import { FieldErrorMessage } from './FieldErrorMessage';
import { Label } from '../Label';

interface FieldPrimitiveProps
  extends FieldProps,
    InputProps,
    FlexContainerStyleProps,
    ViewProps {}

const FieldPrimitive: Primitive<FieldPrimitiveProps, typeof Flex> = (
  props,
  ref
) => {
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
        ComponentClassNames.Field,
        classNameModifier(ComponentClassNames.Field, size),
        className
      )}
      data-size={size}
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

export const Field = React.forwardRef(FieldPrimitive);

Field.displayName = 'Field';
