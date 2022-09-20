import React, { useMemo } from 'react';
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
  onChange,
  selected,
  // size,
  style,
  // value,
  ...rest
}: RadioProps<T>): JSX.Element {
  // const [pressed, setPressed] = useState(false);

  // const handleOnPress = () => {
  //   setPressed(!pressed);
  // };

  const labelPrecedesIcon =
    labelPosition === 'start' || labelPosition === 'top';

  // placeholder
  const handleOnChange = () => {
    onChange?.();
  };
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
      <TouchableWithoutFeedback onPress={handleOnChange}>
        <View style={[styles.outer]}>
          {selected ? <View style={[styles.inner]} /> : null}
        </View>
      </TouchableWithoutFeedback>
      {label && !labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
    </View>
  );
}
