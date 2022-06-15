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

    bottom, // @TODO: remove custom destructuring for 3.0 release
    height, // @TODO: remove custom destructuring for 3.0 release
    left, // @TODO: remove custom destructuring for 3.0 release
    padding, // @TODO: remove custom destructuring for 3.0 release
    position, // @TODO: remove custom destructuring for 3.0 release
    right, // @TODO: remove custom destructuring for 3.0 release
    top, // @TODO: remove custom destructuring for 3.0 release
    width, // @TODO: remove custom destructuring for 3.0 release

    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

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
      height={height}
      testId={testId}
      width={width}
      bottom={bottom}
      left={left}
      right={right}
      top={top}
      position={position}
      padding={padding}
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
        aria-describedby={ariaDescribedBy}
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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textareafield)
 */
export const TextAreaField = React.forwardRef(TextAreaFieldPrimitive);

TextAreaField.displayName = 'TextAreaField';
