import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Label } from '../Label';
import { Primitive } from '../types';
import { TextAreaFieldProps } from '../types/textAreaField';

import { useStableId } from '../shared/utils';
import { Flex } from '../Flex';
import { TextArea } from '../TextArea';

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
        id={fieldId}
        aria-describedby={descriptionId}
        rows={rows ?? DEFAULT_ROW_COUNT}
        hasError={hasError}
        size={size}
        ref={ref}
        {...baseStyleProps}
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const TextAreaField = React.forwardRef(TextAreaFieldPrimitive);

TextAreaField.displayName = 'TextArea';
