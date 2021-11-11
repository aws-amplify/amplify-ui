import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { PrimitiveProps, TextFieldProps } from '../types';
import { TextArea } from '../TextArea';
import { useStableId } from '../shared/utils';

const isTextAreaField = (props: {
  isMultiline?: boolean;
}): props is PrimitiveProps<TextFieldProps<true>, 'textarea'> => {
  return props.isMultiline;
};

const isInputField = (props: {
  isMultiline?: boolean;
}): props is PrimitiveProps<TextFieldProps<false>, 'input'> => {
  return !props.isMultiline;
};

export const DEFAULT_ROW_COUNT = 3;

export const TextField = <Multiline extends boolean>(
  props: PrimitiveProps<TextFieldProps<Multiline>, 'input' | 'textarea'>
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
    ..._rest
  } = props;

  const fieldId = useStableId(id);

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

  let control: JSX.Element = null;
  if (isTextAreaField(props)) {
    const { rows } = props;
    control = (
      <TextArea
        hasError={hasError}
        id={fieldId}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
        {...baseStyleProps}
        {...rest}
      />
    );
  } else if (isInputField(props)) {
    const { type = 'text' } = props;
    control = (
      <Input
        hasError={hasError}
        id={fieldId}
        size={size}
        type={type}
        {...baseStyleProps}
        {...rest}
      />
    );
  }

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.TextField,
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
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
        innerStartComponent={innerStartComponent}
        innerEndComponent={innerEndComponent}
      >
        {control}
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

TextField.displayName = 'TextField';
