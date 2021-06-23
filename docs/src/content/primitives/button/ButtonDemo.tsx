import React from "react";
import {
  Button,
  ButtonSize,
  ButtonTypes,
  ButtonVariant,
} from "@aws-amplify/ui-react";

export const ButtonDemo = ({ children }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fullWidth, setFullWidth] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);
  const [loadingText, setLoadingText] = React.useState("Loading...");
  const [ariaLabel, setAriaLabel] = React.useState<string>("");
  const [variant, setVariant] = React.useState<ButtonVariant>(
    ButtonVariant.Primary
  );
  const [size, setSize] = React.useState<ButtonSize>(ButtonSize.Medium);

  return (
    <div>
      <h4>Button Props:</h4>
      <div className="flex gap-5 flex-wrap my-8">
        <div className="flex items-center gap-1">
          <input
            id="disabled"
            name="disabled"
            type="checkbox"
            onChange={() => setDisabled(!disabled)}
          />
          <label htmlFor="disabled">isDisabled</label>
        </div>

        <div className="flex items-center gap-1">
          <input
            id="fullwidth"
            name="fullwidth"
            type="checkbox"
            onChange={() => setFullWidth(!fullWidth)}
          />
          <label htmlFor="fullwidth">isFullWidth</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            id="loading"
            name="loading"
            type="checkbox"
            onChange={() => setLoading(!loading)}
          />
          <label htmlFor="loading">isLoading</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            id="active"
            name="active"
            type="checkbox"
            onChange={() => setActive(!active)}
          />
          <label htmlFor="active">isActive</label>
        </div>

        <input
          type="text"
          value={loadingText}
          onChange={(event: any) => {
            setLoadingText(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Set aria-label text"
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
        isActive={active}
        isDisabled={disabled}
        isLoading={loading}
        loadingText={loadingText}
        variant={variant}
        size={size}
        onClick={() => alert("hello")}
        ariaLabel={ariaLabel}
        isFullWidth={fullWidth}
        type={ButtonTypes.Button}
      >
        Click me!
      </Button>
    </div>
  );
};
