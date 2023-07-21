import * as React from 'react';

import {
  Button,
  ButtonSizes,
  ButtonVariations,
  ButtonColorThemes,
  ButtonProps,
  Flex,
  SwitchField,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';

const propsToCode = (props) => {
  return (
    `<Button` +
    (props.disabled ? `\n  isDisabled={${props.disabled}}` : '') +
    (props.fullWidth ? `\n  isFullWidth={${props.fullWidth}}` : '') +
    (props.loading ? `\n  isLoading={${props.loading}}` : '') +
    (props.variation
      ? `\n  variation=${JSON.stringify(props.variation)}`
      : '') +
    (props.colorTheme
      ? `\n  colorTheme=${JSON.stringify(props.colorTheme)}`
      : '') +
    (props.size ? `\n  size=${JSON.stringify(props.size)}` : '') +
    `
  loadingText=${JSON.stringify(props.loadingText)}
  onClick={() => alert('hello')}
  ariaLabel=${JSON.stringify(props.ariaLabel)}
>
  Click me!
</Button>`
  );
};

const PropControls = (props) => {
  return (
    <Flex direction="column">
      <SelectField
        name="variation"
        id="variation"
        label="Variation"
        value={props.variation}
        onChange={(event) =>
          props.setVariation(event.target.value as ButtonVariations)
        }
      >
        <option value="">Default</option>
        <option value="primary">Primary</option>
        <option value="link">Link</option>
      </SelectField>

      <SelectField
        name="colorTheme"
        id="colorTheme"
        label="ColorTheme"
        value={props.colorTheme}
        onChange={(event) =>
          props.setColorTheme(event.target.value as ButtonColorThemes)
        }
      >
        <option value="">Default</option>
        <option value="error">Error</option>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="success">Success</option>
        <option value="overlay">Overlay</option>
      </SelectField>

      <SelectField
        name="Size"
        id="size"
        label="Size"
        value={props.size}
        onChange={(event) => props.setSize(event.target.value as ButtonSizes)}
      >
        <option value="">Default</option>
        <option value="small">Small</option>
        <option value="large">Large</option>
      </SelectField>

      <SwitchField
        label="isFullWidth"
        isChecked={props.fullWidth}
        labelPosition="end"
        onChange={(event) => {
          props.setFullWidth(
            event.target.checked as ButtonProps['isFullWidth']
          );
        }}
      />

      <SwitchField
        label="isDisabled"
        isChecked={props.disabled}
        labelPosition="end"
        onChange={(event) => {
          props.setDisabled(event.target.checked as ButtonProps['isDisabled']);
        }}
      />

      <SwitchField
        label="isLoading"
        isChecked={props.loading}
        labelPosition="end"
        onChange={(event) => {
          props.setLoading(event.target.checked as ButtonProps['isLoading']);
        }}
      />

      <TextField
        label="loadingText"
        name="loadingText"
        id="loadingText"
        value={props.loadingText}
        onChange={(event) => {
          props.setLoadingText(
            event.target.value as ButtonProps['loadingText']
          );
        }}
      />
    </Flex>
  );
};

export const ButtonDemo = () => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fullWidth, setFullWidth] = React.useState<boolean>(false);
  const [loadingText, setLoadingText] = React.useState('');
  const [ariaLabel, setAriaLabel] = React.useState<string>('');
  const [variation, setVariation] = React.useState<ButtonVariations>();
  const [colorTheme, setColorTheme] = React.useState<ButtonColorThemes>();
  const [size, setSize] = React.useState<ButtonSizes>();

  const props = {
    disabled,
    loading,
    fullWidth,
    loadingText,
    ariaLabel,
    variation,
    size,
  };
  const propControls = {
    ...props,
    setDisabled,
    setLoading,
    setFullWidth,
    setLoadingText,
    setAriaLabel,
    setVariation,
    setColorTheme,
    setSize,
  };
  return (
    <Demo
      code={propsToCode(props)}
      propControls={<PropControls {...propControls} />}
    >
      <Button
        isDisabled={disabled}
        isLoading={loading}
        loadingText={loadingText}
        variation={variation}
        colorTheme={colorTheme}
        size={size}
        onClick={() => alert('hello')}
        ariaLabel={ariaLabel}
        isFullWidth={fullWidth}
      >
        Click me!
      </Button>
    </Demo>
  );
};
