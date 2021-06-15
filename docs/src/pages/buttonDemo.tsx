import {
  Box,
  VStack,
  Grid,
  useBoolean,
  Switch,
  HStack,
  Input,
  Select,
  theme as chakraTheme
} from "@chakra-ui/react";
import {
  amplifyTheme,
  AmplifyUIProvider,
  Button,
  ButtonElement,
  ButtonSize,
  ButtonTypes,
  ButtonVariant
} from "@aws-amplify/ui-react";

import React from "react";

export const ButtonExample = ({ children }) => {
  const [disabled, setDisabled] = useBoolean(false);
  const [loading, setLoading] = useBoolean(false);
  const [fullWidth, setFullWidth] = useBoolean(false);
  const [loadingText, setLoadingText] = React.useState("Loading...");
  const [ariaLabel, setAriaLabel] = React.useState<string>("");
  const [variant, setVariant] = React.useState<ButtonVariant>(
    ButtonVariant.Secondary
  );
  const [size, setSize] = React.useState<ButtonSize>(ButtonSize.Medium);

  /**
   * Amplify theme doesn't have styling for non-button components yet,
   * so we pull Chakra theme in and override Chakra button styles with AmplifyTheme Button styles
   */
  const MyTheme = {
    ...chakraTheme,
    components: {
      ...chakraTheme.components,
      Button: amplifyTheme.components.Button
    }
  };

  return (
    <AmplifyUIProvider customTheme={MyTheme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <VStack spacing={8} alignItems="flex-start">
            <h4>Button Props:</h4>
            <HStack>
              <Switch onChange={() => setDisabled.toggle()}>disabled</Switch>
              <Switch onChange={() => setFullWidth.toggle()}>fullWidth</Switch>
              <Switch onChange={() => setLoading.toggle()}>loading</Switch>
              <Input
                value={loadingText}
                onChange={(event: any) => {
                  setLoadingText(event.target.value);
                }}
                size="sm"
              />
              <Input
                value={ariaLabel}
                onChange={(event: any) => {
                  setAriaLabel(event.target.value);
                }}
                placeholder="aria-label"
                size="sm"
              />
              <Select
                value={variant}
                placeholder="Select button variant"
                onChange={event =>
                  setVariant(event.target.value as ButtonVariant)
                }
              >
                <option value={ButtonVariant.Primary}>
                  {ButtonVariant.Primary}
                </option>
                <option value={ButtonVariant.Secondary}>
                  {ButtonVariant.Secondary}
                </option>
                <option value={ButtonVariant.Tertiary}>
                  {ButtonVariant.Tertiary}
                </option>
                <option value={ButtonVariant.Link}>{ButtonVariant.Link}</option>
              </Select>
              <Select
                value={size}
                placeholder="Select button size"
                onChange={event => setSize(event.target.value as ButtonSize)}
              >
                <option value={ButtonSize.Small}>{ButtonSize.Small}</option>
                <option value={ButtonSize.Medium}>{ButtonSize.Medium}</option>
                <option value={ButtonSize.Large}>{ButtonSize.Large}</option>
              </Select>
            </HStack>
            <hr />
            <Button
              className="my-favorite-button"
              disabled={disabled}
              loading={loading}
              loadingText={loadingText}
              variant={variant}
              size={size}
              onClick={() => alert("hello")}
              ariaLabel={ariaLabel}
              fullWidth={fullWidth}
              type={ButtonTypes.Button}
            >
              Click Me (ChakraButton)
            </Button>
            <ButtonElement
              className="my-favorite-button"
              disabled={disabled}
              loading={loading}
              loadingText={loadingText}
              variant={variant}
              size={size}
              onClick={() => alert("hello")}
              ariaLabel={ariaLabel}
              fullWidth={fullWidth}
              type={ButtonTypes.Button}
            >
              Click me (button element)
            </ButtonElement>
          </VStack>
        </Grid>
      </Box>
    </AmplifyUIProvider>
  );
};
