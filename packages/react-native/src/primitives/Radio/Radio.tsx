import React, { useMemo, useState } from 'react';
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

// import { icons } from '../../assets';

import { Label } from '../index';

import { RadioProps } from './types';
import { styles } from './styles';

export default function Radio<T>({
  // buttonStyle,
  disabled,
  label,
  labelPosition = 'end',
  labelStyle,
  // onChange,
  // selected,
  // size,
  style,
  // value,
  ...rest
}: RadioProps<T>): JSX.Element {
  const [pressed, setPressed] = useState(false);

  const handleOnPress = () => {
    setPressed(!pressed);
  };

  const labelPrecedesIcon =
    labelPosition === 'start' || labelPosition === 'top';

  // const handleOnChange = useCallback(() => {
  //   onChange?.(value);
  // }, [onChange, value]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      alignItems: 'center',
      flexDirection:
        labelPosition === 'bottom' || labelPosition === 'top'
          ? 'column'
          : 'row',
      opacity: disabled ? 0.6 : 1,
    }),
    [disabled, labelPosition]
  );

  return (
    <View {...rest} style={[containerStyle, style]}>
      {label && labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={[styles.outer]}>
          {pressed ? <View style={[styles.inner]} /> : null}
        </View>
      </TouchableWithoutFeedback>
      {/* <Button>Hello world</Button> */}
      {/* <IconButton
        disabled={disabled}
        onPress={handleOnChange}
        source={
          selected ? icons.radioButtonChecked : icons.radioButtonUnchecked
        }
        size={size}
        style={buttonStyle}
      /> */}
      {label && !labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
    </View>
  );
}
