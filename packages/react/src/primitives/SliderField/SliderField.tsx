import classNames from 'classnames';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import * as React from 'react';

import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { View } from '../View';
import { SliderFieldProps } from '../types/sliderField';
import { Primitive } from '../types/view';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { isFunction } from '../shared/utils';

export const SliderField: Primitive<SliderFieldProps, typeof Root> = ({
  orientation,
  trackWidth,
  emptyTrackColor,
  filledTrackColor,
  thumbColor,
  thumbComponent,
  outerStartComponent,
  outerEndComponent,
  descriptiveText,
  label,
  labelHidden,
  errorMessage,
  hasError,
  isDisabled,
  isValueHidden,
  value,
  defaultValue,
  onChange,
  testId,
  ..._rest
}) => {
  const { flexContainerStyleProps, rest } = splitPrimitiveProps(_rest);

  const isControlled = value !== undefined;

  const [currentValue, setCurrentValue] = React.useState(
    isControlled ? value : defaultValue
  );

  const values = isControlled ? [value] : undefined;
  const defaultValues = !isControlled ? [defaultValue] : undefined;

  const onValueChange = React.useCallback(
    (value: number[]) => {
      setCurrentValue(value[0]);
      if (isFunction(onChange)) {
        // Do not have multiple thumbs support yet
        onChange(value[0]);
      }
    },
    [onChange]
  );

  const isVertical = orientation === 'vertical';

  return (
    <Flex
      // Custom classnames will be added to Root below through rest
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.SliderField
      )}
      testId={testId}
      {...flexContainerStyleProps}
    >
      <Label
        className={ComponentClassNames.SliderFieldLabel}
        visuallyHidden={labelHidden}
      >
        <View as="span">{label}</View>
        {!isValueHidden ? (
          <View as="span" aria-hidden>
            {currentValue}
          </View>
        ) : null}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        className={ComponentClassNames.SliderFieldGroup}
        orientation={orientation}
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
      >
        <Root
          className={ComponentClassNames.SliderFieldRoot}
          disabled={isDisabled}
          orientation={orientation}
          defaultValue={defaultValues}
          value={values}
          onValueChange={onValueChange}
          {...rest}
        >
          <Track
            className={ComponentClassNames.SliderFieldTrack}
            style={{
              backgroundColor: emptyTrackColor,
              [`${isVertical ? 'width' : 'height'}`]: trackWidth,
            }}
          >
            <Range
              className={ComponentClassNames.SliderFieldRange}
              style={{ backgroundColor: filledTrackColor }}
            />
          </Track>
          <Thumb
            asChild={thumbComponent != undefined}
            className={ComponentClassNames.SliderFieldThumb}
            style={{ backgroundColor: thumbColor }}
          >
            {thumbComponent}
          </Thumb>
        </Root>
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
