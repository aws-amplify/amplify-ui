import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { PrimitiveProps, TextFieldProps } from '../types';
import {
  isTextAreaField,
  isInputField,
  isInputRef,
  isTextAreaRef,
} from './utils';
import { TextArea } from '../TextArea';
import { useStableId } from '../utils/useStableId';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';

export const DEFAULT_ROW_COUNT = 3;

const TextFieldPrimitive = <Multiline extends boolean>(
  props: PrimitiveProps<TextFieldProps<Multiline>, 'input' | 'textarea'>,
  ref: React.ForwardedRef<HTMLTextAreaElement | HTMLInputElement>
) => {
  const {
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    label,
    labelHidden = false,
    outerEndComponent,
    outerStartComponent,
    innerStartComponent,
    innerEndComponent,
    isMultiline, // remove from rest to prevent passing as DOM attribute
    type, // remove from rest to prevent passing as DOM attribute to textarea
    size,
    testId,
    variation,

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

  useDeprecationWarning({
    shouldWarn: props.isMultiline,
    message:
      'TextField isMultiLine prop will be deprecated in next major release of @aws-amplify/ui-react. Please use TextAreaField component instead.',
  });

  let control: JSX.Element = null;
  if (isTextAreaField(props)) {
    const { rows } = props;
    control = (
      <TextArea
        aria-describedby={ariaDescribedBy}
        hasError={hasError}
        id={fieldId}
        ref={isTextAreaRef(props, ref) ? ref : undefined}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
        variation={variation}
        {...baseStyleProps}
        {...rest}
      />
    );
  } else if (isInputField(props)) {
    const { type = 'text' } = props;
    control = (
      <Input
        aria-describedby={ariaDescribedBy}
        hasError={hasError}
        id={fieldId}
        ref={isInputRef(props, ref) ? ref : undefined}
        size={size}
        type={type}
        variation={variation}
        {...baseStyleProps}
        {...rest}
      />
    );
  }

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        classNameModifier(ComponentClassNames.Field, size),
        ComponentClassNames.TextField,
        className
      )}
      bottom={bottom}
      data-size={size}
      height={height}
      left={left}
      padding={padding}
      position={position}
      right={right}
      testId={testId}
      top={top}
      width={width}
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
      <FieldGroup
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
        innerStartComponent={innerStartComponent}
        innerEndComponent={innerEndComponent}
        variation={variation}
      >
        {control}
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textfield)
 */
export const TextField = React.forwardRef(TextFieldPrimitive) as <
  Multiline extends boolean
>(
  props: PrimitiveProps<TextFieldProps<Multiline>, 'input' | 'textarea'> & {
    ref?: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>;
  }
) => ReturnType<typeof TextFieldPrimitive>;

// Note: we cannot add the displayName to the higher level primitive because
// the function type expression syntax used in assertion on TextField doesn’t allow for declaring properties.
// We need to use the function type syntax above to allow higher order function type inference,
// So I'm adding it to the inner primitive instead
TextFieldPrimitive.displayName = 'TextField';
