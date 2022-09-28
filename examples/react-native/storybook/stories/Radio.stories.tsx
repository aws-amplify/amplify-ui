import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Radio } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('Radio', module)
  .add('default', () => <Radio label="Default" value="default" />)
  .add('label', () => (
    <>
      <Radio label="Default" value="default" />
      <Radio label="Start" labelPosition="start" value="start" />
      <Radio label="End" labelPosition="end" value="end" />
      <Radio label="Top" labelPosition="top" value="top" />
      <Radio label="Bottom" labelPosition="bottom" value="bottom" />
    </>
  ))
  .add('labelStyle', () => (
    <Radio
      label="This should be red"
      labelStyle={styles.redText}
      value="labelStyle"
    />
  ))
  .add('selected', () => (
    <>
      <Radio selected={true} label="Selected" value="selected" />
      <Radio selected={false} label="Not selected" value="not-selected" />
    </>
  ))
  .add('disabled', () => (
    <>
      <Radio disabled selected label="disabled and selected" value="option1" />
      <Radio disabled label="disabled and not selected" value="option2" />
      <Radio selected label="not disabled and selected" value="option3" />
      <Radio label="not disabled and not selected" value="option4" />
    </>
  ))
  .add('size', () => (
    <>
      <Radio size="small" label="small" value="option1" />
      <Radio size="small" selected label="small selected" value="option2" />
      <Radio label="default" value="option3" />
      <Radio selected label="default selected" value="option4" />
      <Radio size="large" label="large" value="option5" />
      <Radio size="large" selected label="large selected" value="option6" />
      <Radio size={40} label="custom-big" value="option7" />
      <Radio size={40} selected label="custom-big selected" value="option8" />
      <Radio size={10} label="custom-tiny" value="option9" />
      <Radio size={10} selected label="custom-tiny selected" value="option10" />
    </>
  ))
  .add('styles', () => (
    <Radio
      selected
      label="Green button, blue border"
      radioDotStyle={styles.greenButton}
      radioContainerStyle={styles.blueBorder}
      value="green"
    />
  ));

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
  greenButton: {
    backgroundColor: 'green',
  },
  blueBorder: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});
