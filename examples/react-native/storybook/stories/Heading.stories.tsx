import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  Heading,
  HeadingProps,
} from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';
import { StyleSheet } from 'react-native';

const levels: HeadingProps['level'][] = [1, 2, 3, 4, 5, 6];

storiesOf('Heading', module)
  .addDecorator((Story: any) => (
    <Screen>
      <Story />
    </Screen>
  ))
  .add('default', () => <Heading>Default Heading</Heading>)
  .add('level', () => (
    <>
      {levels.map((level) => (
        <Heading level={level} key={level}>{`Heading level ${level}`}</Heading>
      ))}
    </>
  ))
  .add('style', () => (
    <Heading style={styles.redText}>This should be red</Heading>
  ));

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
});
