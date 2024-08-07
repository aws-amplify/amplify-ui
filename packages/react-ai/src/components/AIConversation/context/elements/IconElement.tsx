import {
  defineBaseElement,
  withBaseElementProps,
} from '@aws-amplify/ui-react-core/elements';
import React from 'react';

export type IconElementProps = React.ComponentProps<typeof BaseIconElement>;

export type IconVariant =
  | 'attach'
  | 'close'
  | 'image'
  | 'send-message'
  | 'user-avatar';

export const DEFAULT_ICON_PATHS: Record<IconVariant, string> = {
  attach:
    'M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z',
  close:
    'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
  image:
    'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z',
  'send-message': 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
  'user-avatar':
    'M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z',
};

const DEFAULT_ICON_ATTRIBUTES = {
  'aria-hidden': true,
  width: '24',
  height: '24',
  // `viewBox` coordinates map to `path` data in DEFAULT_ICON_PATHS
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

export const BaseIconElement = defineBaseElement<'svg', never, IconVariant>({
  type: 'svg',
  displayName: 'Icon',
});

const getIconProps = ({
  variant,
  ...props
}: IconElementProps): IconElementProps => {
  const pathData = variant ? DEFAULT_ICON_PATHS[variant] : undefined;
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

export const IconElement = withBaseElementProps(BaseIconElement, getIconProps);
