import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { object, select } from '@storybook/addon-knobs';

import { Label } from '@aws-amplify/ui-react-native/dist/primitives/Label';
import { LabelVariation } from '@aws-amplify/ui-react-native/dist/primitives/Label/types';

const variations: LabelVariation[] = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'warning',
  'info',
  'success',
];

storiesOf('Label', module)
  .add('Default', () => <Label>Default Label</Label>)
  .add('Styled', () => <Label style={styles.redText}>This should be red</Label>)
  .add('Variations', () => (
    <>
      {variations.map((variation) => (
        <Label
          variation={variation}
          key={variation}
        >{`${variation} label`}</Label>
      ))}
    </>
  ))
  .add('Playground', () => (
    <Label
      variation={select('Variation', variations, 'primary')}
      style={object('Style', {})}
    >
      Label
    </Label>
  ));

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
});
