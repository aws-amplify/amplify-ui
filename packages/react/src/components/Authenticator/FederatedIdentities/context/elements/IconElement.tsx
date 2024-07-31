import {
  defineBaseElement,
  withBaseElementProps,
} from '@aws-amplify/ui-react-core/elements';
import React from 'react';

export type IconElementProps = React.ComponentProps<typeof BaseIconElement>;

export type IconVariant = 'google' | 'facebook' | 'apple' | 'amazon';

export const BaseIconElement = defineBaseElement<'svg', never, IconVariant>({
  type: 'svg',
  displayName: 'Icon',
});

export const DEFAULT_ICON_PATHS: Record<IconVariant, string> = {
  google: '',
  facebook: '',
  apple: '',
  amazon: '',
};

const DEFAULT_ICON_ATTRIBUTES = {};

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
