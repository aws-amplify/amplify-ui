import React from 'react';
import { Button, ButtonSize, ButtonVariation } from '@aws-amplify/ui-react';
import { FieldLabeler } from '@/components/FieldLabeler';
import { Example } from '@/components/Example';

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

        <FieldLabeler id="loadingText">
          <input
            id="loadingText"
            type="text"
            value={loadingText}
            onChange={(event: any) => {
              setLoadingText(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="ariaLabel">
          <input
            id="ariaLabel"
            type="text"
            placeholder="Set aria-label text"
            value={ariaLabel}
            onChange={(event: any) => {
              setAriaLabel(event.target.value);
            }}
          />
        </FieldLabeler>
        <FieldLabeler id="variation">
          <select
            id="variation"
            value={variation}
            placeholder="Select button variation"
            onChange={(event) =>
              setVariation(event.target.value as ButtonVariation)
            }
          >
            <option value="">default</option>
            <option value="primary">primary</option>
            <option value="link">link</option>
          </select>
        </FieldLabeler>
        <FieldLabeler id="size">
          <select
            id="size"
            value={size}
            onChange={(event) => setSize(event.target.value as ButtonSize)}
          >
            <option value="">default</option>
            <option value="small">small</option>
            <option value="large">large</option>
          </select>
        </FieldLabeler>
      </div>
      <Example>
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
      </Example>
    </div>
  );
};
