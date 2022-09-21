import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { withInAppMessaging } from '@aws-amplify/ui-react-native';
import { Button, Checkbox, Radio, RadioGroup } from '../../../ui';
import { useInAppDemo, ACTIONS, LAYOUTS, ORIENTATIONS } from './utils';

function DemoDivider() {
  return <View style={styles.divider} />;
}

function DemoCheckbox({ onChange, ...rest }: any) {
  return (
    <Checkbox
      {...rest}
      labelStyle={styles.label}
      onChange={() => {
        onChange((prev: boolean) => !prev);
      }}
      size={20}
    />
  );
}

function DemoRadioGroup({ data, ...rest }: any) {
  return (
    <RadioGroup {...rest} labelStyle={[styles.radioGroupLabel, styles.label]}>
      {data.map((item: string) => (
        <Radio key={item} label={item} size="small" value={item} />
      ))}
    </RadioGroup>
  );
}

function Demo() {
  const {
    displayDemoMessage,
    handleAction,
    hasHeader,
    hasImage,
    hasMessage,
    hasPrimaryButton,
    hasSecondaryButton,
    imageOrientation,
    layout,
    primaryButtonAction,
    secondaryButtonAction,
  } = useInAppDemo();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.heading}>Configure Demo Message</Text>
        <DemoRadioGroup
          data={LAYOUTS}
          label="Layout"
          onChange={handleAction('setLayout')}
          value={layout}
        />
        <DemoDivider />
        <DemoCheckbox
          label="Has Header"
          onChange={handleAction('setHasHeader')}
          selected={hasHeader}
          value={hasHeader}
        />
        <DemoDivider />
        <DemoCheckbox
          label="Has Message"
          onChange={handleAction('setHasMessage')}
          selected={hasMessage}
          value={hasMessage}
        />
        <DemoDivider />
        <DemoCheckbox
          selected={hasImage}
          label="Has Image"
          onChange={handleAction('setHasImage')}
          value={hasImage}
        />
        <DemoDivider />
        <DemoRadioGroup
          data={ORIENTATIONS}
          direction="horizontal"
          disabled={!hasImage}
          label="Image Orientation"
          onChange={handleAction('setImageOrientation')}
          value={imageOrientation}
        />
        <DemoDivider />
        <DemoCheckbox
          label="Has Primary Button"
          onChange={handleAction('setHasPrimaryButton')}
          selected={hasPrimaryButton}
          value={hasPrimaryButton}
        />
        <DemoDivider />
        <DemoRadioGroup
          data={ACTIONS}
          disabled={!hasPrimaryButton}
          label="Primary Button Action"
          onChange={handleAction('setPrimaryButtonAction')}
          value={primaryButtonAction}
        />
        <DemoDivider />
        <DemoCheckbox
          disabled={!hasPrimaryButton}
          label="Has Secondary Button"
          onChange={handleAction('setHasSecondaryButton')}
          selected={hasSecondaryButton}
          value={hasSecondaryButton}
        />
        <DemoDivider />
        <DemoRadioGroup
          data={ACTIONS}
          disabled={!hasPrimaryButton || !hasSecondaryButton}
          label="Secondary Button Action"
          onChange={handleAction('setSecondaryButtonAction')}
          value={secondaryButtonAction}
        />
        <Button
          onPress={displayDemoMessage}
          style={styles.button}
          textStyle={styles.buttonLabel}
        >
          Display Demo Message
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0f5a68',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
    padding: 12,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  divider: {
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
    marginVertical: 4,
    width: '100%',
  },
  heading: {
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
  },
  radioGroupLabel: {
    marginBottom: 4,
  },
  wrapper: {
    flex: 1,
  },
});

export default withInAppMessaging(Demo);
