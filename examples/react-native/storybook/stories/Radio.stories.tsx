import React from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Radio } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';
import { StyleSheet } from 'react-native';

storiesOf('Radio', module)
  .addDecorator((Story: any) => (
    <Screen>
      <Story />
    </Screen>
  ))
  .add('default', () => <Radio />)
  .add('label', () => (
    <>
      <Radio label="default" />
      <Radio label="start" labelPosition="start" />
      <Radio label="end" labelPosition="end" />
      <Radio label="top" labelPosition="top" />
      <Radio label="bottom" labelPosition="bottom" />
    </>
  ))
  .add('labelStyle', () => (
    <Radio label="This should be red" labelStyle={styles.redText} />
  ))
  .add('selected', () => (
    <>
      <Radio selected={true} label="selected" />
      <Radio selected={false} label="not selected" />
    </>
  ))
  .add('disabled', () => (
    <>
      <Radio disabled selected label="disabled and selected" />
      <Radio disabled label="disabled and not selected" />
      <Radio selected label="not disabled and selected" />
      <Radio label="not disabled and not selected" />
    </>
  ))
  .add('size', () => (
    <>
      <Radio size="small" label="small" />
      <Radio size="small" selected label="small selected" />
      <Radio label="default" />
      <Radio selected label="default selected" />
      <Radio size="large" label="large" />
      <Radio size="large" selected label="large selected" />
    </>
  ));

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
});

/*

selected
label
size - I have some questions about how to implement this
disabled

*/
