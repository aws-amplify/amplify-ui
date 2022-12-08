import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Animated, Easing, StyleSheet } from 'react-native';

import { Icon } from '@aws-amplify/ui-react-native/dist/primitives';
import { icons } from '@aws-amplify/ui-react-native/dist/assets';

const source = icons.close;

const StatefulAnimatedIcon = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(spinValue, {
          toValue: 100,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Icon
      animated
      source={source}
      size={20}
      style={{ transform: [{ rotate: spin }] }}
    />
  );
};

storiesOf('Icon', module)
  .add('Default', () => <Icon size={20} source={source} />)
  .add('Animated', () => <StatefulAnimatedIcon />)
  .add('Styled', () => (
    <Icon size={20} source={source} style={styles.custom} />
  ));

const styles = StyleSheet.create({
  custom: {
    backgroundColor: 'lightgray',
  },
});
