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
    'M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z',
  close:
    'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
  image:
    'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z',
  'send-message':
    'M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z',
  'user-avatar':
    'M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z',
};

const DEFAULT_ICON_ATTRIBUTES = {
  'aria-hidden': true,
  width: '24',
  height: '24',
  // `viewBox` coordinates map to `path` data in DEFAULT_ICON_PATHS
  viewBox: '0 -960 960 960',
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
