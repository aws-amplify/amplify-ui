import {
  Button,
  ButtonSize,
  ButtonTypes,
  ButtonVariant,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";

export const ButtonExample = ({ children }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fullWidth, setFullWidth] = React.useState<boolean>(false);
  const [loadingText, setLoadingText] = React.useState("Loading...");
  const [ariaLabel, setAriaLabel] = React.useState<string>("");
  const [variant, setVariant] = React.useState<ButtonVariant>(
    ButtonVariant.Secondary
  );
  const [size, setSize] = React.useState<ButtonSize>(ButtonSize.Medium);

  return (
    <div>
      <h4>Button Props:</h4>
      <div>
        <input type="radio" onChange={() => setDisabled(!disabled)}>
          disabled
        </input>
        <input type="radio" onChange={() => setFullWidth(!fullWidth)}>
          fullWidth
        </input>
        <input type="radio" onChange={() => setLoading(!loading)}>
          loading
        </input>
        <input
          type="text"
          value={loadingText}
          onChange={(event: any) => {
            setLoadingText(event.target.value);
          }}
        />
        <input
          type="text"
          value={ariaLabel}
          onChange={(event: any) => {
            setAriaLabel(event.target.value);
          }}
        />
        <select
          value={variant}
          placeholder="Select button variant"
          onChange={event => setVariant(event.target.value as ButtonVariant)}
        >
          <option value={ButtonVariant.Primary}>{ButtonVariant.Primary}</option>
          <option value={ButtonVariant.Secondary}>
            {ButtonVariant.Secondary}
          </option>
          <option value={ButtonVariant.Tertiary}>
            {ButtonVariant.Tertiary}
          </option>
          <option value={ButtonVariant.Link}>{ButtonVariant.Link}</option>
        </select>
        <select
          value={size}
          placeholder="Select button size"
          onChange={event => setSize(event.target.value as ButtonSize)}
        >
          <option value={ButtonSize.Small}>{ButtonSize.Small}</option>
          <option value={ButtonSize.Medium}>{ButtonSize.Medium}</option>
          <option value={ButtonSize.Large}>{ButtonSize.Large}</option>
        </select>
      </div>
      <Button
        className="my-favorite-button"
        isDisabled={disabled}
        isLoading={loading}
        loadingText={loadingText}
        variant={variant}
        size={size}
        onClick={() => alert("hello")}
        ariaLabel={ariaLabel}
        fullWidth={fullWidth}
        type={ButtonTypes.Button}
      >
        Click me!
      </Button>
    </div>
  );
};
