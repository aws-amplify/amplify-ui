import React, { useState } from 'react';
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
  useInAppMessaging,
  useTheme,
} from '@aws-amplify/ui-react';

import { getInAppMessage, GetInAppMessageParams, LAYOUTS } from './utils';

import '@aws-amplify/ui-react/styles.css';

function DemoCheckbox({ checked, label, isDisabled = false, onChange }) {
  return (
    <CheckboxField
      checked={checked}
      label={label}
      isDisabled={isDisabled}
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

function RadioGroup({
  data,
  direction = '',
  label,
  isDisabled = false,
  onChange,
  value,
}) {
  return (
    <RadioGroupField
      direction={direction}
      isDisabled={isDisabled}
      label={label}
      name={label}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
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
  const { displayMessage } = useInAppMessaging();

  const [layout, setLayout] =
    useState<GetInAppMessageParams['layout']>('TOP_BANNER');

  const [hasHeader, setHasHeader] =
    useState<GetInAppMessageParams['hasHeader']>(true);
  const [hasMessage, setHasMessage] =
    useState<GetInAppMessageParams['hasMessage']>(true);

  const [hasImage, setHasImage] =
    useState<GetInAppMessageParams['hasImage']>(true);
  const [imageOrientation, setImageOrientation] =
    useState<GetInAppMessageParams['imageOrientation']>('landscape');

  const [hasPrimaryButton, setHasPrimaryButton] =
    useState<GetInAppMessageParams['hasPrimaryButton']>(true);
  const [primaryButtonAction, setPrimaryButtonAction] =
    useState<GetInAppMessageParams['primaryButtonAction']>('LINK');

  const [hasSecondaryButton, setHasSecondaryButton] =
    useState<GetInAppMessageParams['hasSecondaryButton']>(true);
  const [secondaryButtonAction, setSecondaryButtonAction] =
    useState<GetInAppMessageParams['secondaryButtonAction']>('CLOSE');

  const onClick = () => {
    const message = getInAppMessage({
      hasHeader,
      hasImage,
      hasMessage,
      hasPrimaryButton,
      hasSecondaryButton: !hasPrimaryButton ? false : hasSecondaryButton,
      imageOrientation,
      layout,
      primaryButtonAction,
      secondaryButtonAction,
    });
    displayMessage(message);
  };

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
          Configure Local Message
        </Heading>
        <RadioGroup
          data={['dark', 'light']}
          direction="row"
          label="Color Mode"
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
            <RadioGroup
              data={LAYOUTS}
              label="Layout"
              onChange={setLayout}
              value={layout}
            />
            <DemoDivider />
            <DemoCheckbox
              checked={hasHeader}
              label="Has Header"
              onChange={setHasHeader}
            />
            <DemoDivider />
            <DemoCheckbox
              checked={hasMessage}
              label="Has Message"
              onChange={setHasMessage}
            />
            <DemoDivider />
            <DemoCheckbox
              checked={hasImage}
              label="Has Image"
              onChange={setHasImage}
            />
            <DemoDivider />
            <RadioGroup
              data={['landscape', 'portrait']}
              isDisabled={!hasImage}
              label="Image Orientation"
              onChange={setImageOrientation}
              value={imageOrientation}
            />
          </View>
          <View marginLeft="small" marginRight="small">
            <DemoCheckbox
              checked={hasPrimaryButton}
              label="Has Primary Button"
              onChange={setHasPrimaryButton}
            />
            <DemoDivider />
            <RadioGroup
              data={['CLOSE', 'DEEP_LINK', 'LINK']}
              isDisabled={!hasPrimaryButton}
              label="Primary Button Action"
              onChange={setPrimaryButtonAction}
              value={primaryButtonAction}
            />
            <DemoDivider />
            <DemoCheckbox
              checked={hasSecondaryButton}
              isDisabled={!hasPrimaryButton}
              label="Has Secondary Button"
              onChange={setHasSecondaryButton}
            />
            <DemoDivider />
            <RadioGroup
              data={['CLOSE', 'DEEP_LINK', 'LINK']}
              isDisabled={!hasPrimaryButton || !hasSecondaryButton}
              label="Secondary Button Action"
              onChange={setSecondaryButtonAction}
              value={secondaryButtonAction}
            />
            <DemoDivider />
          </View>
        </div>
        <Button margin="medium" onClick={onClick}>
          Display In-App Message
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
