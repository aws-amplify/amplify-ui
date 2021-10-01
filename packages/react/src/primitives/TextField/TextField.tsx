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

export const TextField: Primitive<TextFieldProps, 'input' | 'textarea'> = (
  props
) => {
  const {
    alignContent,
    alignItems,
    autoComplete,
    className,
    defaultValue,
    descriptiveText,
    direction = 'column',
    errorMessage,
    gap,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    justifyContent,
    label,
    labelHidden = false,
    outerEndComponent,
    outerStartComponent,
    innerStartComponent,
    innerEndComponent,
    isMultiline = false,
    size,
    testId,
    type = 'text',
    value,
    wrap,
    ...rest
  } = props;

  const fieldId = useStableId(id);
  let control = null;

  if (isMultilineField(props)) {
    control = <TextArea id={fieldId} maxLength={props.maxLength} {...rest} />;
  } else {
    control = <Input id={fieldId} type={props.type} {...rest} />;
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
