import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
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
    wrap,
    ...rest
  } = props;

  const fieldId = useStableId(id);

  let control: JSX.Element = null;
  if (isTextAreaField(props)) {
    const { rows } = props;
    control = (
      <TextArea
        hasError={hasError}
        id={fieldId}
        rows={rows ?? DEFAULT_ROW_COUNT}
        size={size}
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
