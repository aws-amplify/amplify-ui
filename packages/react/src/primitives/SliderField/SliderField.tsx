import classNames from 'classnames';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { isFunction, useStableId } from '../shared/utils';
import { Label } from '../Label';
import { LABEL_HIDDEN_DEPRECATED } from '../../helpers/messages';
import { Primitive } from '../types/view';
import { SliderFieldProps } from '../types/sliderField';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
import { View } from '../View';

export const SLIDER_LABEL_TEST_ID = 'slider-label';
export const SLIDER_ROOT_TEST_ID = 'slider-root';
export const SLIDER_TRACK_TEST_ID = 'slider-track';
export const SLIDER_RANGE_TEST_ID = 'slider-range';

const SliderFieldPrimitive: Primitive<SliderFieldProps, typeof Root> = (
  {
    ariaValuetext,
    className,
    defaultValue,
    descriptiveText,
    emptyTrackColor,
    errorMessage,
    filledTrackColor,
    hasError = false,
    id,
    isDisabled,
    isLabelHidden = false,
    isValueHidden = false,
    label,
    labelHidden = false,
    onChange,
    orientation = 'horizontal',
    outerEndComponent,
    outerStartComponent,
    testId,
    thumbColor,
    trackSize,
    dir,
    value,
    size,
    ..._rest
  },
  ref
) => {
  useDeprecationWarning({
    shouldWarn: labelHidden,
    message: LABEL_HIDDEN_DEPRECATED,
  });

  const fieldId = useStableId(id);
  const labelId = useStableId();
  const descriptionId = useStableId();

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
      // Custom classnames will be added to Root below
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.SliderField
      )}
      testId={testId}
      data-size={size}
      {...flexContainerStyleProps}
    >
      <Label
        className={ComponentClassNames.SliderFieldLabel}
        id={labelId}
        testId={SLIDER_LABEL_TEST_ID}
        visuallyHidden={isLabelHidden || labelHidden}
      >
        <View as="span">{label}</View>
        {!isValueHidden ? <View as="span">{currentValue}</View> : null}
      </Label>
      <FieldDescription
        id={descriptionId}
        isLabelHidden={isLabelHidden || labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        className={ComponentClassNames.SliderFieldGroup}
        id={fieldId}
        orientation={orientation}
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
      >
        <Root
          className={classNames(ComponentClassNames.SliderFieldRoot, className)}
          data-testid={SLIDER_ROOT_TEST_ID}
          disabled={isDisabled}
          defaultValue={defaultValues}
          onValueChange={onValueChange}
          orientation={orientation}
          ref={ref}
          value={values}
          {...rest}
        >
          <Track
            className={ComponentClassNames.SliderFieldTrack}
            data-testid={SLIDER_TRACK_TEST_ID}
            style={{
              backgroundColor: emptyTrackColor,
              [`${isVertical ? 'width' : 'height'}`]: trackSize,
            }}
          >
            <Range
              className={ComponentClassNames.SliderFieldRange}
              data-testid={SLIDER_RANGE_TEST_ID}
              style={{ backgroundColor: filledTrackColor }}
            />
          </Track>
          <Thumb
            aria-describedby={descriptionId}
            aria-labelledby={labelId}
            aria-valuetext={ariaValuetext}
            className={ComponentClassNames.SliderFieldThumb}
            style={{ backgroundColor: thumbColor }}
          />
        </Root>
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const SliderField = React.forwardRef(SliderFieldPrimitive);

SliderField.displayName = 'SliderField';
