'use client';

import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { initializeInAppMessaging } from 'aws-amplify/in-app-messaging';
import {
  ColorMode,
  defaultDarkModeOverride,
  Divider,
  Heading,
  ThemeProvider,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import {
  InAppMessageDisplay,
  InAppMessagingProvider,
} from '@aws-amplify/ui-react-notifications';

import config from './aws-exports';
import { ACTIONS, LAYOUTS, ORIENTATIONS, useInAppDemo } from './utils';

Amplify.configure(config);
initializeInAppMessaging();

function DemoCheckbox({ label, onChange, ...rest }) {
  return (
    <label key={`${label}:${rest.checked}`}>
      <input
        disabled={rest.isDisabled}
        name={label}
        type="checkbox"
        checked={rest.checked}
        onChange={(e) => {
          e.preventDefault();
          onChange((prev) => !prev);
        }}
      />
      {label}
    </label>
  );
}

function DemoDivider() {
  return (
    <Divider marginBottom="small" marginTop="small" orientation="horizontal" />
  );
}

function DemoRadioGroup({ data, legend, onChange, ...rest }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {data.map((item) => (
        <label
          key={`${legend}:${item}:${rest.value === item}`}
          style={{ display: 'block' }}
        >
          <input
            onChange={(e) => {
              e.preventDefault();
              onChange(e.target.value);
            }}
            disabled={rest.isDisabled}
            checked={rest.value === item}
            type="radio"
            name={legend}
            value={item}
          />{' '}
          {item}
        </label>
      ))}
    </fieldset>
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
          legend="Color Mode"
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
              legend="Layout"
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
              legend="Image Orientation"
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
              legend="Primary Button Action"
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
              legend="Secondary Button Action"
              onChange={handleAction('setSecondaryButtonAction')}
              value={secondaryButtonAction}
            />
            <DemoDivider />
          </View>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            displayDemoMessage();
          }}
        >
          Display Demo Message
        </button>
      </div>
    </View>
  );
}

export default function App() {
  const [colorMode, setColorMode] = useState<ColorMode>('light');
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
