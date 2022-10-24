import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { Primitive, TextFieldProps } from '../types';
import { useStableId } from '../utils/useStableId';

const TextFieldPrimitive: Primitive<TextFieldProps, 'input'> = (props, ref) => {
  const {
    className,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    innerEndComponent,
    innerStartComponent,
    label,
    labelHidden = false,
    outerEndComponent,
    outerStartComponent,
    size,
    testId,
    variation,

    alignSelf, // @TODO: remove custom destructuring for 3.0 release
    bottom, // @TODO: remove custom destructuring for 4.0 release
    height, // @TODO: remove custom destructuring for 4.0 release
    left, // @TODO: remove custom destructuring for 4.0 release
    padding, // @TODO: remove custom destructuring for 4.0 release
    position, // @TODO: remove custom destructuring for 4.0 release
    right, // @TODO: remove custom destructuring for 4.0 release
    top, // @TODO: remove custom destructuring for 4.0 release
    width, // @TODO: remove custom destructuring for 4.0 release

    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

  return (
    <Flex
      alignSelf={alignSelf}
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
        <Input
          aria-describedby={ariaDescribedBy}
          hasError={hasError}
          id={fieldId}
          ref={ref}
          size={size}
          variation={variation}
          {...baseStyleProps}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/textfield)
 */
export const TextField = React.forwardRef(TextFieldPrimitive);

TextField.displayName = 'TextField';
