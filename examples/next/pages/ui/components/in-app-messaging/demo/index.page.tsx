import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import {
  Button,
  defaultDarkModeOverride,
  ColorMode,
  Divider,
  Heading,
  CheckboxField,
  View,
  Radio,
  RadioGroupField,
  ThemeProvider,
  useTheme,
} from '@aws-amplify/ui-react';
import {
  InAppMessagingProvider,
  InAppMessageDisplay,
} from '@aws-amplify/ui-react-notifications';

import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';
import { ACTIONS, LAYOUTS, ORIENTATIONS, useInAppDemo } from './utils';

Amplify.configure(config);

function DemoCheckbox({ label, onChange, ...rest }) {
  return (
    <CheckboxField
      {...rest}
      label={label}
      name={label}
      onChange={() => {
        onChange((prev) => !prev);
      }}
      value=""
    />
  );
}

function DemoDivider() {
  return (
    <Divider marginBottom="small" marginTop="small" orientation="horizontal" />
  );
}

function DemoRadioGroup({ data, label, onChange, ...rest }) {
  return (
    <RadioGroupField
      {...rest}
      label={label}
      name={label}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {data.map((item) => (
        <Radio key={`${label}:${item}`} value={item}>
          {item}
        </Radio>
      ))}
    </RadioGroupField>
  );
}

function Content({ colorMode, setColorMode }) {
  const theme = useTheme();

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
    useAnalyticEvents,
  } = useInAppDemo();

  return (
    <View backgroundColor={theme.tokens.colors.background.primary}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Heading level={5} margin="medium">
          Configure Demo Message
        </Heading>
        <DemoRadioGroup
          data={['dark', 'light']}
          direction="row"
          label="Color Mode"
          marginBottom="medium"
          onChange={setColorMode}
          value={colorMode}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <View marginLeft="small" marginRight="small">
            <DemoCheckbox
              checked={useAnalyticEvents}
              label="Use Analytic events"
              onChange={handleAction('setUseAnalyticEvents')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={LAYOUTS}
              label="Layout"
              onChange={handleAction('setLayout')}
              value={layout}
            />
            <DemoDivider />
            <DemoCheckbox
              isDisabled={useAnalyticEvents}
              checked={!useAnalyticEvents && hasHeader}
              label="Has Header"
              onChange={handleAction('setHasHeader')}
            />
            <DemoDivider />
            <DemoCheckbox
              isDisabled={useAnalyticEvents}
              checked={!useAnalyticEvents && hasMessage}
              label="Has Message"
              onChange={handleAction('setHasMessage')}
            />
            <DemoDivider />
            <DemoCheckbox
              isDisabled={useAnalyticEvents}
              checked={!useAnalyticEvents && hasImage}
              label="Has Image"
              onChange={handleAction('setHasImage')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={ORIENTATIONS}
              isDisabled={useAnalyticEvents || !hasImage}
              label="Image Orientation"
              onChange={handleAction('setImageOrientation')}
              value={imageOrientation}
            />
          </View>
          <View marginLeft="small" marginRight="small">
            <DemoCheckbox
              checked={!useAnalyticEvents && hasPrimaryButton}
              label="Has Primary Button"
              isDisabled={useAnalyticEvents}
              onChange={handleAction('setHasPrimaryButton')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={ACTIONS}
              isDisabled={useAnalyticEvents || !hasPrimaryButton}
              label="Primary Button Action"
              onChange={handleAction('setPrimaryButtonAction')}
              value={primaryButtonAction}
            />
            <DemoDivider />
            <DemoCheckbox
              checked={!useAnalyticEvents && hasSecondaryButton}
              isDisabled={useAnalyticEvents || !hasPrimaryButton}
              label="Has Secondary Button"
              onChange={handleAction('setHasSecondaryButton')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={ACTIONS}
              isDisabled={
                useAnalyticEvents || !hasPrimaryButton || !hasSecondaryButton
              }
              label="Secondary Button Action"
              onChange={handleAction('setSecondaryButtonAction')}
              value={secondaryButtonAction}
            />
            <DemoDivider />
          </View>
        </div>
        <Button margin="medium" onClick={displayDemoMessage}>
          Display Demo Message
        </Button>
      </div>
    </View>
  );
}

export default function App() {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  return (
    <ThemeProvider
      colorMode={colorMode}
      theme={{ overrides: [defaultDarkModeOverride], name: 'dark' }}
    >
      <InAppMessagingProvider>
        <InAppMessageDisplay />
        <Content colorMode={colorMode} setColorMode={setColorMode} />
      </InAppMessagingProvider>
    </ThemeProvider>
  );
}
