import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { LABEL_HIDDEN_DEPRECATED } from '../../helpers/messages';
import { Primitive } from '../types';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { TextArea } from '../TextArea';
import { TextAreaFieldProps } from '../types/textAreaField';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
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
    isLabelHidden = false,
    label,
    labelHidden = false,
    rows,
    size,
    testId,
    ..._rest
  } = props;

  useDeprecationWarning({
    shouldWarn: labelHidden,
    message: LABEL_HIDDEN_DEPRECATED,
  });

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
      <Label htmlFor={fieldId} visuallyHidden={isLabelHidden || labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        isLabelHidden={isLabelHidden || labelHidden}
        descriptiveText={descriptiveText}
      />
      <TextArea
        aria-describedby={descriptionId}
        hasError={hasError}
        id={fieldId}
        ref={ref}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
        {...baseStyleProps}
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const TextAreaField = React.forwardRef(TextAreaFieldPrimitive);

TextAreaField.displayName = 'TextAreaField';
