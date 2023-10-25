import classNames from 'classnames';
import * as RadixSlider from '@radix-ui/react-slider';
import * as React from 'react';

import {
  classNameModifierByFlag,
  isFunction,
  sanitizeNamespaceImport,
} from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { BaseSliderFieldProps, SliderFieldProps } from '../types/sliderField';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { View } from '../View';
import { useStableId } from '../utils/useStableId';
import { useFieldset } from '../Fieldset/useFieldset';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR)
// We have to use namespace import and sanitize it to ensure the interoperablity between ESM and CJS
const { Range, Root, Thumb, Track } = sanitizeNamespaceImport(RadixSlider);

export const SLIDER_LABEL_TEST_ID = 'slider-label';
export const SLIDER_ROOT_TEST_ID = 'slider-root';
export const SLIDER_TRACK_TEST_ID = 'slider-track';
export const SLIDER_RANGE_TEST_ID = 'slider-range';

const SliderFieldPrimitive: Primitive<SliderFieldProps, 'span'> = (
  {
    ariaValuetext,
    className,
    defaultValue = 0,
    descriptiveText,
    emptyTrackColor,
    errorMessage,
    filledTrackColor,
    formatValue,
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
    value,
    size,
    ..._rest
  },
  ref
) => {
  const { isFieldsetDisabled } = useFieldset();

  const fieldId = useStableId(id);
  const labelId = useStableId();
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;
  const disabled = isFieldsetDisabled ? isFieldsetDisabled : isDisabled;

  const { styleProps, rest } = splitPrimitiveProps(_rest);

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

  const renderedValue = React.useMemo(() => {
    const formattedValue = isFunction(formatValue)
      ? formatValue(currentValue)
      : currentValue;
    return typeof formatValue === 'string' ? (
      <View as="span">{formattedValue}</View>
    ) : (
      formattedValue
    );
  }, [currentValue, formatValue]);

  const isVertical = orientation === 'vertical';
  const componentClasses = classNames(
    ComponentClassName.SliderFieldTrack,
    classNameModifier(ComponentClassName.SliderFieldTrack, orientation),
    classNameModifier(ComponentClassName.SliderFieldTrack, size)
  );
  const rootComponentClasses = classNames(
    ComponentClassName.SliderFieldRoot,
    classNameModifier(ComponentClassName.SliderFieldRoot, orientation),
    classNameModifier(ComponentClassName.SliderFieldRoot, size),
    classNameModifierByFlag(
      ComponentClassName.SliderFieldRoot,
      'disabled',
      disabled
    ),
    className
  );

  return (
    <Flex
      // Custom classnames will be added to Root below
      className={classNames(
        ComponentClassName.Field,
        classNameModifier(ComponentClassName.Field, size),
        ComponentClassName.SliderField
      )}
      testId={testId}
      {...styleProps}
    >
      <Label
        className={ComponentClassName.SliderFieldLabel}
        id={labelId}
        testId={SLIDER_LABEL_TEST_ID}
        visuallyHidden={labelHidden}
      >
        <View as="span">{label}</View>
        {!isValueHidden ? renderedValue : null}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        className={ComponentClassName.SliderFieldGroup}
        id={fieldId}
        orientation={orientation}
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
      >
        <Root
          className={rootComponentClasses}
          data-testid={SLIDER_ROOT_TEST_ID}
          disabled={disabled}
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
                ComponentClassName.SliderFieldRange,
                classNameModifier(
                  ComponentClassName.SliderFieldRange,
                  orientation
                ),
                classNameModifierByFlag(
                  ComponentClassName.SliderFieldRange,
                  'disabled',
                  disabled
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
              ComponentClassName.SliderFieldThumb,
              classNameModifier(ComponentClassName.SliderFieldThumb, size),
              classNameModifierByFlag(
                ComponentClassName.SliderFieldThumb,
                'disabled',
                disabled
              )
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
export const SliderField: ForwardRefPrimitive<BaseSliderFieldProps, 'span'> =
  primitiveWithForwardRef(SliderFieldPrimitive);

SliderField.displayName = 'SliderField';
