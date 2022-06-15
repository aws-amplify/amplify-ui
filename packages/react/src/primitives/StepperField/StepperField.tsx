import * as React from 'react';
import classNames from 'classnames';

import { useStepper } from './useStepper';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconAdd, IconRemove } from '../Icon/internal';
import { Input } from '../Input';
import { Label } from '../Label';
import { Primitive } from '../types/view';
import { StepperFieldProps } from '../types/stepperField';
import { classNameModifier } from '../shared/utils';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../utils/useStableId';

export const DECREASE_ICON = 'decrease-icon';
export const INCREASE_ICON = 'increase-icon';

const StepperFieldPrimitive: Primitive<StepperFieldProps, 'input'> = (
  props,
  ref
) => {
  const {
    className,
    descriptiveText,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    defaultValue,
    errorMessage,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    increaseButtonLabel = ComponentText.StepperField.increaseButtonLabel,
    decreaseButtonLabel = ComponentText.StepperField.decreaseButtonLabel,
    label,
    labelHidden = false,
    onStepChange,
    size,
    variation,
    testId,

    bottom, // @TODO: remove custom destructuring for 3.0 release
    height, // @TODO: remove custom destructuring for 3.0 release
    left, // @TODO: remove custom destructuring for 3.0 release
    padding, // @TODO: remove custom destructuring for 3.0 release
    position, // @TODO: remove custom destructuring for 3.0 release
    right, // @TODO: remove custom destructuring for 3.0 release
    top, // @TODO: remove custom destructuring for 3.0 release
    width, // @TODO: remove custom destructuring for 3.0 release

    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    value: controlledValue,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  const { baseStyleProps, flexContainerStyleProps, rest } =
    splitPrimitiveProps(_rest);

  const {
    step,
    value,
    inputValue,
    handleDecrease,
    handleIncrease,
    handleOnBlur,
    handleOnChange,
    handleOnWheel,
    setInputValue,
    shouldDisableDecreaseButton,
    shouldDisableIncreaseButton,
  } = useStepper(props);

  React.useEffect(() => {
    const isControlled = controlledValue !== undefined;
    if (isControlled) {
      setInputValue(controlledValue);
    }
  }, [controlledValue, setInputValue]);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        classNameModifier(ComponentClassNames.Field, size),
        ComponentClassNames.StepperField,
        className
      )}
      data-size={size}
      data-variation={variation}
      testId={testId}
      width={width}
      height={height}
      position={position}
      padding={padding}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
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
        outerStartComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${decreaseButtonLabel} ${value - step}`}
            className={classNames(
              ComponentClassNames.StepperFieldButtonDecrease,
              classNameModifier(
                ComponentClassNames.StepperFieldButtonDecrease,
                variation
              )
            )}
            data-invalid={hasError}
            isDisabled={shouldDisableDecreaseButton}
            onClick={handleDecrease}
            size={size}
          >
            <IconRemove data-testid={DECREASE_ICON} />
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${increaseButtonLabel} ${value + step}`}
            className={classNames(
              ComponentClassNames.StepperFieldButtonIncrease,
              classNameModifier(
                ComponentClassNames.StepperFieldButtonIncrease,
                variation
              )
            )}
            data-invalid={hasError}
            isDisabled={shouldDisableIncreaseButton}
            onClick={handleIncrease}
            size={size}
          >
            <IconAdd data-testid={INCREASE_ICON} />
          </FieldGroupIconButton>
        }
      >
        <Input
          aria-describedby={ariaDescribedBy}
          className={ComponentClassNames.StepperFieldInput}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onWheel={handleOnWheel}
          ref={ref}
          size={size}
          variation={variation}
          type="number"
          value={inputValue}
          {...baseStyleProps}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/stepperfield)
 */
export const StepperField = React.forwardRef(StepperFieldPrimitive);

StepperField.displayName = 'StepperField';
