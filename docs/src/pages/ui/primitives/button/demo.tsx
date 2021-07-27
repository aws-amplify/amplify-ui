import React from 'react';
import { Button, ButtonSize, ButtonVariation } from '@aws-amplify/ui-react';

export const ButtonDemo = () => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fullWidth, setFullWidth] = React.useState<boolean>(false);
  const [loadingText, setLoadingText] = React.useState('Loading...');
  const [ariaLabel, setAriaLabel] = React.useState<string>('');
  const [variation, setVariation] = React.useState<ButtonVariation>();
  const [size, setSize] = React.useState<ButtonSize>();

  return (
    <div>
      <h4>Button Props:</h4>
      <div className="flex flex-wrap gap-5 my-8">
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
          value={variation}
          placeholder="Select button variation"
          onChange={(event) =>
            setVariation(event.target.value as ButtonVariation)
          }
        >
          <option></option>
          <option value="primary">primary</option>
          <option value="link">link</option>
        </select>
        <select
          value={size}
          onChange={(event) => setSize(event.target.value as ButtonSize)}
        >
          <option></option>
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
      </div>
      <Button
        className="my-favorite-button"
        isDisabled={disabled}
        isLoading={loading}
        loadingText={loadingText}
        variation={variation}
        size={size}
        onClick={() => alert('hello')}
        ariaLabel={ariaLabel}
        isFullWidth={fullWidth}
        type="button"
      >
        Click me!
      </Button>
    </div>
  );
};
