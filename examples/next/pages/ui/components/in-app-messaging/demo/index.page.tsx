import React, { useState } from 'react';
import {
  Button,
  defaultDarkModeOverride,
  ColorMode,
  Divider as BaseDivider,
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

const Divider = () => (
  <BaseDivider
    marginBottom="small"
    marginTop="small"
    orientation="horizontal"
  />
);

function LayoutRadioGroup({ layout, setLayout }) {
  return (
    <RadioGroupField
      label="Layout"
      name="Layout"
      onChange={(e) => {
        setLayout(e.target.value as GetInAppMessageParams['layout']);
      }}
      value={layout}
    >
      {LAYOUTS.map((layout) => (
        <Radio key={layout} value={layout}>
          {layout}
        </Radio>
      ))}
    </RadioGroupField>
  );
}

function ImageOrientationRadioGroup({
  imageOrientation,
  isDisabled,
  setImageOrientation,
}) {
  return (
    <RadioGroupField
      isDisabled={isDisabled}
      label="Image Orientation"
      name="Image Orientation"
      onChange={(e) => {
        setImageOrientation(
          e.target.value as GetInAppMessageParams['imageOrientation']
        );
      }}
      value={imageOrientation}
    >
      {(
        ['landscape', 'portrait'] as GetInAppMessageParams['imageOrientation'][]
      ).map((orientation) => (
        <Radio key={orientation} value={orientation}>
          {orientation}
        </Radio>
      ))}
    </RadioGroupField>
  );
}

function ButtonActionRadioGroup({
  isDisabled,
  buttonAction,
  setButtonAction,
  type,
}) {
  return (
    <RadioGroupField
      isDisabled={isDisabled}
      label={`${type} Button Action`}
      name={`${type} Button Action`}
      onChange={(e) => {
        setButtonAction(e.target.value);
      }}
      value={buttonAction}
    >
      {['CLOSE', 'DEEP_LINK', 'LINK'].map((action) => (
        <Radio key={`${type}:${action}`} value={action}>
          {action}
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
        <RadioGroupField
          direction="row"
          label="Color Mode"
          marginBottom="medium"
          name="Color Mode"
          onChange={(e) => {
            setColorMode(e.target.value as ColorMode);
          }}
          value={colorMode}
        >
          {['dark', 'light'].map((mode) => (
            <Radio key={mode} value={mode}>
              {mode}
            </Radio>
          ))}
        </RadioGroupField>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <View marginLeft="small" marginRight="small">
            <LayoutRadioGroup layout={layout} setLayout={setLayout} />
            <Divider />
            <CheckboxField
              checked={hasHeader}
              label="Has Header"
              name="Has Header"
              value=""
              onChange={() => {
                setHasHeader((prev) => !prev);
              }}
            />
            <Divider />
            <CheckboxField
              checked={hasMessage}
              label="Has Message"
              name="Has Message"
              value=""
              onChange={() => {
                setHasMessage((prev) => !prev);
              }}
            />
            <Divider />
            <CheckboxField
              checked={hasImage}
              label="Has Image"
              name="Has Image"
              value=""
              onChange={() => {
                setHasImage((prev) => !prev);
              }}
            />
            <Divider />
            <ImageOrientationRadioGroup
              imageOrientation={imageOrientation}
              isDisabled={!hasImage}
              setImageOrientation={setImageOrientation}
            />
          </View>
          <View marginLeft="small" marginRight="small">
            <CheckboxField
              checked={hasPrimaryButton}
              label="Has Primary Button"
              name="Has Primary Button"
              value=""
              onChange={() => {
                setHasPrimaryButton((prev) => !prev);
              }}
            />
            <Divider />
            <ButtonActionRadioGroup
              buttonAction={primaryButtonAction}
              isDisabled={!hasPrimaryButton}
              setButtonAction={setPrimaryButtonAction}
              type="Primary"
            />
            <Divider />
            <CheckboxField
              checked={hasSecondaryButton}
              isDisabled={!hasPrimaryButton}
              label="Has Secondary Button"
              name="Has Secondary Button"
              value=""
              onChange={() => {
                setHasSecondaryButton((prev) => !prev);
              }}
            />
            <Divider />
            <ButtonActionRadioGroup
              buttonAction={secondaryButtonAction}
              isDisabled={!hasPrimaryButton || !hasSecondaryButton}
              setButtonAction={setSecondaryButtonAction}
              type="Secondary"
            />
            <Divider />
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
