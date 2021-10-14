import classNames from 'classnames';

import * as React from 'react';

import { useStepper } from './useStepper';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconAdd, IconRemove } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { StepperFieldProps } from '../types/stepperField';
import { ComponentClassNames } from '../shared/constants';
import { SharedText } from '../shared/i18n';
import { useStableId } from '../shared/utils';

export const StepperField: React.FC<StepperFieldProps> = (props) => {
  const {
    alignContent,
    alignItems,
    className,
    descriptiveText,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    defaultValue,
    direction,
    errorMessage,
    gap,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    justifyContent,
    label,
    labelHidden = true,
    onStepChange,
    size,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    value: controlledValue,
    wrap,
    ...rest
  } = props;

  const fieldId = useStableId(id);

  const {
    step,
    value,
    inputValue,
    handleDecrease,
    handleIncrease,
    handleOnBlur,
    handleOnChange,
    handleOnWheel,
    shouldDisableDecreaseButton,
    shouldDisableIncreaseButton,
  } = useStepper(props);

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.StepperField,
        className
      )}
      data-size={size}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
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
        outerStartComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${SharedText.StepperField.ariaLabel.DecreaseTo} ${
              value - step
            }`}
            isDisabled={shouldDisableDecreaseButton}
            onClick={handleDecrease}
            size={size}
          >
            <IconRemove size={size} />
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${SharedText.StepperField.ariaLabel.IncreaseTo} ${
              value + step
            }`}
            isDisabled={shouldDisableIncreaseButton}
            onClick={handleIncrease}
            size={size}
          >
            <IconAdd size={size} />
          </FieldGroupIconButton>
        }
      >
        <Input
          className={ComponentClassNames.StepperFieldInput}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onWheel={handleOnWheel}
          size={size}
          type="number"
          value={inputValue}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
