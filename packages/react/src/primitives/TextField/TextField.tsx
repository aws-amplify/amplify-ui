import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../shared/utils';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { FieldGroup } from '../FieldGroup';
import { Input } from '../Input';
import { Label } from '../Label';

import { Primitive, TextAreaFieldProps, TextFieldProps } from '../types';
import { TextArea } from '../TextArea';

const isMultilineField = (
  props: TextFieldProps
): props is TextAreaFieldProps => {
  return props.isMultiline;
};

export const DEFAULT_ROW_COUNT = 4;

export const TextField: Primitive<TextFieldProps, 'input' | 'textarea'> = (
  props: TextFieldProps
) => {
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
    resize,
    rows = DEFAULT_ROW_COUNT,
    size,
    testId,
    type = 'text',
    wrap,
    ...rest
  } = props;

  const fieldId = useStableId(id);
  let control = null;

  if (isMultilineField(props)) {
    control = (
      <TextArea
        hasError={hasError}
        id={fieldId}
        maxLength={props.maxLength}
        resize={resize}
        rows={rows}
        size={size}
        {...rest}
      />
    );
  } else {
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
