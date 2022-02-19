import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Primitive } from '../types';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { TextArea } from '../TextArea';
import { TextAreaFieldProps } from '../types/textAreaField';
import { useStableId } from '../shared/utils';

export const DEFAULT_ROW_COUNT = 3;

const TextAreaFieldPrimitive: Primitive<TextAreaFieldProps, 'textarea'> = (
  props,
  ref
) => {
  const {
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    label,
    labelHidden = false,
    rows,
    size,
    testId,
    inputStyles,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.TextAreaField,
        className
      )}
      data-size={size}
      testId={testId}
      {...baseStyleProps}
      {...flexContainerStyleProps}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <TextArea
        aria-describedby={descriptionId}
        hasError={hasError}
        id={fieldId}
        ref={ref}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
        {...inputStyles}
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const TextAreaField = React.forwardRef(TextAreaFieldPrimitive);

TextAreaField.displayName = 'TextAreaField';
