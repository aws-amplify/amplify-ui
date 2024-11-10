import React from 'react';

import { elementsDefault } from './context/elements';
import {
  createStorageBrowser,
  StorageBrowserProps as StorageBrowserPropsBase,
} from './createStorageBrowser';
import { createAmplifyAuthAdapter } from './adapters';
import {
  Breadcrumbs,
  Flex,
  SearchField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export const StorageBrowser = ({
  views,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({
      elements: elementsDefault,
      config: createAmplifyAuthAdapter(),
      components: {
        Search: ({ onSearch, searchPlaceholder }) => {
          const [includeSubfolders, setIncludeSubfolders] =
            React.useState(false);
          return (
            <Flex direction="row">
              <SearchField
                label="Search"
                size="small"
                placeholder={searchPlaceholder}
                onSubmit={(e) => {
                  onSearch?.(e, includeSubfolders);
                }}
                onClear={() => {
                  onSearch?.('', includeSubfolders);
                }}
              />
              <SwitchField
                size="small"
                label="include subfolders"
                labelPosition="end"
                isChecked={includeSubfolders}
                onChange={(e) => {
                  setIncludeSubfolders(e.target.checked);
                }}
              />
            </Flex>
          );
        },
        Navigation: ({ items }) => {
          return (
            <Breadcrumbs.Container>
              {items.map((item, i) => {
                return (
                  <Breadcrumbs.Item key={i}>
                    <Breadcrumbs.Link
                      isCurrent={item.isCurrent}
                      onClick={item.onNavigate}
                    >
                      {item.name}
                    </Breadcrumbs.Link>
                    {item.isCurrent ? null : <Breadcrumbs.Separator />}
                  </Breadcrumbs.Item>
                );
              })}
            </Breadcrumbs.Container>
          );
        },
      },
    })
  ).current;

  return <StorageBrowser views={views} />;
};
