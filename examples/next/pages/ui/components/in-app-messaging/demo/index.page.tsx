import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import {
  Button,
  defaultDarkModeOverride,
  ColorMode,
  Divider,
  Heading,
  InAppMessageDisplay,
  InAppMessagingProvider,
  CheckboxField,
  View,
  Radio,
  RadioGroupField,
  ThemeProvider,
  useTheme,
} from '@aws-amplify/ui-react';
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
    useAnalyticsEvents,
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
              checked={useAnalyticsEvents}
              label="Use Analytics actions"
              onChange={handleAction('setUseAnalyticsEvents')}
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
              isDisabled={useAnalyticsEvents}
              checked={!useAnalyticsEvents && hasHeader}
              label="Has Header"
              onChange={handleAction('setHasHeader')}
            />
            <DemoDivider />
            <DemoCheckbox
              isDisabled={useAnalyticsEvents}
              checked={!useAnalyticsEvents && hasMessage}
              label="Has Message"
              onChange={handleAction('setHasMessage')}
            />
            <DemoDivider />
            <DemoCheckbox
              isDisabled={useAnalyticsEvents}
              checked={!useAnalyticsEvents && hasImage}
              label="Has Image"
              onChange={handleAction('setHasImage')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={ORIENTATIONS}
              isDisabled={useAnalyticsEvents || !hasImage}
              label="Image Orientation"
              onChange={handleAction('setImageOrientation')}
              value={imageOrientation}
            />
          </View>
          <View marginLeft="small" marginRight="small">
            <DemoCheckbox
              checked={!useAnalyticsEvents && hasPrimaryButton}
              label="Has Primary Button"
              isDisabled={useAnalyticsEvents}
              onChange={handleAction('setHasPrimaryButton')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={ACTIONS}
              isDisabled={useAnalyticsEvents || !hasPrimaryButton}
              label="Primary Button Action"
              onChange={handleAction('setPrimaryButtonAction')}
              value={primaryButtonAction}
            />
            <DemoDivider />
            <DemoCheckbox
              checked={!useAnalyticsEvents && hasSecondaryButton}
              isDisabled={useAnalyticsEvents || !hasPrimaryButton}
              label="Has Secondary Button"
              onChange={handleAction('setHasSecondaryButton')}
            />
            <DemoDivider />
            <DemoRadioGroup
              data={ACTIONS}
              isDisabled={
                useAnalyticsEvents || !hasPrimaryButton || !hasSecondaryButton
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
