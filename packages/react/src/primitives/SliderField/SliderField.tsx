import classNames from 'classnames';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import * as React from 'react';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { isFunction } from '../shared/utils';
import { Label } from '../Label';
import { Primitive } from '../types/view';
import { SliderFieldProps } from '../types/sliderField';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { View } from '../View';
import { useStableId } from '../utils/useStableId';

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
  const fieldId = useStableId(id);
  const labelId = useStableId();
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;

  const { flexContainerStyleProps, baseStyleProps, rest } =
    splitPrimitiveProps(_rest);

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
  const componentClasses = classNames(
    ComponentClassNames.SliderFieldTrack,
    classNameModifier(ComponentClassNames.SliderFieldTrack, orientation),
    classNameModifier(ComponentClassNames.SliderFieldTrack, size)
  );
  const rootComponentClasses = classNames(
    ComponentClassNames.SliderFieldRoot,
    classNameModifier(ComponentClassNames.SliderFieldRoot, orientation),
    classNameModifier(ComponentClassNames.SliderFieldRoot, size),
    className
  );

  return (
    <Flex
      // Custom classnames will be added to Root below
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.SliderField
      )}
      testId={testId}
      data-size={size}
      {...baseStyleProps}
      {...flexContainerStyleProps}
    >
      <Label
        className={ComponentClassNames.SliderFieldLabel}
        id={labelId}
        testId={SLIDER_LABEL_TEST_ID}
        visuallyHidden={labelHidden}
      >
        <View as="span">{label}</View>
        {!isValueHidden ? <View as="span">{currentValue}</View> : null}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
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
          className={rootComponentClasses}
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
            className={componentClasses}
            data-testid={SLIDER_TRACK_TEST_ID}
            style={{
              backgroundColor: String(emptyTrackColor),
              [`${isVertical ? 'width' : 'height'}`]: trackSize,
            }}
          >
            <Range
              className={classNames(
                ComponentClassNames.SliderFieldRange,
                classNameModifier(
                  ComponentClassNames.SliderFieldRange,
                  orientation
                )
              )}
              data-testid={SLIDER_RANGE_TEST_ID}
              style={{ backgroundColor: String(filledTrackColor) }}
            />
          </Track>
          <Thumb
            aria-describedby={ariaDescribedBy}
            aria-labelledby={labelId}
            aria-valuetext={ariaValuetext}
            className={classNames(
              ComponentClassNames.SliderFieldThumb,
              classNameModifier(ComponentClassNames.SliderFieldThumb, size)
            )}
            style={{ backgroundColor: String(thumbColor) }}
          />
        </Root>
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/sliderfield)
 */
export const SliderField = React.forwardRef(SliderFieldPrimitive);

SliderField.displayName = 'SliderField';
