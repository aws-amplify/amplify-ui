import React from 'react';

import { elementsDefault } from './context/elements';
import {
  createStorageBrowser,
  StorageBrowserProps as StorageBrowserPropsBase,
} from './createStorageBrowser';
import { createAmplifyAuthAdapter } from './adapters';
import { TextField } from '@aws-amplify/ui-react';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export const StorageBrowser = ({
  views,
  displayText,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({
      elements: elementsDefault,
      components: {
        FolderNameField: ({
          onChange,
          label,
          placeholder,
          validationMessage,
          onValidate,
        }) => {
          const handleValidate = ({
            target: { value },
          }:
            | React.ChangeEvent<HTMLInputElement>
            | React.FocusEvent<HTMLInputElement>) => {
            onValidate?.(value);
          };
          return (
            <TextField
              label={label}
              placeholder={placeholder}
              errorMessage={validationMessage}
              hasError={!!validationMessage}
              onBlur={handleValidate}
              onChange={(event) => {
                const { value } = event.target;
                handleValidate?.(event);
                onChange?.(value);
              }}
            />
          );
        },
      },
      config: createAmplifyAuthAdapter(),
    })
  ).current;

  return <StorageBrowser views={views} displayText={displayText} />;
};
