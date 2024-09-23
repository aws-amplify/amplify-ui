import * as React from 'react';
import { WebTheme } from '@aws-amplify/ui';
import {
  BaseComponentProps,
  ElementType,
  ForwardRefPrimitive,
  Primitive,
  PrimitiveProps,
} from '../../primitives/types';
import { primitiveWithForwardRef } from '../../primitives/utils/primitiveWithForwardRef';
import { Style } from './Style';

interface BaseStyleThemeProps extends BaseComponentProps {
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  theme?: WebTheme;
}

export type ThemeStyleProps<Element extends ElementType = 'style'> =
  PrimitiveProps<BaseStyleThemeProps, Element>;

const ThemeStylePrimitive: Primitive<ThemeStyleProps, 'style'> = (
  { theme, nonce, ...rest },
  ref
) => {
  if (!theme) return null;

  const { name, cssText } = theme;
  return (
    <Style
      {...rest}
      ref={ref}
      cssText={cssText}
      nonce={nonce}
      id={`amplify-theme-${name}`}
    />
  );
};

/**
 * @experimental
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const ThemeStyle: ForwardRefPrimitive<BaseStyleThemeProps, 'style'> =
  primitiveWithForwardRef(ThemeStylePrimitive);

ThemeStyle.displayName = 'ThemeStyle';
