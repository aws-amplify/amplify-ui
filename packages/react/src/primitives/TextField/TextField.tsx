import classNames from 'classnames';
import * as React from 'react';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ComponentClassNames } from '../shared';
import { TextFieldProps } from '../types';
import { Text } from '../Text';
import { Input } from '../Input';
import { nanoid } from 'nanoid';

export const TextField: React.FC<TextFieldProps> = (props) => {
  let {
    alignContent,
    alignItems,
    autoComplete,
    className,
    defaultValue,
    descriptiveText,
    direction = 'column',
    gap,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    justifyContent,
    label,
    labelHidden = false,
    type = 'text',
    value,
    visualSize,
    onChange,
    onBeforeInput,
    onCopy,
    onCut,
    onInput,
    onPaste,
    onSelect,
    wrap,
    ...rest
  } = props;

  const fieldId = React.useMemo(() => {
    if (id) {
      return id;
    }
    return `amplify-field-${nanoid()}`;
  }, []);

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(ComponentClassNames.TextField, className)}
      data-disabled={isDisabled}
      data-readonly={isReadOnly}
      data-required={isRequired}
      data-size={visualSize}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      wrap={wrap}
    >
      <Label
        htmlFor={fieldId}
        className={classNames({ 'sr-only': labelHidden })}
      >
        {label}
      </Label>
      {!labelHidden && descriptiveText ? (
        <Text className={ComponentClassNames.TextFieldDescription}>
          {descriptiveText}
        </Text>
      ) : null}
      <Flex className={ComponentClassNames.FieldWrapper}>
        <Input
          className={ComponentClassNames.TextFieldInput}
          defaultValue={defaultValue}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          visualSize={visualSize}
          value={value}
          onChange={onChange}
          onBeforeInput={onBeforeInput}
          onCopy={onCopy}
          onCut={onCut}
          onInput={onInput}
          onPaste={onPaste}
          onSelect={onSelect}
          {...rest}
        />
      </Flex>
    </Flex>
  );
};
