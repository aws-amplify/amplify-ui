import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';

import { useStepper } from './useStepper';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconAdd, IconRemove, useIcons } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import {
  BaseStepperFieldProps,
  StepperFieldProps,
} from '../types/stepperField';
import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentText } from '../shared/constants';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { useStableId } from '../utils/useStableId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const DECREASE_ICON = 'decrease-icon';
export const INCREASE_ICON = 'increase-icon';

const StepperFieldPrimitive: Primitive<StepperFieldProps, 'input'> = (
  props,
  ref
) => {
  const {
    className,
    // destructure to prevent `defaultValue` from being passed to underlying `Input` via `_rest`
    defaultValue,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    inputStyles,
    isDisabled,
    isReadOnly,
    isRequired,
    increaseButtonLabel = ComponentText.StepperField.increaseButtonLabel,
    decreaseButtonLabel = ComponentText.StepperField.decreaseButtonLabel,
    label,
    labelHidden = false,
    // destructure to prevent `onStepChange` from being passed to underlying `Input` via `_rest`
    onStepChange,
    size,
    testId,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    value: controlledValue,
    variation,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  const { styleProps, rest } = splitPrimitiveProps(_rest);
  const icons = useIcons('stepperField');

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
  } = useStepper({ ...props, defaultValue, onStepChange });

  React.useEffect(() => {
    const isControlled = controlledValue !== undefined;
    if (isControlled) {
      setInputValue(controlledValue);
    }
  }, [controlledValue, setInputValue]);

  return (
    <Flex
      className={classNames(
        ComponentClassName.Field,
        classNameModifier(ComponentClassName.Field, size),
        ComponentClassName.StepperField,
        className
      )}
      testId={testId}
      {...styleProps}
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
              ComponentClassName.StepperFieldButtonDecrease,
              classNameModifier(
                ComponentClassName.StepperFieldButtonDecrease,
                variation
              ),
              classNameModifierByFlag(
                ComponentClassName.StepperFieldButtonDecrease,
                'disabled',
                shouldDisableDecreaseButton
              )
            )}
            data-invalid={hasError}
            isDisabled={shouldDisableDecreaseButton}
            onClick={handleDecrease}
            size={size}
          >
            {icons?.remove ?? <IconRemove data-testid={DECREASE_ICON} />}
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${increaseButtonLabel} ${value + step}`}
            className={classNames(
              ComponentClassName.StepperFieldButtonIncrease,
              classNameModifier(
                ComponentClassName.StepperFieldButtonIncrease,
                variation
              ),
              classNameModifierByFlag(
                ComponentClassName.StepperFieldButtonIncrease,
                'disabled',
                shouldDisableIncreaseButton
              )
            )}
            data-invalid={hasError}
            isDisabled={shouldDisableIncreaseButton}
            onClick={handleIncrease}
            size={size}
          >
            {icons?.add ?? <IconAdd data-testid={INCREASE_ICON} />}
          </FieldGroupIconButton>
        }
      >
        <Input
          aria-describedby={ariaDescribedBy}
          className={ComponentClassName.StepperFieldInput}
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
          {...inputStyles}
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
export const StepperField: ForwardRefPrimitive<BaseStepperFieldProps, 'input'> =
  primitiveWithForwardRef(StepperFieldPrimitive);

StepperField.displayName = 'StepperField';
