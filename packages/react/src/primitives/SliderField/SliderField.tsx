import classNames from 'classnames';
import { Range, Slider, Thumb, Track } from '@radix-ui/react-slider';

import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { SliderFieldProps } from '../types/sliderField';
import { Primitive } from '../types/view';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../shared/utils';

export const SliderField: Primitive<SliderFieldProps, typeof Slider> = ({
  trackHeight,
  emptyTrackColor,
  filledTrackColor,
  thumbColor,
  thumbComponent,
  outerStartComponent,
  outerEndComponent,
  id,
  descriptiveText,
  label,
  labelHidden,
  errorMessage,
  hasError,
  value,
  defaultValue,
  onValueChange,
  testId,
  ..._rest
}) => {
  const fieldId = useStableId(id);

  const { flexContainerStyleProps, rest } = splitPrimitiveProps(_rest);
  return (
    <Flex
      // Custom classnames will be added to Slider below through rest
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.SliderField
      )}
      testId={testId}
      {...flexContainerStyleProps}
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
      >
        <Slider {...rest}>
          <Track
            style={{ backgroundColor: emptyTrackColor, height: trackHeight }}
          >
            <Range id={fieldId} style={{ backgroundColor: filledTrackColor }} />
          </Track>
          <Thumb
            asChild={thumbComponent != undefined}
            style={{ backgroundColor: thumbColor }}
          >
            {thumbComponent}
          </Thumb>
        </Slider>
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
