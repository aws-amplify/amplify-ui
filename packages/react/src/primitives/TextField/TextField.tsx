import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../shared/utils';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { FieldGroup } from '../FieldGroup';
import { Input } from '../Input';
import { Label } from '../Label';

import {
  Primitive,
  PrimitiveProps,
  TextAreaFieldProps,
  TextFieldProps,
  TextInputFieldProps,
} from '../types';
import { TextArea } from '../TextArea';

const isTextAreaField = (
  props: TextFieldProps
): props is React.PropsWithChildren<
  PrimitiveProps<TextAreaFieldProps, 'textarea'>
> => {
  return props.isMultiline;
};

const isInputField = (
  props: TextFieldProps
): props is React.PropsWithChildren<
  PrimitiveProps<TextInputFieldProps, 'input'>
> => {
  return !props.isMultiline;
};

export const DEFAULT_ROW_COUNT = 3;

export const TextField: Primitive<TextFieldProps, any> = (props) => {
  const {
    alignContent,
    alignItems,
    className,
    descriptiveText,
    direction = 'column',
    errorMessage,
    gap,
    hasError = false,
    id,
    justifyContent,
    label,
    labelHidden = false,
    outerEndComponent,
    outerStartComponent,
    innerStartComponent,
    innerEndComponent,
    isMultiline, // remove from rest to prevent passing as DOM attribute
    size,
    testId,
    type = 'text',
    wrap,
    ...rest
  } = props;

  const fieldId = useStableId(id);

  let control = null;
  if (isTextAreaField(props)) {
    control = (
      <TextArea
        hasError={hasError}
        id={fieldId}
        maxLength={props.maxLength}
        resize={props.resize}
        rows={props.rows ?? DEFAULT_ROW_COUNT}
        size={size}
        {...rest}
      />
    );
  }
  if (isInputField(props)) {
    control = (
      <Input
        hasError={hasError}
        id={fieldId}
        size={size}
        type={props.type}
        {...rest}
      />
    );
  }

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.TextField,
        className
      )}
      data-size={size}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      testId={testId}
      wrap={wrap}
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
