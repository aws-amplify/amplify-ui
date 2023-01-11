import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Primitive } from '../types';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { TextArea } from '../TextArea';
import { TextAreaFieldProps } from '../types/textAreaField';
import { useStableId } from '../utils/useStableId';

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
    // Destructuring the 'resize' style prop because while it is a style prop
    // it should go on the textarea element and not the wrapper div.
    resize,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  const { styleProps, rest } = splitPrimitiveProps(_rest);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.TextAreaField,
        className
      )}
      data-size={size}
      testId={testId}
      {...styleProps}
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
        aria-describedby={ariaDescribedBy}
        hasError={hasError}
        id={fieldId}
        ref={ref}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
        resize={resize}
        {...rest}
        {...inputStyles}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textareafield)
 */
export const TextAreaField = React.forwardRef(TextAreaFieldPrimitive);

TextAreaField.displayName = 'TextAreaField';
