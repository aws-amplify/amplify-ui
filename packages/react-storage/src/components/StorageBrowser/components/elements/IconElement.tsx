import React from 'react';

import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';
import { useIcons } from '@aws-amplify/ui-react/internal';
import type { StorageBrowserIconType } from '@aws-amplify/ui-react/internal';
import { STORAGE_BROWSER_ICON_PATHS } from '@aws-amplify/ui-react/internal';

export type IconElementProps = React.ComponentProps<typeof BaseIconElement>;

export type { StorageBrowserIconType };
export { STORAGE_BROWSER_ICON_PATHS };

const DEFAULT_ICON_ATTRIBUTES = {
  'aria-hidden': true,
  width: '24',
  height: '24',
  // `viewBox` coordinates map to `path` data in STORAGE_BROWSER_ICON_PATHS
  viewBox: '0 -960 960 960',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  role: 'img',
};

export const BaseIconElement = defineBaseElement<
  'svg',
  never,
  StorageBrowserIconType
>({
  type: 'svg',
  displayName: 'Icon',
});

const getIconProps = ({
  variant,
  ...props
}: IconElementProps): IconElementProps => {
  const pathData = variant ? STORAGE_BROWSER_ICON_PATHS[variant] : undefined;
  const children = pathData ? (
    <path d={pathData} fill="currentColor" />
  ) : undefined;

  return {
    ...DEFAULT_ICON_ATTRIBUTES,
    ...props,
    children: props.children ?? children,
    variant,
  };
};

export const IconElement = (props: IconElementProps): React.JSX.Element => {
  const { variant } = props;
  const icons = useIcons('storageBrowser');

  const icon = variant ? icons?.[variant] : undefined;
  if (icon) {
    return <>{icon}</>;
  }

  return <BaseIconElement {...getIconProps(props)} />;
};
