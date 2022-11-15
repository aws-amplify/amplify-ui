import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Icon } from '@aws-amplify/ui-react-native/dist/primitives';
import { icons } from '@aws-amplify/ui-react-native/dist/assets';
import { Animated, Easing } from 'react-native';

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
  .add('default', () => <Icon size={20} source={source} />)
  .add('animated', () => <StatefulAnimatedIcon />)
  .add('with style', () => (
    <Icon size={20} source={source} style={{ backgroundColor: 'lightgray' }} />
  ));
