import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      <Radio disabled selected label="disabled and selected" value="option-1" />
      <Radio disabled label="disabled and not selected" value="option-2" />
      <Radio selected label="not disabled and selected" value="option-3" />
      <Radio label="not disabled and not selected" value="option-4" />
    </>
  ))
  .add('size', () => (
    <View style={styles.container}>
      <Radio size="small" label="small" value="option-1" />
      <Radio size="small" selected label="small selected" value="option-2" />
      <Radio label="default" value="option-3" />
      <Radio selected label="default selected" value="option-4" />
      <Radio size="large" label="large" value="option-5" />
      <Radio size="large" selected label="large selected" value="option-6" />
      <Radio size={20} label="custom-small" value="option-7" />
      <Radio
        size={20}
        selected
        label="custom-small selected"
        value="option-8"
      />
      <Radio size={30} label="custom-medium" value="option-9" />
      <Radio
        size={30}
        selected
        label="custom-medium selected"
        value="option-10"
      />
      <Radio size={40} label="custom-large" value="option-11" />
      <Radio
        size={40}
        selected
        label="custom-large selected"
        value="option-12"
      />
    </View>
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
  container: {
    alignItems: 'flex-start',
  },
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
